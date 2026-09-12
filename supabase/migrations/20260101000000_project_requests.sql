/*
  # Project requests intake table

  1. New table
    - `project_requests`
      - Stores submissions from the public "Start Your Project" form.
      - `status` tracks the request through the admin pipeline (new, quoted, accepted, rejected).
  2. Security
    - RLS enabled.
    - Anyone (including anonymous visitors) may INSERT a request — this is a public intake form.
    - Only authenticated users may SELECT their own requests (matched by email); admins should
      use the Supabase dashboard or a service-role key for full pipeline visibility until an
      admin role/claim is added.
*/

CREATE TABLE IF NOT EXISTS project_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  institution text,
  project_type text NOT NULL,
  description text NOT NULL,
  budget text,
  deadline date,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE project_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a project request"
  ON project_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view their own project requests"
  ON project_requests
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');
