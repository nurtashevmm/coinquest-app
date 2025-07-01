import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface CategoryFormProps {
  onSubmit: (category: any) => void;
  onCancel: () => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  onSubmit,
  onCancel
}) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#3B82F6');
  const [icon, setIcon] = useState('📁');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      color,
      icon,
      id: Date.now().toString()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Название категории"
        value={name}
        onChange={setName}
        placeholder="Название"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Цвет
        </label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-10 rounded border"
        />
      </div>

      <Input
        label="Иконка (эмодзи)"
        value={icon}
        onChange={setIcon}
        placeholder="📁"
      />

      <div className="flex gap-2 pt-4">
        <Button type="submit" variant="primary">
          Создать
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </form>
  );
};
