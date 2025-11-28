import { useState, useEffect } from 'react';
import { Check, X, Loader2, FolderOpen, FolderSearch } from 'lucide-react';
import { usePathValidation, useRecentPaths } from '../hooks/usePathValidation';
import FolderBrowser from './FolderBrowser';

/**
 * Path input component with real-time validation, recent paths dropdown, and folder browser
 * Supports both read and write validation modes
 */
function PathInput({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  validationType = 'read',
  icon: Icon = FolderOpen 
}) {
  const [showRecent, setShowRecent] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);
  
  const { validationState, validationMessage, isValid } = usePathValidation(value, validationType);
  const { recentPaths, savePath } = useRecentPaths(`recentPaths_${validationType}`);

  // Notify parent of validation changes
  useEffect(() => {
    onChange(value, isValid);
  }, [isValid]);

  // Save valid paths to recent
  useEffect(() => {
    if (isValid === true && value) {
      savePath(value);
    }
  }, [isValid, value, savePath]);

  const handleInputChange = (e) => {
    onChange(e.target.value, null);
  };

  const selectRecentPath = (path) => {
    onChange(path, null);
    setShowRecent(false);
  };

  const handleBrowseSelect = (path) => {
    onChange(path, null);
  };

  const getStatusIcon = () => {
    switch (validationState) {
      case 'loading':
        return <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />;
      case 'valid':
      case 'will-create':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'invalid':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (validationState) {
      case 'valid':
      case 'will-create':
        return 'text-green-500';
      case 'invalid':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-300 mb-1.5">
        {label}
      </label>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="w-5 h-5 text-gray-500" />
          </div>
          
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            onFocus={() => recentPaths.length > 0 && setShowRecent(true)}
            onBlur={() => setTimeout(() => setShowRecent(false), 200)}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-2.5 bg-dark-card border border-dark-border rounded-lg text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
          
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {getStatusIcon()}
          </div>
        </div>
        
        {/* Browse button */}
        <button
          type="button"
          onClick={() => setShowBrowser(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-dark-card border border-dark-border rounded-lg text-gray-300 hover:bg-dark-hover hover:text-white transition-colors"
        >
          <FolderSearch className="w-4 h-4" />
          Browse
        </button>
      </div>

      {/* Validation message */}
      {validationMessage && (
        <p className={`mt-1.5 text-xs ${getStatusColor()}`}>
          {validationMessage}
        </p>
      )}

      {/* Recent paths dropdown */}
      {showRecent && recentPaths.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-dark-card border border-dark-border rounded-lg shadow-lg overflow-hidden">
          <div className="px-3 py-2 text-xs text-gray-500 border-b border-dark-border">
            Recent paths
          </div>
          <ul className="max-h-48 overflow-y-auto">
            {recentPaths.map((path, index) => (
              <li key={index}>
                <button
                  onClick={() => selectRecentPath(path)}
                  className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-dark-hover truncate"
                >
                  {path}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Folder browser modal */}
      <FolderBrowser
        isOpen={showBrowser}
        onClose={() => setShowBrowser(false)}
        onSelect={handleBrowseSelect}
        initialPath={value}
      />
    </div>
  );
}

export default PathInput;
