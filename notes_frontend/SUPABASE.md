# Supabase Integration Notes

This app uses Supabase for storing notes.

Environment variables (set in .env):
- REACT_APP_SUPABASE_URL
- REACT_APP_SUPABASE_KEY

Both variables are required at runtime by src/services/supabaseClient.js. Do not hardcode these values.

Database schema (table name: notes):
- id: uuid (primary key, default gen_random_uuid())
- title: text
- content: text
- created_at: timestamptz (default now())
- updated_at: timestamptz (default now())

What this agent configured (automated):
1) Verified no tables existed.
2) Enabled pgcrypto extension (for gen_random_uuid()).
3) Created the public.notes table using gen_random_uuid() for id.
4) Enabled RLS and added permissive demo policies for SELECT/INSERT/UPDATE/DELETE.

Applied SQL:

CREATE EXTENSION IF NOT EXISTS pgcrypto;

create table if not exists public.notes (
  id uuid not null default gen_random_uuid(),
  title text,
  content text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  primary key (id)
);

-- For demo purposes only: permissive RLS policies
alter table public.notes enable row level security;

create policy "notes read"   on public.notes for select using (true);
create policy "notes write"  on public.notes for insert with check (true);
create policy "notes update" on public.notes for update using (true) with check (true);
create policy "notes delete" on public.notes for delete using (true);

Notes on uuid:
- uuid_generate_v4() from "uuid-ossp" was not available in this project at the time of setup.
- We installed/used pgcrypto and gen_random_uuid() instead (recommended on Supabase).

Usage:
- Create a Supabase project.
- In Project Settings > API, copy the Project URL and anon public key; place them in .env as:
  REACT_APP_SUPABASE_URL=... 
  REACT_APP_SUPABASE_KEY=...
- Start the app: npm start

Client integration:
- The client is initialized in src/services/supabaseClient.js (reads env vars above).
- CRUD operations are implemented in src/services/notesService.js and used throughout the UI.

Security:
- The current RLS policies are permissive and suitable for demos only.
- For production, replace them with user-scoped policies (e.g., add a user_id column and restrict access by auth.uid()) and require authenticated requests.
