import React from 'react';
import { Bell, CheckCircle } from 'lucide-react';
import { Alert } from '../types';
import Card from './ui/Card';
import AlertBadge from './ui/AlertBadge';

interface AlertsListProps {
  alerts: Alert[];
  onAcknowledge?: (alertId: string) => void;
}

const AlertsList: React.FC<AlertsListProps> = ({ alerts, onAcknowledge }) => {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleAcknowledge = (alertId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAcknowledge) {
      onAcknowledge(alertId);
    }
  };

  if (alerts.length === 0) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center py-6 text-gray-500">
          <Bell className="h-12 w-12 mb-2 text-gray-400" />
          <p>No alerts at this time</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="max-h-[600px] overflow-auto">
      <div className="divide-y divide-gray-200">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`py-3 ${
              !alert.acknowledged ? 'bg-gray-50' : ''
            } transition-colors duration-200`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3">
                <AlertBadge severity={alert.severity} />
                <div>
                  <h4 className="font-medium text-gray-800">{alert.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{formatTime(alert.timestamp)}</p>
                </div>
              </div>
              {!alert.acknowledged && (
                <button
                  onClick={(e) => handleAcknowledge(alert.id, e)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <CheckCircle className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AlertsList;