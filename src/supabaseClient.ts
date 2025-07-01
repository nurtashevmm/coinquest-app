import { createClient } from '@supabase/supabase-js';

// --- НАЧАЛО ДИАГНОСТИЧЕСКОГО КОДА ---
// Добавим console.log, чтобы проверить, что Vite видит переменные.
// Эти строчки можно будет удалить после решения проблемы.

console.log('--- Переменные окружения ---');
console.log('VITE_SUPABASE_PROJECT_URL:', import.meta.env.VITE_SUPABASE_PROJECT_URL);
console.log('VITE_SUPABASE_API_KEY:', import.meta.env.VITE_SUPABASE_API_KEY ? 'Ключ найден' : 'Ключ НЕ найден');
console.log('-----------------------------');

// --- КОНЕЦ ДИАГНОСТИЧЕСКОГО КОДА ---

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

// Ваш остальной код...
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or Key not found. Make sure you have a .env.local file and have restarted the server.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);