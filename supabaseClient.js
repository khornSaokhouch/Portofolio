// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase URL and public key
const supabaseUrl = 'https://jouapikutbyvjhuferav.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvdWFwaWt1dGJ5dmpodWZlcmF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMzQyOTMsImV4cCI6MjA1NTgxMDI5M30.ZzNfuOy8e1GPbSg-9gYK_4Vn4FsJSS661vA5WsH1bAE';

export const supabase = createClient(supabaseUrl, supabaseKey);
