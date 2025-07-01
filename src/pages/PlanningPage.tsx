import React, { useState } from 'react';
import { PlusIcon, TargetIcon, TrendingUpIcon, CalendarIcon, EditIcon, TrashIcon } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  description: string;
}

interface Budget {
  id: string;
  category: string;
  budgetAmount: number;
  spentAmount: number;
  period: 'month' | 'week';
}

export const PlanningPage: React.FC = () => {
  const [goals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Отпуск в Турцию',
      targetAmount: 300000,
      currentAmount: 125000,
      deadline: '2024-07-01',
      category: 'Путешествия',
      description: 'Семейный отпуск на 10 дней'
    },
    {
      id: '2',
      title: 'Новый ноутбук',
      targetAmount: 500000,
      currentAmount: 200000,
      deadline: '2024-05-15',
      category: 'Техника',
      description: 'MacBook Pro для работы'
    },
    {
      id: '3',
      title: 'Экстренный фонд',
      targetAmount: 1000000,
      currentAmount: 650000,
      deadline: '2024-12-31',
      category: 'Безопасность',
      description: 'Резерв на 6 месяцев расходов'
    }
  ]);

  const [budgets] = useState<Budget[]>([
    {
      id: '1',
      category: 'Еда',
      budgetAmount: 80000,
      spentAmount: 65000,
      period: 'month'
    },
    {
      id: '2',
      category: 'Транспорт',
      budgetAmount: 25000,
      spentAmount: 18000,
      period: 'month'
    },
    {
      id: '3',
      category: 'Развлечения',
      budgetAmount: 30000,
      spentAmount: 35000,
      period: 'month'
    },
    {
      id: '4',
      category: 'Коммунальные услуги',
      budgetAmount: 40000,
      spentAmount: 38000,
      period: 'month'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'goals' | 'budgets'>('goals');

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ru-RU').format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getBudgetStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage > 100) return 'over';
    if (percentage > 80) return 'warning';
    return 'good';
  };

  const getBudgetColor = (status: string) => {
    switch (status) {
      case 'over': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Планирование</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
          <PlusIcon className="w-4 h-4" />
          Добавить
        </button>
      </div>

      {/* Табы */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('goals')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'goals'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <TargetIcon className="w-4 h-4" />
            Цели
          </div>
        </button>
        <button
          onClick={() => setActiveTab('budgets')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'budgets'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <TrendingUpIcon className="w-4 h-4" />
            Бюджеты
          </div>
        </button>
      </div>

      {/* Контент вкладок */}
      {activeTab === 'goals' && (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => {
              const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount);
              const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <div key={goal.id} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{goal.title}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {goal.category}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-gray-400 hover:text-blue-500">
                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-500">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{goal.description}</p>

                  {/* Прогресс */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Прогресс</span>
                      <span className="font-medium">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Суммы */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Накоплено:</span>
                      <span className="font-medium text-green-600">
                        {formatAmount(goal.currentAmount)} ₸
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Цель:</span>
                      <span className="font-medium">
                        {formatAmount(goal.targetAmount)} ₸
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Осталось:</span>
                      <span className="font-medium text-orange-600">
                        {formatAmount(goal.targetAmount - goal.currentAmount)} ₸
                      </span>
                    </div>
                  </div>

                  {/* Дедлайн */}
                  <div className="flex items-center text-sm text-gray-500 border-t pt-3">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <span>{formatDate(goal.deadline)}</span>
                    <span className="ml-auto">
                      {daysLeft > 0 ? `${daysLeft} дн.` : 'Просрочено'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'budgets' && (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {budgets.map((budget) => {
              const status = getBudgetStatus(budget.spentAmount, budget.budgetAmount);
              const percentage = (budget.spentAmount / budget.budgetAmount) * 100;
              const remaining = budget.budgetAmount - budget.spentAmount;
              
              return (
                <div key={budget.id} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{budget.category}</h3>
                      <span className="text-sm text-gray-500 capitalize">
                        {budget.period === 'month' ? 'Месячный' : 'Недельный'} бюджет
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-gray-400 hover:text-blue-500">
                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-500">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Прогресс расходов */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Потрачено</span>
                      <span className={`font-medium ${
                        status === 'over' ? 'text-red-600' : 
                        status === 'warning' ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-300 ${getBudgetColor(status)}`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Суммы */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Потрачено:</span>
                      <span className="font-medium">
                        {formatAmount(budget.spentAmount)} ₸
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Бюджет:</span>
                      <span className="font-medium">
                        {formatAmount(budget.budgetAmount)} ₸
                      </span>
                    </div>
                    <div className="flex justify-between text-sm border-t pt-2">
                      <span className="text-gray-600">
                        {remaining >= 0 ? 'Осталось:' : 'Превышение:'}
                      </span>
                      <span className={`font-medium ${
                        remaining >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatAmount(Math.abs(remaining))} ₸
                      </span>
                    </div>
                  </div>

                  {/* Статус */}
                  {status === 'over' && (
                    <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                      ⚠️ Бюджет превышен
                    </div>
                  )}
                  {status === 'warning' && (
                    <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700">
                      ⚡ Приближается к лимиту
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};