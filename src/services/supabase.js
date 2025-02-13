import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://hducqtxmsvhoygteohij.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdWNxdHhtc3Zob3lndGVvaGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwODQyNTEsImV4cCI6MjA1MzY2MDI1MX0.7YLnMdIpHCmJxZVDJ-QIu0SWYMSfyb1DXR8u2SNiiW8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
