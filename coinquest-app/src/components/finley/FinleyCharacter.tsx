import React from 'react';

interface FinleyCharacterProps {
  emotion?: 'happy' | 'neutral' | 'excited' | 'thinking';
  size?: 'small' | 'medium' | 'large';
}

export const FinleyCharacter: React.FC<FinleyCharacterProps> = ({
  emotion = 'neutral',
  size = 'medium'
}) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-32 h-32',
    large: 'w-48 h-48'
  };

  return (
    <div className={`${sizeClasses[size]} bg-blue-100 rounded-full flex items-center justify-center`}>
      <div className="text-4xl">🦊</div>
    </div>
  );
};
