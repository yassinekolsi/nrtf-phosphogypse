import React, { useState } from 'react';
import {
  Menu,
  Bell,
  BarChart,
  Activity,
  Settings,
  Search,
  Cuboid as Cube,
} from 'lucide-react';
import { Alert } from '../types';
import AlertsList from './AlertsList';

interface HeaderProps {
  alerts: Alert[];
  onToggle3D: () => void;
  is3DActive: boolean;
}

const Header: React.FC<HeaderProps> = ({ alerts: initialAlerts, onToggle3D, is3DActive }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);

  const toggleAlerts = () => {
    setShowAlerts((prev) => !prev);
  };

  const handleAcknowledge = (alertId: string) => {
    setAlerts((prevAlerts) =>
      prevAlerts.filter((alert) => alert.id !== alertId)
    );
  };

  const unacknowledgedAlerts = alerts.filter((alert) => !alert.acknowledged);

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-md relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo and Title */}
          <div className="flex items-center">
            <Activity className="h-8 w-8 mr-2" />
            <h1 className="text-xl font-bold">PhosphoSense</h1>
          </div>

          {/* Search (desktop only) */}
          <div className="hidden md:flex items-center bg-white/10 rounded-md px-3 py-1.5 flex-1 max-w-md mx-8">
            <Search className="h-4 w-4 text-white/60 mr-2" />
            <input
              type="text"
              placeholder="Search sensors, alerts..."
              className="bg-transparent border-none outline-none text-white placeholder-white/60 w-full"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <button
              className={`hover:bg-white/10 rounded-md px-3 py-2 flex items-center transition-colors ${
                !is3DActive ? 'bg-white/10' : ''
              }`}
              onClick={() => is3DActive && onToggle3D()}
            >
              <BarChart className="h-5 w-5 mr-1" />
              <span>Dashboard</span>
            </button>
            <button
              className={`hover:bg-white/10 rounded-md px-3 py-2 flex items-center transition-colors ${
                is3DActive ? 'bg-white/10' : ''
              }`}
              onClick={() => !is3DActive && onToggle3D()}
            >
              <Cube className="h-5 w-5 mr-1" />
              <span>3D View</span>
            </button>

            {/* Alerts with Dropdown */}
            <div className="relative">
              <button
                className="hover:bg-white/10 rounded-md px-3 py-2 flex items-center transition-colors relative"
                onClick={toggleAlerts}
              >
                <Bell className="h-5 w-5 mr-1" />
                <span>Alerts</span>
                {unacknowledgedAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unacknowledgedAlerts.length}
                  </span>
                )}
              </button>

              {/* Dropdown List */}
              {showAlerts && (
                <div className="absolute right-0 mt-2 w-[400px] z-50">
                  <AlertsList alerts={alerts} onAcknowledge={handleAcknowledge} />
                </div>
              )}
            </div>

            <button className="hover:bg-white/10 rounded-md px-3 py-2 flex items-center transition-colors">
              <Settings className="h-5 w-5 mr-1" />
              <span>Settings</span>
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Optional: Mobile Nav (not modified here) */}
      </div>
    </header>
  );
};

export default Header;
