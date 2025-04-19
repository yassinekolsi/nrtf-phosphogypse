import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import { Sensor } from '../types';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three-stdlib';


interface SensorVisualizationProps {
  sensors: Sensor[];
  onSensorClick: (sensorId: string) => void;
}

function SensorNode({ sensor, position, onClick }: { 
  sensor: Sensor; 
  position: [number, number, number];
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  const getColor = () => {
    if (sensor.status === 'offline') return '#EF4444';
    if (sensor.status === 'maintenance') return '#3B82F6';
    return sensor.currentReading.status === 'normal' 
      ? '#10B981' 
      : sensor.currentReading.status === 'warning'
      ? '#F59E0B'
      : '#EF4444';
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={getColor()}
          roughness={0.4}
          metalness={0.8}
          emissive={hovered ? getColor() : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </mesh>
      
      <Text
        position={[0, 1, 0]}
        fontSize={0.3}
        color="#1F2937"
        anchorY="bottom"
        anchorX="center"
      >
        {sensor.name}
      </Text>

      {hovered && (
        <Html position={[0, -1, 0]} center>
          <div className="bg-white p-2 rounded-lg shadow-lg text-sm w-48">
            <div className="font-medium text-gray-800">{sensor.currentReading.value} {sensor.currentReading.unit}</div>
            <div className="text-gray-600 text-xs mt-1">{sensor.location}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

function STLModel({ url }: { url: string }) {
  const geometry = useLoader(STLLoader, url);
  return (
    <mesh
      geometry={geometry}
      scale={[0.007, 0.007, 0.007]} // 10 times smaller
      castShadow
      receiveShadow
    >
      <meshStandardMaterial />
    </mesh>
  );
}

const SensorVisualization: React.FC<SensorVisualizationProps> = ({ sensors, onSensorClick }) => {
  // Calculate positions in a circular layout
  const getPosition = (index: number, total: number): [number, number, number] => {
    const radius = 5;
    const angle = (index / total) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = 0;
    return [x, y, z];
  };

  return (
    <div className="w-full h-[600px] bg-gray-50 rounded-lg shadow-inner">
      <Canvas camera={{ position: [0, 8, 12], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <group position={[-5, -4, -3]} rotation={[0, 0, 0]}>
          <STLModel url="../jaabouk.STL" />
        </group>

        {/* Sensor nodes */}
        {sensors.map((sensor, index) => (
          <SensorNode
            key={sensor.id}
            sensor={sensor}
            position={getPosition(index, sensors.length)}
            onClick={() => onSensorClick(sensor.id)}
          />
        ))}

        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={20}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default SensorVisualization;