import { Alert, Sensor, SensorReading, TreatmentRecommendation } from '../types';

const generateReading = (
  id: string,
  type: 'ph' | 'radiation' | 'temperature' | 'humidity' | 'pressure' | 'phosphogypsum' | 'vibration' | 'rpm'
): SensorReading => {
  const now = new Date();
  let value = 0;
  let unit = '';
  let status: 'normal' | 'warning' | 'critical' = 'normal';
  let mean = 0;
  let change = 0;

  switch (type) {
    case 'ph':
      value = 5 + Math.random() * 4;
      unit = 'pH';
      mean = 7;
      change = ((value - mean) / mean) * 100;
      status = value < 6 || value > 8 ? 'warning' : 'normal';
      status = value < 5.5 || value > 8.5 ? 'critical' : status;
      break;
    case 'radiation':
      value = Math.random() * 150;
      unit = 'μSv/h';
      mean = 75;
      change = ((value - mean) / mean) * 100;
      status = value > 80 ? 'warning' : 'normal';
      status = value > 120 ? 'critical' : status;
      break;
    case 'temperature':
      value = 15 + Math.random() * 30;
      unit = '°C';
      mean = 25;
      change = ((value - mean) / mean) * 100;
      status = value > 35 ? 'warning' : 'normal';
      status = value > 40 ? 'critical' : status;
      break;
    case 'humidity':
      value = 30 + Math.random() * 50;
      unit = '%';
      mean = 50;
      change = ((value - mean) / mean) * 100;
      status = value > 70 ? 'warning' : 'normal';
      status = value > 75 ? 'critical' : status;
      break;
    case 'pressure':
      value = 980 + Math.random() * 60;
      unit = 'hPa';
      mean = 1013;
      change = ((value - mean) / mean) * 100;
      status = value < 1000 ? 'warning' : 'normal';
      status = value < 990 ? 'critical' : status;
      break;
    case 'phosphogypsum':
      value = Math.random() * 1000;
      unit = 'mg/m³';
      mean = 500;
      change = ((value - mean) / mean) * 100;
      status = value > 500 ? 'warning' : 'normal';
      status = value > 750 ? 'critical' : status;
      break;
    case 'vibration':
      value = Math.random() * 100;
      unit = 'Hz';
      mean = 50;
      change = ((value - mean) / mean) * 100;
      status = value > 70 ? 'warning' : 'normal';
      status = value > 85 ? 'critical' : status;
      break;
    case 'rpm':
      value = 1000 + Math.random() * 2000;
      unit = 'RPM';
      mean = 2000;
      change = ((value - mean) / mean) * 100;
      status = value > 2500 ? 'warning' : 'normal';
      status = value > 2800 ? 'critical' : status;
      break;
  }

  return {
    id,
    timestamp: now.toISOString(),
    value: parseFloat(value.toFixed(2)),
    unit,
    status,
    mean: parseFloat(mean.toFixed(2)),
    change: parseFloat(change.toFixed(2))
  };
};

