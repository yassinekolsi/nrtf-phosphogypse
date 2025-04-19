import React from 'react';

interface SensorValueProps {
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  size?: 'sm' | 'md' | 'lg';
}

const SensorValue: React.FC<SensorValueProps> = ({ value, unit, status, size = 'md' }) => {
  let textColor = '';

  switch (status) {
    case 'normal':
      textColor = 'text-green-600';
      break;
    case 'warning':
      textColor = 'text-amber-600';
      break;
    case 'critical':
      textColor = 'text-red-600';
      break;
    default:
      textColor = 'text-gray-800';
  }

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div className="flex items-end">
      <span className={`${sizeClasses[size]} ${textColor} font-bold transition-colors duration-300`}>
        {value}
      </span>
      <span className={`${size === 'lg' ? 'text-xl' : 'text-sm'} text-gray-500 ml-1`}>{unit}</span>
    </div>
  );
};

export default SensorValue;