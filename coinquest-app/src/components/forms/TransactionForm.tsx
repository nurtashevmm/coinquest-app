import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface TransactionFormProps {
  onSubmit: (transaction: any) => void;
  onCancel: () => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  onCancel
}) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount: parseFloat(amount),
      description,
      category,
      type,
      date: new Date().toISOString()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <button
          type="button"
          className={`px-4 py-2 rounded ${
            type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setType('expense')}
        >
          Расход
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded ${
            type === 'income' ? 'bg-green-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setType('income')}
        >
          Доход
        </button>
      </div>

      <Input
        label="Сумма"
        type="number"
        value={amount}
        onChange={setAmount}
        placeholder="0.00"
        required
      />

      <Input
        label="Описание"
        value={description}
        onChange={setDescription}
        placeholder="Описание транзакции"
        required
      />

      <Input
        label="Категория"
        value={category}
        onChange={setCategory}
        placeholder="Категория"
        required
      />

      <div className="flex gap-2 pt-4">
        <Button type="submit" variant="primary">
          Добавить
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </form>
  );
};
