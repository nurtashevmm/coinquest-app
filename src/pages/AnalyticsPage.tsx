// src/pages/AnalyticsPage.tsx
import { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const AnalyticsPage = () => {
  const { transactions } = useAppContext();
  const [period, setPeriod] = useState<'month' | 'all'>('month');

  // 2. Подготавливаем данные для графика
  const chartData = useMemo(() => {
    const now = new Date();
    
    // Фильтруем только расходы и за нужный период
    const expenses = transactions.filter(t => {
      if (t.amount >= 0) return false; // Убираем доходы
      if (period === 'month') {
        const transactionDate = new Date(t.created_at);
        return transactionDate.getMonth() === now.getMonth() && transactionDate.getFullYear() === now.getFullYear();
      }
      return true; // для 'all' берем все расходы
    });

    if (expenses.length === 0) return [];

    // Группируем по категориям и считаем сумму
    const grouped = expenses.reduce((acc, t) => {
      const category = t.category;
      const amount = Math.abs(t.amount); // Берем сумму по модулю
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {} as Record<string, number>);

    // Превращаем в формат, который понимает библиотека
    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2)),
    }));
  }, [transactions, period]);

  // 3. Красивые цвета для диаграммы
  const COLORS = ['#007AFF', '#34C759', '#FF9500', '#FF3B30', '#AF52DE', '#5AC8FA', '#FFCC00'];

  return (
    <div className="container">
      <h1>Аналитика</h1>
      <div className="glass-card">
        {/* Переключатель периода */}
        <div className={`type-switcher ${period === 'all' ? 'income-active' : ''}`}>
          <button onClick={() => setPeriod('month')} className={period === 'month' ? 'active' : ''}>За месяц</button>
          <button onClick={() => setPeriod('all')} className={period === 'all' ? 'active' : ''}>За всё время</button>
        </div>

        {/* 4. Отображение графика или заглушки */}
        <div className="chart-container">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px' 
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data-text">Нет данных о расходах за этот период</p>
          )}
        </div>
      </div>
    </div>
  );
};