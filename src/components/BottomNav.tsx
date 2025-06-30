// src/components/BottomNav.tsx
import './BottomNav.css'; // Эта строчка импортирует стили
import { Home, BarChart2, User, Plus } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <Home size={24} />
        <span>Главная</span>
      </NavLink>
      <NavLink to="/analytics" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <BarChart2 size={24} />
        <span>Аналитика</span>
      </NavLink>
      <NavLink to="/add" className="add-button">
        <Plus size={32} />
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <User size={24} />
        <span>Профиль</span>
      </NavLink>
    </nav>
  );
};