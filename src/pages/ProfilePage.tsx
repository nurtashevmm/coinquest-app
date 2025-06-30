// src/pages/ProfilePage.tsx - The Armory Update
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { User as UserIcon, Coins, Dna, Store, Swords } from 'lucide-react';
import { motion } from 'framer-motion';
import { GameIcon } from '../components/GameIcon';
import type { Item, UserItem } from '../context/AppContext';

export const ProfilePage = () => {
  const { tmaUser, profile, storeItems, userItems, buyItem, equipItem, loading } = useAppContext();
  const [activeTab, setActiveTab] = useState<'inventory' | 'store'>('inventory');

  if (loading || !profile) {
    return <div className="container">Загрузка профиля...</div>;
  }
  
  const xpForNextLevel = profile.level * 100;
  const progressPercentage = (profile.xp / xpForNextLevel) * 100;

  // Находим надетые предметы для отображения на аватаре
  const equippedItems = userItems.filter(item => item.is_equipped);
  const headItem = equippedItems.find(item => item.items.slot === 'head');
  const weaponItem = equippedItems.find(item => item.items.slot === 'weapon');
  const shieldItem = equippedItems.find(item => item.items.slot === 'shield');

  return (
    <div className="container">
      <h1>Профиль</h1>
      {/* --- КАРТОЧКА ПРОФИЛЯ --- */}
      <div className="glass-card">
        <div className="profile-header">
          {/* Аватар теперь с надетыми предметами! */}
          <div className="avatar-container">
            <div className="avatar-placeholder">
              {headItem ? <GameIcon name={headItem.items.icon_name} /> : <UserIcon size={40} strokeWidth={1.5} />}
            </div>
            {weaponItem && <div className="equip-slot weapon"><GameIcon name={weaponItem.items.icon_name} size={20}/></div>}
            {shieldItem && <div className="equip-slot shield"><GameIcon name={shieldItem.items.icon_name} size={20}/></div>}
          </div>
          <div className="profile-info">
            <h2 className="profile-username">{tmaUser?.firstName || 'Герой Квеста'}</h2>
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

      {/* --- ПЕРЕКЛЮЧАТЕЛЬ ИНВЕНТАРЬ/МАГАЗИН --- */}
      <div className="glass-card-tabs">
        <div className={`type-switcher ${activeTab === 'store' ? 'income-active' : ''}`}>
          <button onClick={() => setActiveTab('inventory')} className={activeTab === 'inventory' ? 'active' : ''}><Swords size={16}/> Инвентарь</button>
          <button onClick={() => setActiveTab('store')} className={activeTab === 'store' ? 'active' : ''}><Store size={16}/> Магазин</button>
        </div>

        {/* --- СОДЕРЖИМОЕ ВКЛАДОК --- */}
        <div className="item-grid">
          {activeTab === 'inventory' && (
            userItems.length > 0 
              ? userItems.map(userItem => <InventoryItem key={userItem.id} userItem={userItem} onEquip={equipItem} />) 
              : <p className="grid-placeholder">Ваш инвентарь пуст. Купите что-нибудь в магазине!</p>
          )}
          {activeTab === 'store' && (
            storeItems.map(item => <StoreItem key={item.id} item={item} onBuy={buyItem} userGold={profile.gold} userItems={userItems} />)
          )}
        </div>
      </div>
    </div>
  );
};


// --- КОМПОНЕНТЫ ДЛЯ ПРЕДМЕТОВ ---

interface StoreItemProps { item: Item; onBuy: (item: Item) => void; userGold: number; userItems: UserItem[]; }
const StoreItem = ({ item, onBuy, userGold, userItems }: StoreItemProps) => {
  const isPurchased = userItems.some(ui => ui.item_id === item.id);
  const canAfford = userGold >= item.price;
  
  return (
    <div className={`item-card store ${isPurchased ? 'purchased' : ''}`}>
      <div className="item-icon"><GameIcon name={item.icon_name} size={32} /></div>
      <span className="item-name">{item.name}</span>
      {isPurchased ? (
        <button className="item-button purchased" disabled>Куплено</button>
      ) : (
        <button className="item-button buy" onClick={() => onBuy(item)} disabled={!canAfford}>
          <Coins size={14}/> {item.price}
        </button>
      )}
    </div>
  );
};


interface InventoryItemProps { userItem: UserItem; onEquip: (userItem: UserItem) => void; }
const InventoryItem = ({ userItem, onEquip }: InventoryItemProps) => {
  return (
    <div className={`item-card inventory ${userItem.is_equipped ? 'equipped' : ''}`}>
      <div className="item-icon"><GameIcon name={userItem.items.icon_name} size={32} /></div>
      <span className="item-name">{userItem.items.name}</span>
      <button className="item-button equip" onClick={() => onEquip(userItem)} disabled={userItem.is_equipped}>
        {userItem.is_equipped ? 'Надето' : 'Надеть'}
      </button>
    </div>
  );
};