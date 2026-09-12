/*
  # Fix: admins couldn't see project requests

  The original project_requests SELECT policy (added before the admin role existed)
  only let a signed-in user view rows matching their own email. Admins never submit
  requests to themselves, so the admin Requests page always returned zero rows —
  confirmed by testing directly against Postgres.

  This adds the missing admin-bypass policy. Safe to run even if you already applied
  the earlier migrations — it only adds one new policy and does nothing else.
*/

create policy "Admins view all project requests"
  on project_requests for select
  to authenticated
  using (is_admin());
