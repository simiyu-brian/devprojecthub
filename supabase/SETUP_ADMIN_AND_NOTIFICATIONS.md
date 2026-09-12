# Admin access & request-notification setup

These steps live outside the app code because they involve real credentials and a
third-party email provider — do them once per environment (dev, staging, prod).

## 1. Create an admin account

Admins don't sign up on a special form — they use the normal flow, then get promoted:

1. Have the admin sign up for a regular account at `/login` (email + password).
2. In the Supabase SQL Editor, run `supabase/make-admin.sql` with their email filled in.
3. They can now sign in at **`/admin/login`** — a page that isn't linked anywhere in
   the site's navigation. Signing in there with a non-admin account is rejected.

Because credentials are just a normal Supabase Auth email/password, reset them the
usual way (Supabase dashboard → Authentication → Users → Reset password) if needed.

## 2. Wire up the "new request" email notification

The public quote form inserts into `project_requests`. A Postgres trigger
(`on_project_request_notify_admin`, added in
`migrations/20260103000000_request_duration_and_notify.sql`) fires on every insert
and calls an Edge Function, which sends the actual email via
[Resend](https://resend.com) (swap the provider in the function if you prefer
Postmark/SendGrid/SES — everything else stays the same).

Steps:

1. **Deploy the function:**
   ```bash
   supabase functions deploy notify-admin-request
   ```
2. **Set its secrets:**
   ```bash
   supabase secrets set RESEND_API_KEY=re_xxx
   supabase secrets set NOTIFY_FROM_EMAIL="DevProject Hub <notify@yourdomain.com>"
   supabase secrets set NOTIFY_ADMIN_EMAIL=admin@yourdomain.com
   supabase secrets set NOTIFY_SHARED_SECRET=<generate a long random string>
   ```
3. **Point the trigger at the deployed function** (run in the SQL Editor — this is
   data, not a migration, since the URL/secret differ per project):
   ```sql
   update app_config set
     notify_function_url = 'https://<project-ref>.functions.supabase.co/notify-admin-request',
     notify_function_secret = '<same long random string as NOTIFY_SHARED_SECRET>'
   where id = 1;
   ```

Until `app_config` is filled in, the trigger just skips sending (form submissions
still save normally — a student's request is never lost over notification setup).

Test it by submitting the "Get a Free Quote" form and confirming the admin inbox
gets an email within a few seconds.
