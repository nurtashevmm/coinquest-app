import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { User as UserIcon, Coins, Swords, Store } from 'lucide-react';
import { motion } from 'framer-motion';
import { GameIcon } from '../components/GameIcon';
import type { Item, UserItem } from '../context/AppContext';

export const ProfilePage = () => {
  const { profile, storeItems, userItems, buyItem, equipItem, loading } = useAppContext();
  const [activeTab, setActiveTab] = useState<'inventory' | 'store'>('inventory');

  if (loading || !profile) {
    return <div className="container">Загрузка профиля...</div>;
  }
  
  const xpForNextLevel = profile.level * 100;
  const progressPercentage = (profile.xp / xpForNextLevel) * 100;

  const equippedItems = userItems.filter(item => item.is_equipped);
  const headItem = equippedItems.find(item => item.items.slot === 'head');
  const accessoryItem = equippedItems.find(item => item.items.slot === 'accessory');

  return (
    <div className="container">
      <div className="glass-card">
        <div className="profile-header">
          <div className="avatar-container">
            <div className="avatar-placeholder">
              {/* Будущий аватар Финли */}
            </div>
            {headItem && <div className="equip-slot head"><GameIcon name={headItem.items.icon_name} size={20}/></div>}
            {accessoryItem && <div className="equip-slot accessory"><GameIcon name={accessoryItem.items.icon_name} size={20}/></div>}
          </div>
          <div className="profile-info">
            <h2 className="profile-username">{profile.username || 'Герой Квеста'}</h2>
            <div className="profile-badges">
              <div className="level-badge">Уровень {profile.level}</div>
              <div className="gold-balance">
                <Coins size={14} strokeWidth={2} />
                <span>{profile.gold}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="xp-bar">
          <div className="xp-bar-labels"><span>Опыт</span><span>{profile.xp} / {xpForNextLevel}</span></div>
          <div className="xp-bar-background"><motion.div className="xp-bar-progress" initial={{ width: 0 }} animate={{ width: `${progressPercentage}%` }} transition={{ duration: 0.8, ease: "circOut" }} /></div>
        </div>
      </div>

      <div className="glass-card-tabs">
        <div className={`type-switcher ${activeTab === 'store' ? 'income-active' : ''}`}>
          <button onClick={() => setActiveTab('inventory')} className={activeTab === 'inventory' ? 'active' : ''}><Swords size={16}/> Инвентарь</button>
          <button onClick={() => setActiveTab('store')} className={activeTab === 'store' ? 'active' : ''}><Store size={16}/> Магазин</button>
        </div>

        <div className="item-grid">
          {activeTab === 'inventory' && (
            userItems.length > 0 
              ? userItems.map(userItem => <InventoryItem key={userItem.id} userItem={userItem} onEquip={equipItem} />) 
              : <p className="grid-placeholder">Ваш инвентарь пуст.</p>
          )}
          {activeTab === 'store' && (
            storeItems.map(item => <StoreItem key={item.id} item={item} onBuy={buyItem} userGold={profile.gold} userItems={userItems} />)
          )}
        </div>
      </div>
    </div>
  );
};

interface StoreItemProps { item: Item; onBuy: (item: Item) => void; userGold: number; userItems: UserItem[]; }
const StoreItem = ({ item, onBuy, userGold, userItems }: StoreItemProps) => { /* ... без изменений ... */ };

interface InventoryItemProps { userItem: UserItem; onEquip: (userItem: UserItem) => void; }
const InventoryItem = ({ userItem, onEquip }: InventoryItemProps) => { /* ... без изменений ... */ };