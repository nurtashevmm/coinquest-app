import { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const AnalyticsPage = () => {
  const { transactions, categories } = useAppContext();
  const [period, setPeriod] = useState<'month' | 'all'>('month');

  const categoryMap = useMemo(() => {
    return new Map(categories.map(c => [c.id, c.name]));
  }, [categories]);

  const chartData = useMemo(() => {
    const now = new Date();
    
    // Фильтруем расходы
    const expenses = transactions.filter(t => {
      if (t.type !== 'expense') return false;
      if (period === 'month') {
        const transactionDate = new Date(t.transaction_date);
        return transactionDate.getMonth() === now.getMonth() && transactionDate.getFullYear() === now.getFullYear();
      }
      return true;
    });

    if (expenses.length === 0) {
      return [];
    }

    // Группируем по категориям
    const grouped = expenses.reduce((acc, t) => {
      const categoryName = categoryMap.get(t.category_id) || 'Без категории';
      const amount = Math.abs(t.amount);
      if (!acc[categoryName]) {
        acc[categoryName] = 0;
      }
      acc[categoryName] += amount;
      return acc;
    }, {} as Record<string, number>);

    // Форматируем для графика
    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2)),
    }));
  }, [transactions, period, categoryMap]);

  const COLORS = ['#007AFF', '#34C759', '#FF9500', '#FF3B30', '#AF52DE', '#5AC8FA', '#FFCC00'];

  return (
    <div className="container">
      <div className="glass-card">
        <div className={`type-switcher ${period === 'all' ? 'income-active' : ''}`}>
          <button onClick={() => setPeriod('month')} className={period === 'month' ? 'active' : ''}>За месяц</button>
          <button onClick={() => setPeriod('all')} className={period === 'all' ? 'active' : ''}>За всё время</button>
        </div>

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