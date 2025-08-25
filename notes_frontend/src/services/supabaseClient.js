//
// Supabase client initialization for the Notes app.
// Reads configuration from environment variables:
//   - REACT_APP_SUPABASE_URL
//   - REACT_APP_SUPABASE_KEY
//
// Do NOT hardcode values; ensure these are set in the environment.
//
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Basic guardrail to help developers configure env vars correctly.
  // App will still render but API calls will fail with readable errors.
  // eslint-disable-next-line no-console
  console.warn(
    'Missing Supabase config. Please set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY in your environment.'
  );
}

export const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

// PUBLIC_INTERFACE
export function getSupabase() {
  /** Returns the initialized Supabase client instance. */
  return supabase;
}
