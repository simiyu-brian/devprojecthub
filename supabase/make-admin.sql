-- One-off script to promote a user to admin.
-- Run this in the Supabase SQL Editor AFTER that user has signed up
-- through the app at least once (their auth.users row must already exist).
--
-- Replace the email below, then run it.

update auth.users
set raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
where email = 'you@example.com';

-- To demote back to a regular student:
-- update auth.users
-- set raw_user_meta_data = raw_user_meta_data || '{"role": "student"}'::jsonb
-- where email = 'you@example.com';
