import { createClient } from '@supabase/supabase-js';

// Access environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fallback to prevent crash if envs are missing (e.g. during build or before setup)
// This allows the app to load and show a proper error message instead of a white screen
const fallbackUrl = 'https://placeholder.supabase.co';
const fallbackKey = 'placeholder';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase Env Vars missing. Using placeholder to prevent crash.');
}

export const supabase = createClient(
    supabaseUrl || fallbackUrl,
    supabaseAnonKey || fallbackKey,
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    }
);
