import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { User as SupabaseUser } from '@supabase/supabase-js';

// --- ТИПЫ ДАННЫХ ---
export type Category = { id: number; name: string; type: 'income' | 'expense'; icon_name: string | null; };
export type Item = { id: number; name: string; price: number; icon_name: string; slot: string; };
export type UserItem = { id: number; user_id: string; item_id: number; is_equipped: boolean; items: Item; };
export type Profile = { id: string; username: string | null; level: number; xp: number; gold: number; currency: string; };
export type Transaction = { id: number; user_id: string; category_id: number; amount: number; type: 'income' | 'expense'; transaction_date: string; notes: string | null; };

// --- ИНТЕРФЕЙС КОНТЕКСТА ---
interface IAppContext {
  supabaseUser: SupabaseUser | null;
  profile: Profile | null;
  transactions: Transaction[];
  categories: Category[];
  addTransaction: (type: 'expense' | 'income', amount: number, categoryId: number) => Promise<void>;
  loading: boolean;
  storeItems: Item[];
  userItems: UserItem[];
  buyItem: (item: Item) => Promise<boolean>;
  equipItem: (userItem: UserItem) => Promise<void>;
}
    
const AppContext = createContext<IAppContext | null>(null);

// --- РЕЖИМ РАЗРАБОТКИ ---
const isDev = import.meta.env.DEV;

// --- ПРОВАЙДЕР КОНТЕКСТА ---
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [storeItems, setStoreItems] = useState<Item[]>([]);
  const [userItems, setUserItems] = useState<UserItem[]>([]);
  
  const getProfile = useCallback(async (userId: string) => { /* ... */ });
  const getTransactions = useCallback(async (userId: string) => { /* ... */ });
  const getCategories = useCallback(async (userId: string) => { /* ... */ });
  const getStoreItems = useCallback(async () => { /* ... */ });
  const getUserItems = useCallback(async (userId: string) => { /* ... */ });

  useEffect(() => {
    if (isDev) {
      const fetchDevData = async () => {
        setLoading(true);
        setProfile({ id: 'dev-id', username: 'Dev User', level: 5, xp: 450, gold: 500, currency: '₽' });
        setCategories([
          { id: 1, name: 'Продукты', type: 'expense', icon_name: null },
          { id: 2, name: 'Кафе', type: 'expense', icon_name: null },
          { id: 3, name: 'Зарплата', type: 'income', icon_name: null },
        ]);
        setStoreItems([
          { id: 1, name: 'Уютный шарфик', price: 80, icon_name: 'wind', slot: 'accessory' },
          { id: 2, name: 'Модная кепка', price: 120, icon_name: 'a-large-small', slot: 'head' },
        ]);
        setUserItems([]);
        setLoading(false);
      }
      fetchDevData();
      return;
    }

    const fetchInitialData = async (user: SupabaseUser) => {
      await Promise.all([
        getProfile(user.id),
        getTransactions(user.id),
        getCategories(user.id),
        getStoreItems(),
        getUserItems(user.id)
      ]);
    };

    const initialize = async () => {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user;
        setSupabaseUser(user ?? null);
        if (user) {
          await fetchInitialData(user);
        }
        setLoading(false);
    }
    initialize();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user;
      setSupabaseUser(user ?? null);
      if (user) {
        setLoading(true);
        await fetchInitialData(user);
        setLoading(false);
      } else {
        setProfile(null);
        setTransactions([]);
        setUserItems([]);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [getProfile, getTransactions, getCategories, getStoreItems, getUserItems]);

  const addTransaction = useCallback(async (type: 'expense' | 'income', amount: number, categoryId: number) => {
    if (isDev) {
      const newTransaction = {
        id: Math.random(), amount: type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
        category_id: categoryId, created_at: new Date().toISOString(), type, user_id: 'dev-id', notes: null
      };
      setTransactions(prev => [newTransaction, ...prev]);
      if (profile) {
        const newXp = profile.xp + 10;
        const xpForNextLevel = profile.level * 100;
        setProfile(p => {
          if (!p) return null;
          if (newXp >= xpForNextLevel) {
            return { ...p, level: p.level + 1, xp: newXp - xpForNextLevel, gold: p.gold + (p.level * 10) };
          }
          return { ...p, xp: newXp };
        });
      }
      return;
    }

    if (!supabaseUser) return;
    // ... Реальная логика для продакшена ...
  }, [profile, supabaseUser, getProfile]);

  const buyItem = useCallback(async (item: Item): Promise<boolean> => {
    if (isDev) {
        if (!profile || profile.gold < item.price) {
            alert('Недостаточно золота!');
            return false;
        }
        setProfile(p => p ? { ...p, gold: p.gold - item.price } : null);
        const newUserItem: UserItem = { id: Math.random(), item_id: item.id, user_id: 'dev-id', is_equipped: false, items: item };
        setUserItems(prev => [...prev, newUserItem]);
        return true;
    }
    // ... Реальная логика для продакшена ...
    return false;
  }, [profile]);

  const equipItem = useCallback(async (itemToEquip: UserItem) => {
    if (isDev) {
        setUserItems(prevItems => prevItems.map(item => ({
            ...item,
            is_equipped: item.items.slot === itemToEquip.items.slot ? item.id === itemToEquip.id ? !item.is_equipped : false : item.is_equipped
        })));
        return;
    }
    // ... Реальная логика для продакшена ...
  }, []);
      
  const value = { supabaseUser, profile, transactions, categories, addTransaction, loading, storeItems, userItems, buyItem, equipItem };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};