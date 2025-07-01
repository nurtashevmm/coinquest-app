import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { TransactionForm } from '../components/forms/TransactionForm';

export const TransactionsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      id: '1',
      amount: -50.00,
      description: 'Продукты',
      category: 'Еда',
      date: '2024-01-15',
      type: 'expense'
    },
    {
      id: '2',
      amount: 1000.00,
      description: 'Зарплата',
      category: 'Доход',
      date: '2024-01-01',
      type: 'income'
    }
  ]);

  const handleAddTransaction = (transaction: any) => {
    setTransactions([...transactions, { ...transaction, id: Date.now().toString() }]);
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Транзакции</h1>
          <Button onClick={() => setIsModalOpen(true)}>
            Добавить транзакцию
          </Button>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">История транзакций</h2>
          </div>
          <div className="divide-y">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="px-6 py-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
                </div>
                <p className={`font-bold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Добавить транзакцию"
        >
          <TransactionForm
            onSubmit={handleAddTransaction}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </Layout>
  );
};
