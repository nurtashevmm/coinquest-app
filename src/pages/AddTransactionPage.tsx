import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export const AddTransactionPage = () => {
  const [amount, setAmount] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const navigate = useNavigate();
  const { addTransaction, categories } = useAppContext();

  const filteredCategories = categories.filter(c => c.type === type);

  useEffect(() => {
    if (filteredCategories.length > 0) {
      setSelectedCategoryId(filteredCategories[0].id);
    }
  }, [type, categories]);
  
  const handleAdd = async () => {
    if (amount && selectedCategoryId) {
      await addTransaction(type, parseFloat(amount), selectedCategoryId);
      navigate('/');
    }
  };

  return (
    <div className="container">
      <div className="glass-card">
        <div className={`type-switcher ${type === 'income' ? 'income-active' : ''}`}>
          <button onClick={() => setType('expense')} className={type === 'expense' ? 'active' : ''}>Расход</button>
          <button onClick={() => setType('income')} className={type === 'income' ? 'active' : ''}>Доход</button>
        </div>

        <input 
            type="tel"
            inputMode="decimal"
            pattern="[0-9]*"
            value={amount} 
            onChange={e => e.target.value.match(/^\d*\.?\d*$/) && setAmount(e.target.value)}
            placeholder="0.00"
            className="amount-input"
            autoFocus
        />
        <div className="categories">
            {filteredCategories.map(cat => (
                <button 
                    key={cat.id}
                    className={`cat-btn ${selectedCategoryId === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategoryId(cat.id)}
                >{cat.name}</button>
            ))}
        </div>
        <button className={`btn ${type}`} onClick={handleAdd}>
          Добавить
        </button>
      </div>
    </div>
  );
};