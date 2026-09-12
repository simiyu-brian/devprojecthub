/*
  # Project pipeline: projects, milestones, tasks, messages

  1. New tables
    - `projects` — a real client project, created when an admin approves a `project_requests` row.
      Linked to the student by `student_id` (nullable — see linking note below).
    - `milestones` — phases of a project (mirrors the shape used by the UI's sample data).
    - `milestone_tasks` — checklist items within a milestone.
    - `messages` — per-project chat between the student and the admin.

  2. Linking a project to a student account
    - The public request form has no login, so at approval time the student may not have an
      account yet. `approve_request()` links by matching email against `auth.users` if an
      account already exists. If not, `link_projects_on_signup()` (a trigger on `auth.users`)
      links any matching unclaimed project the moment that student signs up.

  3. Security
    - RLS enabled on all four tables.
    - `is_admin()` reads the `role` claim Supabase puts in the JWT from `user_metadata`.
    - Students can only SELECT rows tied to their own project (`student_id = auth.uid()`).
    - Students may UPDATE their own tasks' `done` flag (self-tracking); everything else
      (creating projects/milestones/tasks, editing milestone status/progress) is admin-only.
    - `approve_request()` runs as SECURITY DEFINER so it can read `auth.users` by email, but it
      re-checks `is_admin()` internally before doing anything.
*/

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin', false);
$$;

-- Fix: project_requests (created in the previous migration, before admins existed as a
-- concept) only let a user view rows matching their own email. Admins never submit their
-- own requests, so without this, the admin Requests page would always show zero rows —
-- confirmed by testing directly against Postgres, not just by reading the policy.
create policy "Admins view all project requests"
  on project_requests for select
  to authenticated
  using (is_admin());

-- Projects ------------------------------------------------------------

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  request_id uuid references project_requests(id),
  student_id uuid references auth.users(id),
  email text not null,
  title text not null,
  description text,
  category text,
  status text not null default 'New',
  progress integer not null default 0,
  budget text,
  deadline date,
  created_at timestamptz not null default now()
);

alter table project_requests add column if not exists project_id uuid references projects(id);

alter table projects enable row level security;

create policy "Students view their own project"
  on projects for select
  to authenticated
  using (student_id = auth.uid() or is_admin());

create policy "Admins manage projects"
  on projects for all
  to authenticated
  using (is_admin())
  with check (is_admin());

-- Milestones ------------------------------------------------------------

create table if not exists milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'pending',
  due_date date,
  progress integer not null default 0,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

alter table milestones enable row level security;

create policy "View milestones of accessible projects"
  on milestones for select
  to authenticated
  using (exists (
    select 1 from projects p
    where p.id = milestones.project_id and (p.student_id = auth.uid() or is_admin())
  ));

create policy "Admins manage milestones"
  on milestones for all
  to authenticated
  using (is_admin())
  with check (is_admin());

-- Milestone tasks ------------------------------------------------------------

create table if not exists milestone_tasks (
  id uuid primary key default gen_random_uuid(),
  milestone_id uuid not null references milestones(id) on delete cascade,
  title text not null,
  done boolean not null default false,
  position integer not null default 0
);

alter table milestone_tasks enable row level security;

create policy "View tasks of accessible projects"
  on milestone_tasks for select
  to authenticated
  using (exists (
    select 1 from milestones m join projects p on p.id = m.project_id
    where m.id = milestone_tasks.milestone_id and (p.student_id = auth.uid() or is_admin())
  ));

create policy "Students toggle their own tasks"
  on milestone_tasks for update
  to authenticated
  using (exists (
    select 1 from milestones m join projects p on p.id = m.project_id
    where m.id = milestone_tasks.milestone_id and p.student_id = auth.uid()
  ))
  with check (exists (
    select 1 from milestones m join projects p on p.id = m.project_id
    where m.id = milestone_tasks.milestone_id and p.student_id = auth.uid()
  ));

create policy "Admins manage tasks"
  on milestone_tasks for all
  to authenticated
  using (is_admin())
  with check (is_admin());

-- Messages ------------------------------------------------------------

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  sender_id uuid not null references auth.users(id),
  sender_role text not null,
  content text not null,
  created_at timestamptz not null default now(),
  read boolean not null default false
);

alter table messages enable row level security;

create policy "View messages of accessible projects"
  on messages for select
  to authenticated
  using (exists (
    select 1 from projects p where p.id = messages.project_id and (p.student_id = auth.uid() or is_admin())
  ));

create policy "Send messages on accessible projects"
  on messages for insert
  to authenticated
  with check (
    sender_id = auth.uid()
    and exists (
      select 1 from projects p where p.id = messages.project_id and (p.student_id = auth.uid() or is_admin())
    )
  );

-- Approve a request into a real project (admin only) ------------------------------------------------------------

create or replace function public.approve_request(p_request_id uuid, p_title text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_request project_requests%rowtype;
  v_project_id uuid;
  v_student_id uuid;
begin
  if not is_admin() then
    raise exception 'Only admins can approve requests';
  end if;

  select * into v_request from project_requests where id = p_request_id;
  if not found then
    raise exception 'Request not found';
  end if;

  select id into v_student_id from auth.users where email = v_request.email limit 1;

  insert into projects (request_id, student_id, email, title, description, category, budget, deadline, status)
  values (
    v_request.id, v_student_id, v_request.email, p_title, v_request.description,
    v_request.project_type, v_request.budget, v_request.deadline, 'New'
  )
  returning id into v_project_id;

  update project_requests set status = 'approved', project_id = v_project_id where id = p_request_id;

  return v_project_id;
end;
$$;

-- Auto-link an unclaimed project the moment a matching student signs up ------------------------------------------------------------

create or replace function public.link_projects_on_signup()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update projects set student_id = new.id where email = new.email and student_id is null;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_link_projects on auth.users;
create trigger on_auth_user_created_link_projects
  after insert on auth.users
  for each row execute function public.link_projects_on_signup();
