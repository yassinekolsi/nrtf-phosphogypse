import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SensorVisualization from './components/SensorVisualization';
import { mockAlerts, mockSensors } from './data/mockData';

function App() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [showAlertsPanel, setShowAlertsPanel] = useState(false);
  const [show3D, setShow3D] = useState(false);

  const handleViewAlerts = () => {
    setShowAlertsPanel(true);
  };

  const handleCloseAlertsPanel = () => {
    setShowAlertsPanel(false);
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
          <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">3D Sensor Visualization</h2>
              <p className="text-gray-600 mb-4">
                Interactive 3D view of all sensors. Click on any sensor to view details. 
                Drag to rotate, scroll to zoom.
              </p>
              <SensorVisualization 
                sensors={mockSensors}
                onSensorClick={(sensorId) => {
                  setShow3D(false);
                  // Allow time for transition before showing sensor details
                  setTimeout(() => {
                    const event = new CustomEvent('select-sensor', { detail: sensorId });
                    window.dispatchEvent(event);
                  }, 100);
                }}
              />
            </div>
          </div>
        ) : (
          <Dashboard 
            showAlertsPanel={showAlertsPanel} 
            onCloseAlertsPanel={handleCloseAlertsPanel} 
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