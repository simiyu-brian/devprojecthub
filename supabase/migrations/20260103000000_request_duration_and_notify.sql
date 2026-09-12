/*
  # Project duration field + admin email notification wiring

  1. New column
    - `project_requests.duration` — the expected project timeframe the student picked
      on the "Get a Free Quote" form (e.g. "1 - 2 weeks").

  2. Email dispatcher
    - Admins should be emailed the moment a new project request comes in. Supabase
      Auth's built-in mailer only sends auth emails (confirmations, resets, etc.), so
      this uses the standard pattern instead: a Postgres trigger calls an Edge
      Function over HTTP via the `pg_net` extension, and the Edge Function (see
      supabase/functions/notify-admin-request) sends the actual email through a
      provider like Resend.
    - `app_config` is a tiny single-row settings table (admin-only) holding the
      deployed function's URL and a shared secret, so nothing sensitive is baked
      into this migration file. Fill it in after deploying the function:

        update app_config set
          notify_function_url = 'https://<project-ref>.functions.supabase.co/notify-admin-request',
          notify_function_secret = '<a long random string>'
        where id = 1;

      and set that same secret as the `NOTIFY_SHARED_SECRET` env var on the function
      (`supabase secrets set NOTIFY_SHARED_SECRET=<same value>`).
    - If `pg_net` isn't available on your plan, or `app_config` isn't filled in yet,
      the trigger fails silently (caught + logged as a warning) rather than blocking
      the insert — a student's request should never be lost because notification
      email setup is incomplete.
*/

alter table project_requests add column if not exists duration text;

create extension if not exists pg_net with schema extensions;

create table if not exists app_config (
  id integer primary key default 1,
  notify_function_url text,
  notify_function_secret text,
  constraint app_config_singleton check (id = 1)
);

alter table app_config enable row level security;

create policy "Admins manage app config"
  on app_config for all
  to authenticated
  using (is_admin())
  with check (is_admin());

insert into app_config (id) values (1) on conflict (id) do nothing;

create or replace function public.notify_admin_of_request()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_url text;
  v_secret text;
begin
  select notify_function_url, notify_function_secret
    into v_url, v_secret
    from app_config where id = 1;

  if v_url is null or v_secret is null then
    return new; -- not configured yet — skip quietly
  end if;

  begin
    perform net.http_post(
      url := v_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || v_secret
      ),
      body := jsonb_build_object(
        'id', new.id,
        'full_name', new.full_name,
        'email', new.email,
        'phone', new.phone,
        'institution', new.institution,
        'project_type', new.project_type,
        'description', new.description,
        'budget', new.budget,
        'deadline', new.deadline,
        'duration', new.duration,
        'created_at', new.created_at
      )
    );
  exception when others then
    raise warning 'notify_admin_of_request: failed to call notify function: %', sqlerrm;
  end;

  return new;
end;
$$;

drop trigger if exists on_project_request_notify_admin on project_requests;
create trigger on_project_request_notify_admin
  after insert on project_requests
  for each row execute function public.notify_admin_of_request();
