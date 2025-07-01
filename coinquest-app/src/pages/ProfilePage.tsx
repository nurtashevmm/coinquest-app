import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { FinleyCustomization } from '../components/finley/FinleyCustomization';

export const ProfilePage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Профиль</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <FinleyCustomization />
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-4">Настройки</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Язык</label>
                <select className="w-full p-2 border rounded">
                  <option>Русский</option>
                  <option>English</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Валюта</label>
                <select className="w-full p-2 border rounded">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>RUB</option>
                </select>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
