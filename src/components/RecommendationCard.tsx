import React from 'react';
import { ArrowUpCircle, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import { TreatmentRecommendation } from '../types';
import Card from './ui/Card';

interface RecommendationCardProps {
  recommendation: TreatmentRecommendation;
  onClick?: (recommendationId: string) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, onClick }) => {
  const getPriorityIcon = () => {
    switch (recommendation.priority) {
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'medium':
        return <AlertCircle className="h-5 w-5 text-amber-600" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'critical':
        return <ArrowUpCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getPriorityClass = () => {
    switch (recommendation.priority) {
      case 'low':
        return 'border-l-green-600';
      case 'medium':
        return 'border-l-amber-600';
      case 'high':
        return 'border-l-orange-600';
      case 'critical':
        return 'border-l-red-600';
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleClick = () => {
    if (onClick) {
      onClick(recommendation.id);
    }
  };

  return (
    <Card
      className={`border-l-4 ${getPriorityClass()} transition-all duration-200 hover:shadow-lg cursor-pointer`}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{getPriorityIcon()}</div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-800">{recommendation.title}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{recommendation.description}</p>
          <div className="flex justify-between mt-2">
            <div className="text-xs text-blue-600">
              {recommendation.relatedSensors.length} sensor
              {recommendation.relatedSensors.length !== 1 ? 's' : ''}
            </div>
            <div className="text-xs text-gray-500">{formatTime(recommendation.timestamp)}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecommendationCard;