import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// --- ИСПРАВЛЕННЫЙ ПУТЬ ЗДЕСЬ ---
// Мы убрали лишнюю часть пути, так как App.tsx и supabaseClient.ts находятся в одной папке src
import { supabase } from './supabaseClient'; 

// Импорты ваших компонентов и страниц
import { AppContextProvider } from './context/AppContext';
import HomePage from './pages/HomePage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProfilePage from './pages/ProfilePage';
import AddTransactionPage from './pages/AddTransactionPage';
import BottomNav from './components/BottomNav';
import './App.css'; // Ваши глобальные стили

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // 1. Получаем текущую сессию при первой загрузке
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 2. Устанавливаем слушатель, который будет реагировать на
    //    события входа (SIGNED_IN) и выхода (SIGNED_OUT)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // 3. Отписываемся от слушателя, когда компонент размонтируется
    return () => subscription.unsubscribe();
  }, []);

  // Если сессии нет (пользователь не авторизован), показываем форму входа
  if (!session) {
    return (
      <div className="auth-container">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'github']} // Опционально: добавьте провайдеров
          theme="dark"
        />
      </div>
    );
  }

  // Если сессия есть, показываем основное приложение
  return (
    <AppContextProvider>
      <BrowserRouter>
        <div className="app-container">
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/add" element={<AddTransactionPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;