export const mockSensors: Sensor[] = [
  {
    id: 's001',
    name: 'Main Stack pH',
    type: 'ph',
    location: 'Stack A - Primary',
    status: 'online',
    lastUpdated: new Date().toISOString(),
    currentReading: generateReading('r001', 'ph'),
    description: 'Monitors acidity levels in the main processing stack',
    role: 'Controls neutralization process and ensures safe chemical balance'
  },
  {
    id: 's002',
    name: 'Radiation Monitor 1',
    type: 'radiation',
    location: 'Storage Area - North',
    status: 'online',
    lastUpdated: new Date().toISOString(),
    currentReading: generateReading('r002', 'radiation'),
    description: 'Measures radiation levels in storage area',
    role: 'Ensures radiation safety and compliance with regulatory limits'
  },
  {
    id: 's003',
    name: 'Process Temperature',
    type: 'temperature',
    location: 'Treatment Plant - Unit 3',
    status: 'online',
    lastUpdated: new Date().toISOString(),
    currentReading: generateReading('r003', 'temperature'),
    description: 'Monitors process temperature in treatment unit',
    role: 'Maintains optimal reaction conditions and prevents overheating'
  },
  {
    id: 's004',
    name: 'Ambient Humidity',
    type: 'humidity',
    location: 'Stack B - Secondary',
    status: 'offline',
    lastUpdated: new Date(Date.now() - 3600000).toISOString(),
    currentReading: generateReading('r004', 'humidity'),
    description: 'Measures ambient humidity levels',
    role: 'Prevents moisture-related issues and ensures proper drying'
  },
  {
    id: 's005',
    name: 'System Pressure',
    type: 'pressure',
    location: 'Filtration System',
    status: 'maintenance',
    lastUpdated: new Date().toISOString(),
    currentReading: generateReading('r005', 'pressure'),
    description: 'Monitors filtration system pressure',
    role: 'Maintains optimal filtration efficiency and prevents system damage'
  },
  {
    id: 's006',
    name: 'Effluent pH',
    type: 'ph',
    location: 'Discharge Point',
    status: 'online',
    lastUpdated: new Date().toISOString(),
    currentReading: generateReading('r006', 'ph'),
    description: 'Monitors pH levels at discharge point',
    role: 'Ensures environmental compliance of discharged water'
  },
  {
    id: 's007',
    name: 'Phosphogypsum Monitor',
    type: 'phosphogypsum',
    location: 'Processing Unit - Main',
    status: 'online',
    lastUpdated: new Date().toISOString(),
    currentReading: generateReading('r007', 'phosphogypsum'),
    description: 'Measures phosphogypsum concentration',
    role: 'Monitors waste product levels and ensures proper processing'
  },
  {
    id: 's008',
    name: 'Pump Vibration',
    type: 'vibration',
    location: 'Main Pump Station',
    status: 'online',
    lastUpdated: new Date().toISOString(),
    currentReading: generateReading('r008', 'vibration'),
    description: 'Monitors pump vibration levels',
    role: 'Detects potential mechanical issues and prevents equipment failure'
  },
  {
    id: 's009',
    name: 'Motor RPM',
    type: 'rpm',
    location: 'Primary Drive Motor',
    status: 'online',
    lastUpdated: new Date().toISOString(),
    currentReading: generateReading('r009', 'rpm'),
    description: 'Measures motor rotation speed',
    role: 'Ensures optimal motor performance and identifies irregularities'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'a001',
    title: 'High pH Level Detected',
    message: 'pH level at Stack A has exceeded the warning threshold of 8.0',
    severity: 'warning',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    sensorId: 's001',
    acknowledged: false,
    recommendationId: 'tr001'
  },
  {
    id: 'a002',
    title: 'Radiation Level Critical',
    message: 'Radiation level at Storage Area - North has reached critical levels',
    severity: 'critical',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    sensorId: 's002',
    acknowledged: true,
    recommendationId: 'tr002'
  },
  {
    id: 'a003',
    title: 'Sensor Offline',
    message: 'Humidity sensor at Stack B is offline',
    severity: 'info',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    sensorId: 's004',
    acknowledged: false,
    recommendationId: 'tr004'
  },
  {
    id: 'a004',
    title: 'Temperature Rising',
    message: 'Process temperature is showing an upward trend at Unit 3',
    severity: 'warning',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    sensorId: 's003',
    acknowledged: false,
    recommendationId: 'tr003'
  },
  {
    id: 'a005',
    title: 'High Phosphogypsum Concentration',
    message: 'Phosphogypsum levels exceeding normal operating range',
    severity: 'warning',
    timestamp: new Date().toISOString(),
    sensorId: 's007',
    acknowledged: false,
    recommendationId: 'tr005'
  },
  {
    id: 'a006',
    title: 'Abnormal Vibration Detected',
    message: 'Pump vibration levels have exceeded normal operating range',
    severity: 'warning',
    timestamp: new Date().toISOString(),
    sensorId: 's008',
    acknowledged: false,
    recommendationId: 'tr006'
  },
  {
    id: 'a007',
    title: 'Motor Speed Fluctuation',
    message: 'Unusual variations in motor RPM detected',
    severity: 'warning',
    timestamp: new Date().toISOString(),
    sensorId: 's009',
    acknowledged: false,
    recommendationId: 'tr007'
  }
];

