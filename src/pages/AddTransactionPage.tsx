// src/pages/AddTransactionPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export const AddTransactionPage = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const navigate = useNavigate();
  const { addTransaction } = useAppContext();

  // Устанавливаем категорию по умолчанию при смене типа
  useEffect(() => {
    if (type === 'expense') {
      setCategory('Продукты');
    } else {
      setCategory('Зарплата');
    }
  }, [type]);
  
  const handleAdd = async () => {
    if (amount) {
      await addTransaction(type, parseFloat(amount), category);
      navigate('/'); // Возвращаемся на главную после добавления
    }
  };

  const expenseCategories = ['Продукты', 'Кафе', 'Транспорт', 'Дом', 'Развлечения', 'Связь'];
  const incomeCategories = ['Зарплата', 'Подарок', 'Подработка', 'Продажа'];

  return (
    <div className="container">
      <div className="glass-card">
        {/* Переключатель Доход/Расход */}
        <div className={`type-switcher ${type === 'income' ? 'income-active' : ''}`}>
          <button onClick={() => setType('expense')} className={type === 'expense' ? 'active' : ''}>Расход</button>
          <button onClick={() => setType('income')} className={type === 'income' ? 'active' : ''}>Доход</button>
        </div>

        <input 
            type="number" 
            value={amount} 
            onChange={e => setAmount(e.target.value)}
            placeholder="0.00"
            className="amount-input"
            autoFocus
        />
        <div className="categories">
            {(type === 'expense' ? expenseCategories : incomeCategories).map(cat => (
                <button 
                    key={cat}
                    className={`cat-btn ${category === cat ? 'active' : ''}`}
                    onClick={() => setCategory(cat)}
                >{cat}</button>
            ))}
        </div>
        <button 
          className={`btn ${type}`} 
          onClick={handleAdd}
        >
          {type === 'expense' ? 'Добавить расход' : 'Добавить доход'}
        </button>
      </div>
    </div>
  );
};