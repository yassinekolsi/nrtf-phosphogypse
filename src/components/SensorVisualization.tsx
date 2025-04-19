import React from 'react';
import { Sensor } from '../types';

interface SensorVisualizationProps {
  sensors: Sensor[];
  onSensorClick: (sensorId: string) => void;
}

const SensorVisualization: React.FC<SensorVisualizationProps> = () => {
  return (
    

    <div className="container mx-auto px-4 py-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Product Overview</h2>
                  <p className="text-gray-600 mb-4">
                    Interactive view of all sensors along the process pipeline. Click on any sensor to view details.
                  </p>
                  <div className="w-full h-[600px] bg-gray-100 rounded-lg shadow-inner flex items-center justify-center">
                    <img 
                      src="../jaabouk.png"
                      alt="Sensor platform"
                      className="max-h-full max-w-full object-contain rounded"
                    />
                  </div>
                </div>
              </div>
  );
};

export default SensorVisualization;
