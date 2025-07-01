import React from 'react';

interface NavigationProps {
  currentPage: string;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage }) => {
  const navItems = [
    { id: 'home', label: 'Главная', href: '/' },
    { id: 'transactions', label: 'Транзакции', href: '/transactions' },
    { id: 'planning', label: 'Планирование', href: '/planning' },
    { id: 'profile', label: 'Профиль', href: '/profile' }
  ];

  return (
    <nav className="bg-gray-50 border-r min-h-screen w-64 p-4">
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              className={`block px-4 py-2 rounded-lg transition-colors ${
                currentPage === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
