export interface SensorReading {
  id: string;
  timestamp: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  mean?: number;
  change?: number;
}

export interface Sensor {
  id: string;
  name: string;
  type: 'ph' | 'radiation' | 'temperature' | 'humidity' | 'pressure' | 'phosphogypsum' | 'vibration' | 'rpm';
  location: string;
  currentReading: SensorReading;
  status: 'online' | 'offline' | 'maintenance';
  lastUpdated: string;
  description: string;
  role: string;
}

export interface TreatmentRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  relatedSensors: string[];
  alertId?: string;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  timestamp: string;
  sensorId: string;
  acknowledged: boolean;
  recommendationId?: string;
}

export interface AppSettings {
  darkMode: boolean;
  notificationsEnabled: boolean;
  autoRefreshInterval: number;
  dataRetentionDays: number;
  soundAlerts: boolean;
}