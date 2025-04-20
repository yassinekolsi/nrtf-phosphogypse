import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SensorVisualization from './components/SensorVisualization';
import { mockAlerts, mockSensors, mockRecommendations } from './data/mockData';
import { Alert } from './types';

function App() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [showAlertsPanel, setShowAlertsPanel] = useState(false);
  const [show3D, setShow3D] = useState(false);

  const handleViewAlerts = () => {
    setShowAlertsPanel(!showAlertsPanel);
  };

  const handleCloseAlertsPanel = () => {
    setShowAlertsPanel(false);
  };

  const handleAlertAcknowledge = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header 
        alerts={alerts} 
        onViewAlerts={handleViewAlerts}
        onToggle3D={() => setShow3D(!show3D)}
        is3DActive={show3D}
      />
      <main className="flex-1">
        {show3D ? (
          
          <SensorVisualization 
            showAlertsPanel={showAlertsPanel} 
            onCloseAlertsPanel={handleCloseAlertsPanel}
            onAlertAcknowledge={handleAlertAcknowledge}
            alerts={alerts}
                sensors={mockSensors}
                onSensorClick={(sensorId) => {
                  setShow3D(false);
                  setTimeout(() => {
                    const event = new CustomEvent('select-sensor', { detail: sensorId });
                    window.dispatchEvent(event);
                  }, 100);
                }}
              />
        ) : (
          <Dashboard 
            showAlertsPanel={showAlertsPanel} 
            onCloseAlertsPanel={handleCloseAlertsPanel}
            onAlertAcknowledge={handleAlertAcknowledge}
            alerts={alerts}
            recommendations={mockRecommendations}
          />
        )}
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center text-sm">
        <div className="container mx-auto">
          PhosphoSense Monitoring System &copy; {new Date().getFullYear()} | Version 1.0.0
        </div>
      </footer>
    </div>
  );
}

export default App;