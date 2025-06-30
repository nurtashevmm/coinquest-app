// src/context/AppContext.tsx - The Armory Update
import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { useInitData } from '@tma.js/sdk-react';
import { supabase } from '../supabaseClient';

// --- ТИПЫ ДАННЫХ ---
export type Item = { 
  id: number; 
  name: string; 
  price: number; 
  icon_name: string; 
  slot: 'head' | 'weapon' | 'shield'; 
};

export type UserItem = { 
  id: number; 
  user_id: string; 
  item_id: number; 
  is_equipped: boolean; 
  items: Item; // Включаем информацию о самом предмете
};

type Profile = { 
  id: string; 
  username: string | null; 
  level: number; 
  xp: number; 
  gold: number; 
};

type TmaUser = { id: number; firstName?: string; };

type Transaction = { 
  id: number; 
  amount: number; 
  category: string; 
  created_at: string; 
  type: 'income' | 'expense';
  user_id: number;
};

// --- ИНТЕРФЕЙС КОНТЕКСТА ---
interface IAppContext {
  tmaUser: TmaUser | undefined;
  profile: Profile | null;
  transactions: Transaction[];
  addTransaction: (type: 'expense' | 'income', amount: number, category: string) => Promise<void>;
  loading: boolean;
  storeItems: Item[];
  userItems: UserItem[];
  buyItem: (item: Item) => Promise<boolean>;
  equipItem: (userItem: UserItem) => Promise<void>;
}
    
const AppContext = createContext<IAppContext | null>(null);
const isDev = import.meta.env.DEV;

// --- ПРОВАЙДЕР КОНТЕКСТА ---
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [storeItems, setStoreItems] = useState<Item[]>([]);
  const [userItems, setUserItems] = useState<UserItem[]>([]);

  const initData = isDev ? null : useInitData();
  
  const tmaUser: TmaUser | undefined = useMemo(() => (
    isDev ? { id: 999999, firstName: 'Dev User' } : initData?.user
  ), [initData?.user]);

  // --- ФУНКЦИИ ДЛЯ РАБОТЫ С ДАННЫМИ ---
  const getProfile = useCallback(async () => {
    if (isDev) {
      setProfile({ id: 'dev-id', username: 'Dev User', level: 5, xp: 450, gold: 500 }); // Больше золота для теста
      return;
    }
    // Здесь будет реальная логика для Supabase Auth
  }, []);

  const getTransactions = useCallback(async () => { /* ... код без изменений ... */ }, [tmaUser]);

  const getStoreItems = useCallback(async () => {
    // В режиме разработки создаем фейковые предметы
    if (isDev) {
      const fakeItems: Item[] = [
        { id: 1, name: 'Деревянный щит', price: 50, icon_name: 'shield', slot: 'shield' },
        { id: 2, name: 'Простой меч', price: 100, icon_name: 'sword', slot: 'weapon' },
        { id: 3, name: 'Кожаный шлем', price: 80, icon_name: 'shield-half', slot: 'head' }
      ];
      setStoreItems(fakeItems);
      return;
    }
    // ... реальная логика ...
  }, []);

  const getUserItems = useCallback(async () => {
    if (isDev) {
      // Можно добавить фейковый предмет в инвентарь для теста
      return;
    }
    // ... реальная логика ...
  }, [tmaUser]);
  
  // --- ГЛАВНЫЙ USEEFFECT ДЛЯ ЗАГРУЗКИ ---
  useEffect(() => {
    setLoading(true);
    Promise.all([getProfile(), getTransactions(), getStoreItems(), getUserItems()]).finally(() => {
      setLoading(false);
    });
  }, [getProfile, getTransactions, getStoreItems, getUserItems]);


  const addTransaction = useCallback(async (type: 'expense' | 'income', amount: number, category: string) => { /* ... код без изменений ... */ }, [isDev, profile]);

  // --- НОВЫЕ ФУНКЦИИ ДЛЯ МАГАЗИНА ---
  const buyItem = useCallback(async (item: Item): Promise<boolean> => {
    if (isDev && profile && profile.gold >= item.price) {
      console.log(`Buying ${item.name} for ${item.price} gold`);
      // Уменьшаем золото
      setProfile(p => p ? { ...p, gold: p.gold - item.price } : null);
      // Добавляем предмет в инвентарь
      const newUserItem: UserItem = { 
        id: Math.random(), 
        item_id: item.id,
        user_id: 'dev-id',
        is_equipped: false,
        items: item // Добавляем полную информацию о предмете
      };
      setUserItems(prev => [...prev, newUserItem]);
      alert(`Вы купили ${item.name}!`);
      return true;
    }
    alert('Недостаточно золота!');
    return false;
  }, [isDev, profile]);

  const equipItem = useCallback(async (itemToEquip: UserItem) => {
    if (isDev) {
      console.log(`Equipping ${itemToEquip.items.name}`);
      setUserItems(prevItems => prevItems.map(item => {
        // Снимаем другой предмет в том же слоте
        if (item.items.slot === itemToEquip.items.slot) {
          return { ...item, is_equipped: false };
        }
        return item;
      }).map(item => {
        // Надеваем выбранный предмет
        if (item.id === itemToEquip.id) {
          return { ...item, is_equipped: true };
        }
        return item;
      }));
    }
  }, [isDev]);
      
  const value = { tmaUser, profile, transactions, addTransaction, loading, storeItems, userItems, buyItem, equipItem };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// --- ХУК ДЛЯ ДОСТУПА К КОНТЕКСТУ ---
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};