import React, { useState } from 'react';
import { Menu, Bell, BarChart, Activity, Pipette as Pipe } from 'lucide-react';
import { Alert } from '../types';

interface HeaderProps {
  alerts: Alert[];
  onViewAlerts: () => void;
  onToggle3D: () => void;
  is3DActive: boolean;
}

const Header: React.FC<HeaderProps> = ({ alerts, onViewAlerts, onToggle3D, is3DActive }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unacknowledgedAlerts = alerts.filter((alert) => !alert.acknowledged);

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4">
      <div className="flex justify-between items-center py-3">
        <div className="flex items-center">
          <img src="../images/logo.svg" alt="PhosphoSense Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-bold">PhosphoSense</h1>
        </div>

          {/* Desktop navigation */}
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
              <Pipe className="h-5 w-5 mr-1" />
              <span>Product Overview</span>
            </button>
            <button
              className="hover:bg-white/10 rounded-md px-3 py-2 flex items-center transition-colors relative"
              onClick={onViewAlerts}
            >
              <Bell className="h-5 w-5 mr-1" />
              <span>Alerts</span>
              {unacknowledgedAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unacknowledgedAlerts.length}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-white/10 space-y-2">
            <button 
              className={`w-full text-left hover:bg-white/10 rounded-md px-3 py-2 flex items-center transition-colors ${
                !is3DActive ? 'bg-white/10' : ''
              }`}
              onClick={() => is3DActive && onToggle3D()}
            >
              <BarChart className="h-5 w-5 mr-3" />
              <span>Dashboard</span>
            </button>
            <button 
              className={`w-full text-left hover:bg-white/10 rounded-md px-3 py-2 flex items-center transition-colors ${
                is3DActive ? 'bg-white/10' : ''
              }`}
              onClick={() => !is3DActive && onToggle3D()}
            >
              <Pipe className="h-5 w-5 mr-3" />
              <span>Product Overview</span>
            </button>
            <button
              className="w-full text-left hover:bg-white/10 rounded-md px-3 py-2 flex items-center transition-colors relative"
              onClick={onViewAlerts}
            >
              <Bell className="h-5 w-5 mr-3" />
              <span>Alerts</span>
              {unacknowledgedAlerts.length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unacknowledgedAlerts.length}
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;