import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { FinleyCharacter } from '../components/finley/FinleyCharacter';

export const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <FinleyCharacter size="large" emotion="happy" />
          <h1 className="text-4xl font-bold text-gray-900 mt-4">
            Добро пожаловать в CoinQuest!
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            Твой персональный помощник в мире финансов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-lg font-semibold mb-2">💰 Баланс</h3>
            <p className="text-3xl font-bold text-green-600">$1,234.56</p>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-2">📊 Расходы за месяц</h3>
            <p className="text-3xl font-bold text-red-600">$456.78</p>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-2">🎯 Цели</h3>
            <p className="text-3xl font-bold text-blue-600">3 активные</p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
