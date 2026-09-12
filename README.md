# DevProject Hub

**Build. Understand. Demonstrate.**

A platform connecting students with a developer to scope, build, and track final-year
software projects — from initial request through delivery.

## Features

- **Public project request form** — no login required. Students describe their idea,
  timeline, and budget and get a quote back.
- **Student dashboard** — once a project is approved, students can log in to track
  milestones, tasks, files, payments, and messages for their own project.
- **Admin dashboard** — manage incoming requests, projects, students, payments,
  services, portfolio, and site content from one place.
- **Automated email notifications** — admins are emailed the moment a new project
  request comes in.

## Tech stack

- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org) +
  [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com) — Postgres database, Auth, Row Level Security,
  and Edge Functions
- [Resend](https://resend.com) — transactional email for admin notifications

## Getting started

```bash
npm install
cp .env.example .env   # then fill in your Supabase project URL and anon key
npm run dev
```

### Database setup

Run the migrations in `supabase/migrations/` **in order** via the Supabase SQL
Editor or `supabase db push`.

### Admin access & email notifications

See [`supabase/SETUP_ADMIN_AND_NOTIFICATIONS.md`](./supabase/SETUP_ADMIN_AND_NOTIFICATIONS.md)
for how to create an admin account and wire up the request-notification email.

## Deployment

This is a static Vite build (`npm run build` → `dist/`), deployable to any static
host (Netlify, Vercel, etc.). Remember to set `VITE_SUPABASE_URL` and
`VITE_SUPABASE_ANON_KEY` as environment variables on your host — they aren't
read from `.env` in production.
