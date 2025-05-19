import { createClient } from '@supabase/supabase-js';
import { createSupabaseLogger } from './logger';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Enable query logging if the environment variable is set
if (import.meta.env.VITE_ENABLE_SUPABASE_LOGGING === 'true') {
  createSupabaseLogger(supabase);
}

export { supabase }; 