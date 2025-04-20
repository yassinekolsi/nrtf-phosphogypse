import React from 'react';
import { Sensor } from '../types';

interface SensorVisualizationProps {
  sensors: Sensor[];
  onSensorClick: (sensorId: string) => void;
}

const sections = [
  {
    id: '1',
    title: 'Low Head Dams',
    image: '/images/Low-Head Dams.png',
    description: 'Reduces flow velocity and helps in the initial sedimentation process by trapping large particles.'
  },
  {
    id: '2',
    title: 'Floating Boom',
    image: '/images/floating boom .png',
    description: 'A floating boom traps the flocs on the water surface, aiding the conveyor system in maximizing its collection efficiency  '
  },
  {
    id: '3',
    title: 'Heavy Material Collection',
    image: '/images/heavy material collection.png',
    description: 'The water in this region contains a significant concentration of heavy materials, especially phosphogypsum, which will be collected using a hydrocyclone.'
  },
  {
    id: '4',
    title: 'Lime',
    image: '/images/lime.png',
    description: 'A lime (CaO) bind fine particles into larger clumps ("flocs"), speeding up settling. It also neutralizes acidic compounds in the phosphogypsum, helping reduce environmental impact.'
  },
  {
    id: '5',
    title: 'Conveyor Belt',
    image: '/images/conveyor belt.png',
    description: 'A conveyor system is installed here to continuously remove flocs floating on the water surface.'
  },
  {
    id: '6',
    title: 'Hydrocyclone',
    image: '/images/hydrocyclone.png',
    description: 'A hydrocyclone separates particles in a liquid suspension using centrifugal force.'
  },
];

const SensorVisualization: React.FC<SensorVisualizationProps> = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Overview</h2>
        <p className="text-gray-600 ">
        This integrated system is engineered to recover phosphogypsum from the liquid waste discharged by the Groupe Chimique Tunisien (GCT). It starts with Low Head Dams, which slow down water flow and promote the sedimentation of large particles. A Floating Boom captures flocs forming on the water surface, allowing the Conveyor Belt to efficiently extract them. In parallel, a Heavy Material Collection zone targets high-density waste—particularly phosphogypsum—which is separated using a Hydrocyclone. To enhance floc formation and neutralize acidity in the waste, Lime (CaO) is added, binding fine particles and mitigating environmental harm. This system provides a cost-effective, environmentally conscious solution for treating and valorizing industrial discharge from GCT.
        </p>
      </div>

      <div className="mb-12">
        <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] bg-gray-200 rounded-lg shadow-inner flex items-center justify-center overflow-hidden">
          <img
            src="/images/jaabouk.png"
            alt="Sensor platform overview"
            className="object-contain h-full w-full rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((section) => (
          <div key={section.id} className="group">
            <h3 className="text-xl font-semibold text-gray-700 mb-3 text-center">{section.title}</h3>
            <div className="w-full h-72 bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105 hover:shadow-xl cursor-pointer">
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-full object-contain p-4 transition duration-300"
              />
            </div>
            <p className="mt-4 text-gray-600 text-sm text-center px-2">{section.description}</p>
          </div>
        ))}
        <div style={{ paddingBottom: '70px' }} className="container mx-auto px-16 py-6">
  {/* Your existing content */}
</div>
      </div>
    </div>
  );
};

export default SensorVisualization;
