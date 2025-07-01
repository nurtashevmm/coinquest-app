import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { supabase } from '../supabaseClient';
// ПРОБЛЕМНЫЙ ИМПОРТ { User } УДАЛЕН НАВСЕГДА

// --- ТИПЫ ДАННЫХ ---
export type Category = { id: number; name: string; type: 'income' | 'expense'; icon_name: string | null; };
export type Item = { id: number; name: string; price: number; icon_name: string; slot: string; };
export type UserItem = { id: number; user_id: string; item_id: number; is_equipped: boolean; items: Item; };
export type Profile = { id: string; username: string | null; level: number; xp: number; gold: number; currency: string; };
export type Transaction = { id: number; user_id: string; category_id: number; amount: number; type: 'income' | 'expense'; transaction_date: string; notes: string | null; categories: { name: string } };

// --- ИНТЕРФЕЙС КОНТЕКСТА ---
interface IAppContext {
  user: any | null; // Используем 'any' для 100% совместимости
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

// --- ПРОВАЙДЕР КОНТЕКСТА ---
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [storeItems, setStoreItems] = useState<Item[]>([]);
  const [userItems, setUserItems] = useState<UserItem[]>([]);
  
  const getProfile = useCallback(async (userId: string) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (data) setProfile(data);
  }, []);

  const getTransactions = useCallback(async (userId: string) => {
    const { data } = await supabase.from('transactions').select('*, categories(name)').eq('user_id', userId).order('transaction_date', { ascending: false });
    if (data) setTransactions(data as any);
  }, []);

  const getCategories = useCallback(async (userId: string) => {
    const { data } = await supabase.from('categories').select('*').or(`user_id.eq.${userId},user_id.is.null`);
    if (data) setCategories(data);
  }, []);

  const getStoreItems = useCallback(async () => {
    const { data } = await supabase.from('items').select('*');
    if (data) setStoreItems(data);
  }, []);

  const getUserItems = useCallback(async (userId: string) => {
    const { data } = await supabase.from('user_items').select('*, items(*)').eq('user_id', userId);
    if (data) setUserItems(data as UserItem[]);
  }, []);

  useEffect(() => {
    const initialize = async (sessionUser: any | null) => {
      setUser(sessionUser);
      if (sessionUser) {
        await Promise.all([
          getProfile(sessionUser.id),
          getTransactions(sessionUser.id),
          getCategories(sessionUser.id),
          getStoreItems(),
          getUserItems(sessionUser.id)
        ]);
      }
    };
    
    const bootstrap = async () => {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        await initialize(session?.user ?? null);
        setLoading(false);
    }

    bootstrap();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setLoading(true);
      await initialize(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [getProfile, getTransactions, getCategories, getStoreItems, getUserItems]);

  const addTransaction = useCallback(async (type: 'expense' | 'income', amount: number, categoryId: number) => {
    if (!user) return;
    const numericAmount = type === 'expense' ? -Math.abs(amount) : Math.abs(amount);
    
    const { data: newTransaction } = await supabase
      .from('transactions')
      .insert({ user_id: user.id, category_id: categoryId, amount: numericAmount, type })
      .select('*, categories(name)')
      .single();
    
    if (newTransaction) {
      setTransactions(prev => [newTransaction as any, ...prev]);
      await supabase.rpc('add_xp', { user_id_in: user.id, xp_to_add: 10 });
      await getProfile(user.id);
    }
  }, [user, getProfile]);

  const buyItem = useCallback(async (item: Item): Promise<boolean> => {
    if (!user || !profile || profile.gold < item.price) {
      alert('Недостаточно золота!');
      return false;
    }
    
    const { data: newProfile } = await supabase.from('profiles').update({ gold: profile.gold - item.price }).eq('id', user.id).select().single();
    const { data: newUserItem } = await supabase.from('user_items').insert({ user_id: user.id, item_id: item.id }).select('*, items(*)').single();

    if (newProfile && newUserItem) {
      setProfile(newProfile);
      setUserItems(prev => [...prev, newUserItem as UserItem]);
      return true;
    }
    return false;
  }, [user, profile]);

  const equipItem = useCallback(async (itemToEquip: UserItem) => {
    if (!user || !userItems) return;
  
    const currentlyEquipped = userItems.find(
      (item) => item.items.slot === itemToEquip.items.slot && item.is_equipped
    );
  
    const requests = [];
  
    if (currentlyEquipped && currentlyEquipped.id !== itemToEquip.id) {
      requests.push(
        supabase.from('user_items').update({ is_equipped: false }).eq('id', currentlyEquipped.id)
      );
    }
    
    const newEquippedState = !itemToEquip.is_equipped;
    requests.push(
      supabase.from('user_items').update({ is_equipped: newEquippedState }).eq('id', itemToEquip.id)
    );
  
    await Promise.all(requests);
  
    await getUserItems(user.id);
  }, [user, userItems, getUserItems]);
      
  const value = { user, profile, transactions, categories, addTransaction, loading, storeItems, userItems, buyItem, equipItem };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};