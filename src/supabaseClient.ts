// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Вставь сюда свои данные из Supabase
const supabaseUrl = 'https://ydzuytzovgyyyeactqgp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkenV5dHpvdmd5eXllYWN0cWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMDU1NzUsImV4cCI6MjA2Njg4MTU3NX0.K-VOG1Hk1rycWptH1TlDjSbcq2dUMaex-AHcEVpc3ks';

// Проверяем, что ключи вставлены
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key are required.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);