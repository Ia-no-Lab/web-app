import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client with environment variables
// In a production environment, these would be set in .env files
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "your-supabase-url";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "your-supabase-anon-key";

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
