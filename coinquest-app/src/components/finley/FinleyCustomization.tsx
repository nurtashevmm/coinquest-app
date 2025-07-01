import React, { useState } from 'react';
import { FinleyCharacter } from './FinleyCharacter';
import { Button } from '../ui/Button';

export const FinleyCustomization: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedAccessory, setSelectedAccessory] = useState('none');

  const colors = ['blue', 'green', 'purple', 'orange'];
  const accessories = ['none', 'hat', 'glasses', 'bow'];

  return (
    <div className="flex gap-8">
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-4">Персонализация Финли</h3>
        
        <div className="mb-6">
          <h4 className="font-medium mb-2">Цвет:</h4>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color ? 'border-gray-800' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-2">Аксессуары:</h4>
          <div className="flex gap-2">
            {accessories.map((accessory) => (
              <button
                key={accessory}
                className={`px-3 py-1 rounded ${
                  selectedAccessory === accessory
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setSelectedAccessory(accessory)}
              >
                {accessory === 'none' ? 'Без аксессуаров' : accessory}
              </button>
            ))}
          </div>
        </div>

        <Button variant="primary">Сохранить изменения</Button>
      </div>

      <div className="flex-shrink-0">
        <div className="text-center">
          <h4 className="font-medium mb-4">Предпросмотр:</h4>
          <FinleyCharacter size="large" />
        </div>
      </div>
    </div>
  );
};
