# Supabase Integration Notes

This app uses Supabase for storing notes.

Environment variables (set in .env):
- REACT_APP_SUPABASE_URL
- REACT_APP_SUPABASE_KEY

Table schema expected (table name: notes):
- id: uuid (primary key, default uuid_generate_v4())
- title: text
- content: text
- created_at: timestamptz (default now())
- updated_at: timestamptz (default now())

Recommended SQL:

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table if not exists public.notes (
  id uuid not null default uuid_generate_v4(),
  title text,
  content text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  primary key (id)
);

Enable Row Level Security (RLS) only if you have policies configured; for demos you can leave RLS disabled or create permissive policies.

Usage:
- Create a Supabase project.
- Retrieve the Project URL and anon public key; place them in .env as REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY.
- Start the app: npm start

The client is initialized in src/services/supabaseClient.js and used by src/services/notesService.js for CRUD operations.
