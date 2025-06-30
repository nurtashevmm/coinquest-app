// src/App.tsx
import { useEffect, useState } from 'react';
// Мы все еще импортируем хуки, но будем вызывать их УСЛОВНО
import { useMiniApp, useInitData } from '@tma.js/sdk-react';
import { supabase } from './supabaseClient';
import './App.css';

// Определяем тип для пользователя, чтобы наш фейковый объект ему соответствовал
type User = {
  id: number;
  firstName?: string;
};

type Transaction = {
  id: number;
  amount: number;
  category: string;
  created_at: string;
};

// Эта переменная будет `true` только при локальном запуске (npm run dev)
const isDev = import.meta.env.DEV;

function App() {
  // --- НАШЕ ГЛАВНОЕ ИЗМЕНЕНИЕ ---
  // В режиме разработки мы не вызываем хуки, а создаем фейковые данные
  const miniApp = isDev ? null : useMiniApp();
  const initData = isDev ? null : useInitData();
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [view, setView] = useState('main');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Продукты');

  // Создаем фейкового пользователя для разработки или берем настоящего из Telegram
  const tgUser: User | undefined = isDev
    ? { id: 999999, firstName: 'Dev User' } // Наш фейковый юзер
    : initData?.user; // Настоящий юзер (в продакшене)

  useEffect(() => {
    // Вызываем .ready() только в продакшене
    if (!isDev && miniApp) {
      miniApp.ready();
    }
    if (tgUser) {
      getTransactions();
    }
  }, [tgUser, miniApp]);

  async function getTransactions() {
    if (!tgUser) return;
    const { data } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', tgUser.id)
      .order('created_at', { ascending: false });
    if (data) setTransactions(data);
  }

  async function addTransaction(type: 'expense' | 'income') {
    if (!amount || !tgUser) return;
    
    const numericAmount = type === 'expense' ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount));

    const { data } = await supabase
      .from('transactions')
      .insert({ user_id: tgUser.id, amount: numericAmount, type, category })
      .select()
      .single();
    
    if (data) {
        setTransactions([data, ...transactions]);
    }
    
    setAmount('');
    setView('main');
  }

  if (!tgUser) {
    return <div className="container">Загрузка...</div>;
  }
  
  // Дальше код без изменений, он просто работает с объектом tgUser
  if (view === 'main') {
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    return (
      <div className="container">
        <h1>CoinQuest</h1>
        <p className="welcome-text">Привет, {tgUser.firstName || 'Герой'}!</p>
        <div className="balance">Баланс: {total.toFixed(2)} ₽</div>
        <div className="actions">
          <button className="btn expense" onClick={() => setView('add')}>- Расход</button>
        </div>
        <div className="list">
          <h3>Последние операции:</h3>
          {transactions.length === 0 && <p>Операций пока нет.</p>}
          {transactions.map(t => (
            <div key={t.id} className="item">
              <span>{t.category}</span>
              <span className={t.amount < 0 ? 'amount-expense' : 'amount-income'}>
                {t.amount > 0 ? '+' : ''}{t.amount.toFixed(2)} ₽
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'add') {
    return (
        <div className="container">
            <h2>Новый расход</h2>
            <input 
                type="number" 
                value={amount} 
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                className="amount-input"
                autoFocus
            />
            <div className="categories">
                {['Продукты', 'Кафе', 'Транспорт', 'Дом', 'Развлечения', 'Связь'].map(cat => (
                    <button 
                        key={cat}
                        className={`cat-btn ${category === cat ? 'active' : ''}`}
                        onClick={() => setCategory(cat)}
                    >{cat}</button>
                ))}
            </div>
            <button className="btn expense" onClick={() => addTransaction('expense')}>Добавить расход</button>
            <button className="btn-link" onClick={() => setView('main')}>Отмена</button>
        </div>
    )
  }
  
  return null;
}

export default App;