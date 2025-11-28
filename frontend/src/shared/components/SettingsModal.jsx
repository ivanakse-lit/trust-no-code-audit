import { useState, useEffect } from 'react';
import { X, Save, RotateCcw } from 'lucide-react';

/**
 * Settings modal for configuring application preferences
 */
function SettingsModal({ isOpen, onClose }) {
  const [settings, setSettings] = useState({
    auditsBasePath: 'B:\\Dev\\Audits',
    defaultReportsFolder: '',
    autoSuggestReports: true,
  });

  // Load settings from localStorage
  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem('auditDashboardSettings');
      if (stored) {
        try {
          setSettings(prev => ({ ...prev, ...JSON.parse(stored) }));
        } catch {
          // Use defaults
        }
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem('auditDashboardSettings', JSON.stringify(settings));
    onClose();
  };

  const handleReset = () => {
    const defaults = {
      auditsBasePath: 'B:\\Dev\\Audits',
      defaultReportsFolder: '',
      autoSuggestReports: true,
    };
    setSettings(defaults);
    localStorage.setItem('auditDashboardSettings', JSON.stringify(defaults));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onKeyDown={handleKeyDown}
    >
      <div className="bg-dark-card border border-dark-border rounded-xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-dark-border">
          <h2 className="text-lg font-semibold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-dark-hover rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Audits Base Path */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Audits Base Path
            </label>
            <input
              type="text"
              value={settings.auditsBasePath}
              onChange={(e) => setSettings(prev => ({ ...prev, auditsBasePath: e.target.value }))}
              placeholder="Path to audit prompt files"
              className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
            <p className="mt-1 text-xs text-gray-500">
              Location of AI_*_AUDIT_PROMPT.md files
            </p>
          </div>

          {/* Default Reports Folder */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Default Reports Folder
            </label>
            <input
              type="text"
              value={settings.defaultReportsFolder}
              onChange={(e) => setSettings(prev => ({ ...prev, defaultReportsFolder: e.target.value }))}
              placeholder="Optional default path for reports"
              className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
            <p className="mt-1 text-xs text-gray-500">
              Pre-fill reports folder on the Reports page
            </p>
          </div>

          {/* Auto-suggest Reports Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Auto-suggest Reports Folder</p>
              <p className="text-xs text-gray-500">Create sibling folder from codebase path</p>
            </div>
            <button
              onClick={() => setSettings(prev => ({ ...prev, autoSuggestReports: !prev.autoSuggestReports }))}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                settings.autoSuggestReports ? 'bg-blue-600' : 'bg-dark-border'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.autoSuggestReports ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-dark-border bg-dark-bg rounded-b-xl">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-dark-hover rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-dark-hover rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
