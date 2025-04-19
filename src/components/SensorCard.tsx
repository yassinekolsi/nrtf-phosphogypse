import React from 'react';
import { Activity, Droplets, Thermometer, Waves, Gauge, FlaskRound as Flask, Vibrate, RotateCw } from 'lucide-react';
import { Sensor } from '../types';
import Card from './ui/Card';
import StatusBadge from './ui/StatusBadge';
import SensorValue from './ui/SensorValue';

interface SensorCardProps {
  sensor: Sensor;
  onClick?: (sensorId: string) => void;
}

const SensorCard: React.FC<SensorCardProps> = ({ sensor, onClick }) => {
  const getIcon = () => {
    switch (sensor.type) {
      case 'ph':
        return <Droplets className="h-5 w-5 text-teal-600" />;
      case 'radiation':
        return <Activity className="h-5 w-5 text-red-600" />;
      case 'temperature':
        return <Thermometer className="h-5 w-5 text-orange-600" />;
      case 'humidity':
        return <Waves className="h-5 w-5 text-blue-600" />;
      case 'pressure':
        return <Gauge className="h-5 w-5 text-purple-600" />;
      case 'phosphogypsum':
        return <Flask className="h-5 w-5 text-indigo-600" />;
      case 'vibration':
        return <Vibrate className="h-5 w-5 text-pink-600" />;
      case 'rpm':
        return <RotateCw className="h-5 w-5 text-cyan-600" />;
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  const handleClick = () => {
    if (onClick) {
      onClick(sensor.id);
    }
  };

  const getChangeColor = (change: number) => {
    if (change > 10) return 'text-red-600';
    if (change < -10) return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <Card
      className="transition-all duration-200 hover:shadow-lg cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <span className="mr-2">{getIcon()}</span>
          <h3 className="font-medium text-gray-800">{sensor.name}</h3>
        </div>
        <StatusBadge status={sensor.status} />
      </div>

      <div className="mt-4">
        <SensorValue
          value={sensor.currentReading.value}
          unit={sensor.currentReading.unit}
          status={sensor.currentReading.status}
          size="lg"
        />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-500">Mean:</span>
          <span className="ml-2 font-medium">{sensor.currentReading.mean}</span>
        </div>
        <div>
          <span className="text-gray-500">Change:</span>
          <span className={`ml-2 font-medium ${getChangeColor(sensor.currentReading.change || 0)}`}>
            {sensor.currentReading.change?.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-600">
        <p className="line-clamp-2">{sensor.role}</p>
      </div>

      <div className="flex justify-between mt-4 text-xs text-gray-500">
        <div>{sensor.location}</div>
        <div>Updated: {formatTime(sensor.lastUpdated)}</div>
      </div>
    </Card>
  );
};

export default SensorCard;