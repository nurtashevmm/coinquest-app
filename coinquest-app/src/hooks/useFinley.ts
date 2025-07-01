import { useState, useEffect } from 'react';

interface FinleyState {
  selectedFinley: string;
  customization: {
    color: string;
    accessory: string;
  };
}

export const useFinley = () => {
  const [finleyState, setFinleyState] = useState<FinleyState>({
    selectedFinley: 'classic',
    customization: {
      color: 'blue',
      accessory: 'none'
    }
  });

  const updateFinley = (updates: Partial<FinleyState>) => {
    setFinleyState(prev => ({ ...prev, ...updates }));
  };

  const updateCustomization = (customization: Partial<FinleyState['customization']>) => {
    setFinleyState(prev => ({
      ...prev,
      customization: { ...prev.customization, ...customization }
    }));
  };

  return {
    finleyState,
    updateFinley,
    updateCustomization
  };
};
