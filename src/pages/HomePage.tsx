import { useAppContext } from '../context/AppContext';

export const HomePage = () => {
  const { profile, transactions, categories, loading } = useAppContext();

  const categoryMap = new Map(categories.map(c => [c.id, c.name]));
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);

  if (loading || !profile) {
    return <div className="container">Загрузка...</div>;
  }

  return (
    <div className="container page-home">
      <div className="page-header">
        <h1>CoinQuest</h1>
        <p className="welcome-text">Привет, {profile.username || 'Герой'}!</p>
      </div>
      
      <div className="balance-container">
        <span className="balance-label">Текущий баланс</span>
        <div className="balance text-glass">
          {total.toFixed(2)}
          <span className="currency-symbol"> {profile.currency}</span>
        </div>
      </div>
      
      <div className="glass-card">
        <div className="list">
          <h3>Последние операции:</h3>
          {transactions.length > 0 ? (
            transactions.slice(0, 5).map(t => (
              <div key={t.id} className="item">
                <span>{categoryMap.get(t.category_id) || 'Без категории'}</span>
                <span className={t.amount < 0 ? 'amount-expense' : 'amount-income'}>
                  {t.amount > 0 ? '+' : ''}{t.amount.toFixed(2)}
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