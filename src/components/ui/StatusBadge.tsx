import React from 'react';

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'maintenance' | 'normal' | 'warning' | 'critical';
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  let bgColor = '';
  let textColor = 'text-white';
  let label = status.charAt(0).toUpperCase() + status.slice(1);

  switch (status) {
    case 'online':
    case 'normal':
      bgColor = 'bg-green-500';
      break;
    case 'offline':
    case 'critical':
      bgColor = 'bg-red-600';
      break;
    case 'maintenance':
      bgColor = 'bg-blue-500';
      break;
    case 'warning':
      bgColor = 'bg-amber-500';
      break;
    default:
      bgColor = 'bg-gray-500';
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  return (
    <span
      className={`${bgColor} ${textColor} ${sizeClasses[size]} rounded-full font-medium inline-flex items-center`}
    >
      <span className={`h-1.5 w-1.5 rounded-full bg-white mr-1.5 animate-pulse`}></span>
      {label}
    </span>
  );
};

export default StatusBadge;