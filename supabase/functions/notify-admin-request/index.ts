// Supabase Edge Function: notify-admin-request
//
// Called by the `on_project_request_notify_admin` Postgres trigger (see
// supabase/migrations/20260103000000_request_duration_and_notify.sql) every time a
// visitor submits the public "Get a Free Quote" form. Sends an email to the admin
// inbox via Resend (https://resend.com) so nobody has to keep the dashboard open to
// notice a new request.
//
// Deploy:
//   supabase functions deploy notify-admin-request
//
// Required secrets (supabase secrets set KEY=value):
//   RESEND_API_KEY        - API key from your Resend account
//   NOTIFY_FROM_EMAIL     - verified sender, e.g. "DevProject Hub <notify@yourdomain.com>"
//   NOTIFY_ADMIN_EMAIL    - where the alert should land, e.g. "admin@yourdomain.com"
//   NOTIFY_SHARED_SECRET  - must match app_config.notify_function_secret in the DB,
//                           so this function only accepts calls from your own trigger.
//
// Swap the `sendEmail` implementation below if you use a different provider
// (Postmark, SendGrid, AWS SES, etc.) — everything else stays the same.

interface RequestPayload {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  institution: string | null;
  project_type: string;
  description: string;
  budget: string | null;
  deadline: string | null;
  duration: string | null;
  created_at: string;
}

async function sendEmail(payload: RequestPayload) {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  const from = Deno.env.get('NOTIFY_FROM_EMAIL');
  const to = Deno.env.get('NOTIFY_ADMIN_EMAIL');

  if (!apiKey || !from || !to) {
    throw new Error('Missing RESEND_API_KEY / NOTIFY_FROM_EMAIL / NOTIFY_ADMIN_EMAIL secrets');
  }

  const subject = `New project request: ${payload.project_type} — ${payload.full_name}`;

  const html = `
    <h2>New project request</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.full_name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(payload.phone ?? '—')}</p>
    <p><strong>Institution:</strong> ${escapeHtml(payload.institution ?? '—')}</p>
    <p><strong>Project type:</strong> ${escapeHtml(payload.project_type)}</p>
    <p><strong>Duration:</strong> ${escapeHtml(payload.duration ?? '—')}</p>
    <p><strong>Deadline:</strong> ${escapeHtml(payload.deadline ?? '—')}</p>
    <p><strong>Budget:</strong> ${escapeHtml(payload.budget ?? '—')}</p>
    <p><strong>Description:</strong></p>
    <p>${escapeHtml(payload.description).replace(/\n/g, '<br />')}</p>
    <hr />
    <p style="color:#888;font-size:12px;">Submitted ${new Date(payload.created_at).toLocaleString()} — request id ${payload.id}</p>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend API error (${res.status}): ${text}`);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const expectedSecret = Deno.env.get('NOTIFY_SHARED_SECRET');
  const authHeader = req.headers.get('Authorization');
  if (!expectedSecret || authHeader !== `Bearer ${expectedSecret}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  let payload: RequestPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response('Invalid JSON body', { status: 400 });
  }

  try {
    await sendEmail(payload);
  } catch (err) {
    console.error('notify-admin-request failed:', err);
    return new Response('Failed to send notification email', { status: 500 });
  }

  return new Response('OK', { status: 200 });
});
