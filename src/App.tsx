import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './pages/HomePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AddTransactionPage } from './pages/AddTransactionPage';
import { Auth } from './supabaseClient';
import { supabase } from './supabaseClient';

import './styles/App.css'; 
import './components/BottomNav.css';

const AppContent = () => {
  const { user, loading } = useAppContext();

  if (loading) {
    return <div className="container">Загрузка...</div>;
  }
  
  if (!user) {
    return (
      <div className="container" style={{ paddingTop: '50px' }}>
        <div className="glass-card">
          <h2>Вход в CoinQuest</h2>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: 'dark' }}
            providers={['telegram']}
            theme="light"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/add" element={<AddTransactionPage />} />
        </Routes>
      </main>
      <BottomNav />
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;