export const mockRecommendations: TreatmentRecommendation[] = [
  {
    id: 'tr001',
    title: 'Adjust pH Neutralization System',
    description:
      'Current pH readings indicate the need to increase lime dosage in the neutralization process by 15% to bring levels within optimal range.',
    priority: 'high',
    timestamp: new Date().toISOString(),
    relatedSensors: ['s001', 's006'],
    alertId: 'a001'
  },
  {
    id: 'tr002',
    title: 'Investigate Radiation Source',
    description:
      'Elevated radiation levels require immediate investigation. Initial assessment suggests checking for leakage in the northern storage containment area.',
    priority: 'critical',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    relatedSensors: ['s002'],
    alertId: 'a002'
  },
  {
    id: 'tr003',
    title: 'Optimize Cooling System',
    description:
      'Temperature trends suggest the need for cooling system optimization. Consider increasing coolant flow by 10% and check for fouling in heat exchangers.',
    priority: 'medium',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    relatedSensors: ['s003'],
    alertId: 'a004'
  },
  {
    id: 'tr004',
    title: 'Schedule Humidity Sensor Maintenance',
    description:
      'The humidity sensor appears to be offline. Schedule a maintenance check for potential calibration issues or physical damage.',
    priority: 'low',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    relatedSensors: ['s004'],
    alertId: 'a003'
  },
  {
    id: 'tr005',
    title: 'Adjust Phosphogypsum Processing Rate',
    description:
      'High phosphogypsum concentration detected. Consider reducing processing rate by 20% and verify filtration system efficiency.',
    priority: 'high',
    timestamp: new Date().toISOString(),
    relatedSensors: ['s007', 's005'],
    alertId: 'a005'
  },
  {
    id: 'tr006',
    title: 'Inspect Pump Assembly',
    description:
      'High vibration levels indicate potential mechanical issues. Schedule immediate inspection of pump bearings and alignment.',
    priority: 'high',
    timestamp: new Date().toISOString(),
    relatedSensors: ['s008'],
    alertId: 'a006'
  },
  {
    id: 'tr007',
    title: 'Motor Drive Maintenance',
    description:
      'RPM fluctuations suggest potential drive system issues. Check motor controller settings and mechanical connections.',
    priority: 'medium',
    timestamp: new Date().toISOString(),
    relatedSensors: ['s009'],
    alertId: 'a007'
  }
];

export const generateHistoricalData = (
  sensorId: string,
  type: 'ph' | 'radiation' | 'temperature' | 'humidity' | 'pressure' | 'phosphogypsum' | 'vibration' | 'rpm',
  hours = 24
) => {
  const data: SensorReading[] = [];
  const now = new Date();

  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 3600000);
    const reading = generateReading(`${sensorId}-hist-${i}`, type);
    reading.timestamp = timestamp.toISOString();
    
    if (i > 0) {
      const previousValue = i === hours ? reading.value : data[hours - i - 1].value;
      const maxChange = previousValue * 0.05;
      const change = (Math.random() * maxChange * 2) - maxChange;
      reading.value = parseFloat((previousValue + change).toFixed(2));
      
      switch (type) {
        case 'ph':
          reading.status = reading.value < 6 || reading.value > 8 ? 'warning' : 'normal';
          reading.status = reading.value < 5.5 || reading.value > 8.5 ? 'critical' : reading.status;
          break;
        case 'radiation':
          reading.status = reading.value > 80 ? 'warning' : 'normal';
          reading.status = reading.value > 120 ? 'critical' : reading.status;
          break;
        case 'temperature':
          reading.status = reading.value > 35 ? 'warning' : 'normal';
          reading.status = reading.value > 40 ? 'critical' : reading.status;
          break;
        case 'humidity':
          reading.status = reading.value > 70 ? 'warning' : 'normal';
          reading.status = reading.value > 75 ? 'critical' : reading.status;
          break;
        case 'pressure':
          reading.status = reading.value < 1000 ? 'warning' : 'normal';
          reading.status = reading.value < 990 ? 'critical' : reading.status;
          break;
        case 'phosphogypsum':
          reading.status = reading.value > 500 ? 'warning' : 'normal';
          reading.status = reading.value > 750 ? 'critical' : reading.status;
          break;
        case 'vibration':
          reading.status = reading.value > 70 ? 'warning' : 'normal';
          reading.status = reading.value > 85 ? 'critical' : reading.status;
          break;
        case 'rpm':
          reading.status = reading.value > 2500 ? 'warning' : 'normal';
          reading.status = reading.value > 2800 ? 'critical' : reading.status;
          break;
      }
    }
    
    data.push(reading);
  }

  return data;
};