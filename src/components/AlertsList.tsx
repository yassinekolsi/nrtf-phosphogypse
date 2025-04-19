import React, { useState } from 'react';
import { Bell, CheckCircle, ExternalLink } from 'lucide-react';
import { Alert, TreatmentRecommendation } from '../types';
import Card from './ui/Card';
import AlertBadge from './ui/AlertBadge';

interface AlertsListProps {
  alerts: Alert[];
  recommendations: TreatmentRecommendation[];
  onAcknowledge?: (alertId: string) => void;
  onViewRecommendation?: (recommendation: TreatmentRecommendation) => void;
}

const AlertsList: React.FC<AlertsListProps> = ({ 
  alerts, 
  recommendations,
  onAcknowledge,
  onViewRecommendation 
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');

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

  const getRecommendation = (alertId: string) => {
    return recommendations.find(rec => rec.alertId === alertId);
  };

  const filteredAlerts = alerts.filter(alert => {
    switch (selectedFilter) {
      case 'critical':
        return alert.severity === 'critical';
      case 'warning':
        return alert.severity === 'warning';
      case 'info':
        return alert.severity === 'info';
      default:
        return true;
    }
  });

  const FilterButton = ({ filter, label }: { filter: typeof selectedFilter, label: string }) => (
    <button 
      onClick={() => setSelectedFilter(filter)}
      className={`px-3 py-1 rounded-full transition-colors ${
        selectedFilter === filter 
          ? 'bg-blue-600 text-white' 
          : 'text-gray-600 hover:bg-gray-100'
      } text-sm`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="bg-white rounded-t-lg shadow-sm p-2 flex items-center justify-between sticky top-0 z-10">
        <div className="flex space-x-2">
          <FilterButton filter="all" label="All" />
          <FilterButton filter="critical" label="Critical" />
          <FilterButton filter="warning" label="Warning" />
          <FilterButton filter="info" label="Info" />
        </div>
        <div className="text-sm text-gray-500">
          {filteredAlerts.length} alert{filteredAlerts.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto rounded-b-lg bg-white shadow-md">
        {filteredAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-gray-500">
            <Bell className="h-12 w-12 mb-2 text-gray-400" />
            <p>No alerts at this time</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredAlerts.map((alert) => {
              const recommendation = getRecommendation(alert.id);
              
              return (
                <div
                  key={alert.id}
                  className={`p-4 ${
                    !alert.acknowledged ? 'bg-gray-50' : ''
                  } transition-colors duration-200 hover:bg-gray-50`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3">
                      <AlertBadge severity={alert.severity} />
                      <div>
                        <h4 className="font-medium text-gray-800">{alert.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{formatTime(alert.timestamp)}</p>
                        {recommendation && (
                          <button
                            onClick={() => onViewRecommendation?.(recommendation)}
                            className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View Recommendation
                          </button>
                        )}
                      </div>
                    </div>
                    {!alert.acknowledged && (
                      <button
                        onClick={(e) => handleAcknowledge(alert.id, e)}
                        className="text-blue-600 hover:text-blue-800 transition-colors p-2 hover:bg-blue-50 rounded-full"
                        title="Mark as read"
                      >
                        <CheckCircle className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsList;