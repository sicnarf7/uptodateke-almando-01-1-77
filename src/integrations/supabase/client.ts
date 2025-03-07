
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gdugalhraxbcfxbsevfh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkdWdhbGhyYXhiY2Z4YnNldmZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzMjcxMTUsImV4cCI6MjA1NjkwMzExNX0.7Qc9OqHByXq4N70_oJRlyPuaT3438ALUgbAOMWv99-o";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
