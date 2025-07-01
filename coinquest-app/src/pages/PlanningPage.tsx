import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';

export const PlanningPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Планирование</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4">🎯 Финансовые цели</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-medium">Новый ноутбук</p>
                <p className="text-sm text-gray-600">$800 из $1200</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '66%'}}></div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-4">📊 Бюджет</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Еда</span>
                <span>$200 / $300</span>
              </div>
              <div className="flex justify-between">
                <span>Транспорт</span>
                <span>$50 / $100</span>
              </div>
              <div className="flex justify-between">
                <span>Развлечения</span>
                <span>$80 / $150</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
