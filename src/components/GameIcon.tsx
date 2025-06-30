// src/components/GameIcon.tsx
import { Shield, Sword, ShieldHalf } from 'lucide-react';
import type { FC } from 'react';

// Используем 'any' для максимальной совместимости
const icons: { [key: string]: FC<any> } = {
  shield: Shield,
  sword: Sword,
  'shield-half': ShieldHalf,
};

// Убираем LucideProps и используем 'any'
interface GameIconProps {
  name: string;
  [key: string]: any; // Позволяем передавать любые другие пропсы (size, color, etc.)
}

export const GameIcon = ({ name, ...props }: GameIconProps) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    return <Shield {...props} />;
  }

  return <IconComponent {...props} />;
};