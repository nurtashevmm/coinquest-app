import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './pages/HomePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AddTransactionPage } from './pages/AddTransactionPage';

import './styles/App.css'; 
import './components/BottomNav.css';

const Header = () => {
  const location = useLocation();
  if (location.pathname === '/') return null;

  let title = '';
  if (location.pathname.startsWith('/analytics')) title = 'Аналитика';
  if (location.pathname.startsWith('/profile')) title = 'Профиль';
  if (location.pathname.startsWith('/add')) title = 'Новая операция';

  return (
    <div className="global-header">
      <h1 className="app-title">{title}</h1>
    </div>
  );
};


function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Header />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/add" element={<AddTransactionPage />} />
          </Routes>
        </main>
        <BottomNav />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;