import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">CoinQuest</h1>
          </div>
          <nav className="flex space-x-8">
            <a href="/" className="text-gray-900 hover:text-blue-600">
              Главная
            </a>
            <a href="/transactions" className="text-gray-900 hover:text-blue-600">
              Транзакции
            </a>
            <a href="/planning" className="text-gray-900 hover:text-blue-600">
              Планирование
            </a>
            <a href="/profile" className="text-gray-900 hover:text-blue-600">
              Профиль
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
