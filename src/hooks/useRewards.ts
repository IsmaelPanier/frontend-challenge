import { useState, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import type { Campaign, RewardGift } from '../types/campaign';

export const useRewards = () => {
  const { control, watch, setValue } = useFormContext<Campaign>();
  
  // Catégories disponibles
  const availableCategories = [
    { id: 'food', name: 'Alimentation' },
    { id: 'accessory', name: 'Accessoire' },
    { id: 'drink', name: 'Boisson' },
    { id: 'voucher', name: 'Bon de réduction' },
    { id: 'service', name: 'Service' },
    { id: 'other', name: 'Autre' },
  ];

  // Liste des gains (simulée - pourrait être intégrée avec react-hook-form plus tard)
  const [gifts, setGifts] = useState<RewardGift[]>([
    {
      id: '1',
      name: 'Frite',
      category: 'Alimentation',
      stock: 50,
    },
    {
      id: '2',
      name: 'Sac Jacquemus',
      category: 'Accessoire',
      stock: 10,
    },
    {
      id: '3',
      name: 'Café offert',
      category: 'Boisson',
      stock: 100,
    },
    {
      id: '4',
      name: 'Bon 20% réduction',
      category: 'Bon de réduction',
      stock: 25,
    },
  ]);

  const getCategoryColor = useCallback((category: string) => {
    const colors: Record<string, string> = {
      'Alimentation': 'success',
      'Accessoire': 'primary',
      'Boisson': 'info',
      'Bon de réduction': 'warning',
      'Service': 'secondary',
      'Autre': 'default',
    };
    return colors[category] || 'default';
  }, []);

  const getStockColor = useCallback((stock: number) => {
    if (stock === 0) return 'error';
    if (stock < 10) return 'warning';
    return 'success';
  }, []);

  const addGift = useCallback((giftData: Omit<RewardGift, 'id'>) => {
    const newGift: RewardGift = {
      id: Date.now().toString(),
      ...giftData,
    };
    setGifts(prev => [...prev, newGift]);
  }, []);

  const updateGift = useCallback((id: string, giftData: Omit<RewardGift, 'id'>) => {
    setGifts(prev => prev.map(gift => 
      gift.id === id ? { ...gift, ...giftData } : gift
    ));
  }, []);

  const deleteGift = useCallback((id: string) => {
    setGifts(prev => prev.filter(gift => gift.id !== id));
  }, []);

  const validateGift = useCallback((name: string, category: string, stock: string): { isValid: boolean; message?: string } => {
    if (!name.trim()) {
      return { isValid: false, message: 'Le nom du gain est requis' };
    }
    if (!category) {
      return { isValid: false, message: 'La catégorie est requise' };
    }
    if (!stock || parseInt(stock) < 0) {
      return { isValid: false, message: 'Le stock doit être un nombre positif' };
    }
    return { isValid: true };
  }, []);

  return {
    gifts,
    availableCategories,
    getCategoryColor,
    getStockColor,
    addGift,
    updateGift,
    deleteGift,
    validateGift,
    control,
    watch,
    setValue
  };
}; 