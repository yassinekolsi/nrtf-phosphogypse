import React, { useState, useEffect } from 'react';
import { mockSensors, mockAlerts, mockRecommendations } from '../data/mockData';
import SensorCard from './SensorCard';
import AlertsList from './AlertsList';
import SensorChart from './SensorChart';
import RecommendationCard from './RecommendationCard';
import { Alert, Sensor, TreatmentRecommendation } from '../types';

interface DashboardProps {
  showAlertsPanel: boolean;
  onCloseAlertsPanel: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ showAlertsPanel, onCloseAlertsPanel }) => {
  const [sensors, setSensors] = useState<Sensor[]>(mockSensors);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [recommendations, setRecommendations] = useState<TreatmentRecommendation[]>(mockRecommendations);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);

  useEffect(() => {
    const handleSelectSensor = (event: CustomEvent<string>) => {
      const sensor = sensors.find((s) => s.id === event.detail);
      if (sensor) {
        setSelectedSensor(sensor);
      }
    };

    window.addEventListener('select-sensor', handleSelectSensor as EventListener);
    return () => {
      window.removeEventListener('select-sensor', handleSelectSensor as EventListener);
    };
  }, [sensors]);

  const handleSensorClick = (sensorId: string) => {
    const sensor = sensors.find((s) => s.id === sensorId);
    if (sensor) {
      setSelectedSensor(sensor);
    }
  };

  const handleAlertAcknowledge = (alertId: string) => {
    setAlerts(
      alerts.map((alert) => {
        if (alert.id === alertId) {
          return { ...alert, acknowledged: true };
        }
        return alert;
      })
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
      {/* Main content */}
      <div className={`flex-1 ${showAlertsPanel ? 'md:w-2/3' : 'w-full'}`}>
        {/* Selected sensor detail or summary */}
        {selectedSensor ? (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Sensor Details</h2>
              <button
                className="text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => setSelectedSensor(null)}
              >
                Back to All Sensors
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <SensorCard sensor={selectedSensor} />
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-medium text-gray-800 mb-2">Sensor Information</h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="text-gray-500">Type:</div>
                  <div className="text-gray-800 capitalize">{selectedSensor.type}</div>
                  <div className="text-gray-500">Location:</div>
                  <div className="text-gray-800">{selectedSensor.location}</div>
                  <div className="text-gray-500">Status:</div>
                  <div className="text-gray-800 capitalize">{selectedSensor.status}</div>
                  <div className="text-gray-500">Last Updated:</div>
                  <div className="text-gray-800">
                    {new Date(selectedSensor.lastUpdated).toLocaleString()}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-gray-500 mb-1">Description:</div>
                  <div className="text-gray-800">{selectedSensor.description}</div>
                </div>
                <div className="mt-4">
                  <div className="text-gray-500 mb-1">Role:</div>
                  <div className="text-gray-800">{selectedSensor.role}</div>
                </div>
              </div>
            </div>
            <SensorChart
              sensorId={selectedSensor.id}
              sensorType={selectedSensor.type}
              title={`${selectedSensor.name} - 24 Hour History`}
              height={300}
            />
          </div>
        ) : (
          <>
            {/* Dashboard summary */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">System Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
                  <h3 className="text-sm text-gray-500 mb-1">Online Sensors</h3>
                  <p className="text-2xl font-bold text-gray-800">
                    {sensors.filter((s) => s.status === 'online').length} / {sensors.length}
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
                  <h3 className="text-sm text-gray-500 mb-1">Active Alerts</h3>
                  <p className="text-2xl font-bold text-gray-800">
                    {alerts.filter((a) => !a.acknowledged).length}
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
                  <h3 className="text-sm text-gray-500 mb-1">Treatment Recommendations</h3>
                  <p className="text-2xl font-bold text-gray-800">{recommendations.length}</p>
                </div>
              </div>
            </div>

            {/* Sensors grid */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Sensor Readings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sensors.map((sensor) => (
                  <SensorCard key={sensor.id} sensor={sensor} onClick={handleSensorClick} />
                ))}
              </div>
            </div>

            {/* Charts */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Key Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SensorChart
                  sensorId="s007"
                  sensorType="phosphogypsum"
                  title="Phosphogypsum Concentration - Processing Unit"
                  height={200}
                />
                <SensorChart
                  sensorId="s002"
                  sensorType="radiation"
                  title="Radiation Levels - Storage Area"
                  height={200}
                />
              </div>
            </div>
          </>
        )}

        {/* Treatment recommendations */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Treatment Recommendations</h2>
          <div className="grid grid-cols-1 gap-4">
            {recommendations.map((recommendation) => (
              <RecommendationCard key={recommendation.id} recommendation={recommendation} />
            ))}
          </div>
        </div>
      </div>

      {/* Alerts panel - conditionally shown */}
      {showAlertsPanel && (
        <div className="md:w-1/3 md:border-l md:border-gray-200 md:pl-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">System Alerts</h2>
            <button
              className="md:hidden text-blue-600 hover:text-blue-800"
              onClick={onCloseAlertsPanel}
            >
              Close
            </button>
          </div>
          <AlertsList alerts={alerts} onAcknowledge={handleAlertAcknowledge} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;