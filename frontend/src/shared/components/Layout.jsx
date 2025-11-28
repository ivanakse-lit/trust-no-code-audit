import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Shield, FileText, Settings } from 'lucide-react';
import SettingsModal from './SettingsModal';

/**
 * Main application layout with header navigation
 * Provides consistent structure across all pages
 */
function Layout() {
  const [showSettings, setShowSettings] = useState(false);

  const navItems = [
    { to: '/audit', label: 'Audit', icon: Shield },
    { to: '/reports', label: 'Reports', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="border-b border-dark-border bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Shield className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">
                  Trust No Code
                </h1>
                <p className="text-xs text-gray-500">Audit Dashboard</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-dark-hover text-white'
                        : 'text-gray-400 hover:text-white hover:bg-dark-hover'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </NavLink>
              ))}
              
              {/* Settings button */}
              <button
                onClick={() => setShowSettings(true)}
                className="ml-2 p-2 text-gray-400 hover:text-white hover:bg-dark-hover rounded-lg transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </div>
  );
}

export default Layout;
