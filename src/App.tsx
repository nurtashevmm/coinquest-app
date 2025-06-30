// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext'; // Импортируем наш провайдер
import { BottomNav } from './components/BottomNav';
import { HomePage } from './pages/HomePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AddTransactionPage } from './pages/AddTransactionPage';

import './styles/App.css'; 
import './components/BottomNav.css';

function App() {
  return (
    // Оборачиваем все приложение в AppProvider
    <AppProvider>
      <BrowserRouter>
        <div className="app-container">
          <main className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/add" element={<AddTransactionPage />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;