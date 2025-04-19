import React, { useState } from 'react';
import { Menu, Bell, BarChart, Activity, Settings, Search, Cuboid as Cube } from 'lucide-react';
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
            <Activity className="h-8 w-8 mr-2" />
            <h1 className="text-xl font-bold">PhosphoSense</h1>
          </div>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex items-center bg-white/10 rounded-md px-3 py-1.5 flex-1 max-w-md mx-8">
            <Search className="h-4 w-4 text-white/60 mr-2" />
            <input
              type="text"
              placeholder="Search sensors, alerts..."
              className="bg-transparent border-none outline-none text-white placeholder-white/60 w-full"
            />
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
              <Cube className="h-5 w-5 mr-1" />
              <span>3D View</span>
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
            <button className="hover:bg-white/10 rounded-md px-3 py-2 flex items-center transition-colors">
              <Settings className="h-5 w-5 mr-1" />
              <span>Settings</span>
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
            <div className="flex items-center bg-white/10 rounded-md px-3 py-1.5 mb-3">
              <Search className="h-4 w-4 text-white/60 mr-2" />
              <input
                type="text"
                placeholder="Search sensors, alerts..."
                className="bg-transparent border-none outline-none text-white placeholder-white/60 w-full"
              />
            </div>
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
              <Cube className="h-5 w-5 mr-3" />
              <span>3D View</span>
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
            <button className="w-full text-left hover:bg-white/10 rounded-md px-3 py-2 flex items-center transition-colors">
              <Settings className="h-5 w-5 mr-3" />
              <span>Settings</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;