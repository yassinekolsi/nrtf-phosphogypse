import React, { useEffect, useState } from 'react';
import { SensorReading } from '../types';
import Card from './ui/Card';
import { generateHistoricalData } from '../data/mockData';

interface SensorChartProps {
  sensorId: string;
  sensorType: 'ph' | 'radiation' | 'temperature' | 'humidity' | 'pressure';
  title: string;
  height?: number;
}

const SensorChart: React.FC<SensorChartProps> = ({
  sensorId,
  sensorType,
  title,
  height = 200,
}) => {
  const [historicalData, setHistoricalData] = useState<SensorReading[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const data = generateHistoricalData(sensorId, sensorType);
    setHistoricalData(data);
  }, [sensorId, sensorType]);

  if (historicalData.length === 0) {
    return <div>Loading chart data...</div>;
  }

  // Find min and max values for scaling
  const values = historicalData.map((reading) => reading.value);
  const minValue = Math.min(...values) * 0.9; // Add some padding
  const maxValue = Math.max(...values) * 1.1;
  const range = maxValue - minValue;

  // Helper to calculate the y position
  const getYPosition = (value: number): number => {
    return height - ((value - minValue) / range) * height;
  };

  // Generate path for the chart line
  const generatePath = () => {
    const width = 100 / (historicalData.length - 1);
    
    return historicalData.map((reading, index) => {
      const x = index * width;
      const y = getYPosition(reading.value);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  // Get colors based on the most recent status
  const getLineColor = () => {
    const recentStatus = historicalData[historicalData.length - 1].status;
    switch (recentStatus) {
      case 'normal':
        return '#10B981'; // green-500
      case 'warning':
        return '#F59E0B'; // amber-500
      case 'critical':
        return '#EF4444'; // red-500
      default:
        return '#3B82F6'; // blue-500
    }
  };

  // Format time for labels
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card title={title}>
      <div className="relative" style={{ height: `${height}px` }}>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500">
          <span>{maxValue.toFixed(1)}</span>
          <span>{((maxValue + minValue) / 2).toFixed(1)}</span>
          <span>{minValue.toFixed(1)}</span>
        </div>

        {/* Chart SVG */}
        <div className="absolute left-8 right-0 top-0 bottom-0">
          <svg width="100%" height="100%" viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="0" x2="100" y2="0" stroke="#E5E7EB" strokeWidth="0.5" />
            <line
              x1="0"
              y1={height / 2}
              x2="100"
              y2={height / 2}
              stroke="#E5E7EB"
              strokeWidth="0.5"
            />
            <line
              x1="0"
              y1={height}
              x2="100"
              y2={height}
              stroke="#E5E7EB"
              strokeWidth="0.5"
            />

            {/* Data line */}
            <path
              d={generatePath()}
              fill="none"
              stroke={getLineColor()}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points with tooltips */}
            {historicalData.map((reading, index) => {
              const width = 100 / (historicalData.length - 1);
              const x = index * width;
              const y = getYPosition(reading.value);
              
              // Get color based on status
              let pointColor;
              switch (reading.status) {
                case 'normal':
                  pointColor = '#10B981'; // green-500
                  break;
                case 'warning':
                  pointColor = '#F59E0B'; // amber-500
                  break;
                case 'critical':
                  pointColor = '#EF4444'; // red-500
                  break;
                default:
                  pointColor = '#3B82F6'; // blue-500
              }
              
              return (
                <circle
                  key={reading.id}
                  cx={x}
                  cy={y}
                  r="1.5"
                  fill={pointColor}
                  className="hover:r-3 transition-all duration-200"
                  data-reading={`${reading.value} ${reading.unit} at ${formatTime(reading.timestamp)}`}
                />
              );
            })}
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="absolute left-8 right-0 bottom-0 transform translate-y-6 flex justify-between text-xs text-gray-500">
          <span>{formatTime(historicalData[0].timestamp)}</span>
          <span>{formatTime(historicalData[Math.floor(historicalData.length / 2)].timestamp)}</span>
          <span>{formatTime(historicalData[historicalData.length - 1].timestamp)}</span>
        </div>
      </div>
    </Card>
  );
};

export default SensorChart;