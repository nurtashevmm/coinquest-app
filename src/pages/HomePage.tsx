// src/pages/HomePage.tsx - Элегантная Перекомпоновка
import { useAppContext } from '../context/AppContext';

export const HomePage = () => {
  const { tmaUser, transactions, loading } = useAppContext();
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);

  if (loading) {
    return <div className="container">Загрузка...</div>;
  }

  return (
    // Убираем из основного контейнера `text-align: center` для гибкости
    <div className="container page-home">
      
      {/* Новый заголовок */}
      <div className="page-header">
        <h1 className="text-glass">CoinQuest</h1>
        <p className="welcome-text">Привет, {tmaUser?.firstName || 'Герой'}!</p>
      </div>
      
      {/* Главный элемент - Баланс */}
      <div className="balance-container">
        <span className="balance-label">Текущий баланс</span>
        <div className="balance text-glass">
          {total.toFixed(2)}
          <span className="currency-symbol"> ₽</span>
        </div>
      </div>
      
      <div className="glass-card">
        <div className="list">
          <h3>Последние операции:</h3>
          {transactions.length > 0 ? (
            transactions.slice(0, 5).map(t => (
              <div key={t.id} className="item">
                <span>{t.category}</span>
                <span className={t.amount < 0 ? 'amount-expense' : 'amount-income'}>
                  {t.amount > 0 ? '+' : ''}{t.amount.toFixed(2)} ₽
                </span>
              </div>
            ))
          ) : (
            <p>Операций пока нет.</p>
          )}
        </div>
      </div>
    </div>
  );
};