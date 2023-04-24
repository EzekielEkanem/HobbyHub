import { createClient } from '@supabase/supabase-js';
const URL = "https://ofiuhyvzyffqdlugimhh.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9maXVoeXZ6eWZmcWRsdWdpbWhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE3MDY1ODUsImV4cCI6MTk5NzI4MjU4NX0.vIut4bJPEOidkjNvH4Lk0y_1JRRP94EMhPeCuifKLvY";

export const supabase = createClient(URL, API_KEY);