import React from 'react';

interface AlertBadgeProps {
  severity: 'info' | 'warning' | 'error' | 'critical';
  count?: number;
}

const AlertBadge: React.FC<AlertBadgeProps> = ({ severity, count }) => {
  let bgColor = '';
  let textColor = 'text-white';

  switch (severity) {
    case 'info':
      bgColor = 'bg-blue-500';
      break;
    case 'warning':
      bgColor = 'bg-amber-500';
      break;
    case 'error':
    case 'critical':
      bgColor = 'bg-red-600';
      break;
    default:
      bgColor = 'bg-gray-500';
  }

  return (
    <div className="relative inline-block">
      <span
        className={`${bgColor} ${textColor} rounded-full w-3 h-3 absolute -top-1 -right-1 animate-pulse`}
      ></span>
      <span
        className={`${bgColor} ${textColor} text-xs px-2 py-1 rounded-full font-medium inline-flex items-center`}
      >
        {count !== undefined && count > 0 ? count : ''}
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
    </div>
  );
};

export default AlertBadge;