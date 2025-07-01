import React from 'react';
import { FinleyCharacter } from './FinleyCharacter';

interface FinleySelectorProps {
  selectedFinley: string;
  onSelect: (finleyId: string) => void;
}

export const FinleySelector: React.FC<FinleySelectorProps> = ({
  selectedFinley,
  onSelect
}) => {
  const finleyOptions = [
    { id: 'classic', name: 'Классический Финли' },
    { id: 'cool', name: 'Крутой Финли' },
    { id: 'cute', name: 'Милый Финли' }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {finleyOptions.map((option) => (
        <div
          key={option.id}
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
            selectedFinley === option.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => onSelect(option.id)}
        >
          <FinleyCharacter size="small" />
          <p className="text-sm mt-2 text-center">{option.name}</p>
        </div>
      ))}
    </div>
  );
};
