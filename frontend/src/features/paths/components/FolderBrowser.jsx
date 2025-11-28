import { useState, useEffect, useCallback } from 'react';
import { X, Folder, FolderOpen, ChevronRight, ArrowUp, HardDrive, Loader2, AlertCircle } from 'lucide-react';

/**
 * Modal component for browsing and selecting folders from the file system
 */
function FolderBrowser({ isOpen, onClose, onSelect, initialPath = '' }) {
  const [currentPath, setCurrentPath] = useState('');
  const [contents, setContents] = useState({ dirs: [], files: [], parent: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [drives, setDrives] = useState([]);

  // Fetch directory contents
  const fetchDirectory = useCallback(async (path) => {
    setLoading(true);
    setError(null);
    
    try {
      const url = path 
        ? `/api/browse?path=${encodeURIComponent(path)}`
        : '/api/browse';
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to browse directory');
      
      const data = await response.json();
      setContents({
        dirs: data.dirs || [],
        files: data.files || [],
        parent: data.parent || '',
      });
      setCurrentPath(data.path || '');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch available drives (Windows)
  const fetchDrives = useCallback(async () => {
    try {
      const response = await fetch('/api/drives');
      if (response.ok) {
        const data = await response.json();
        setDrives(data.drives || []);
      }
    } catch {
      // Drives endpoint may not exist on non-Windows
      setDrives([]);
    }
  }, []);

  // Initialize when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchDrives();
      fetchDirectory(initialPath || '');
    }
  }, [isOpen, initialPath, fetchDirectory, fetchDrives]);

  // Handle folder double-click to navigate into
  const handleNavigate = (path) => {
    fetchDirectory(path);
  };

  // Handle going up to parent
  const handleGoUp = () => {
    if (contents.parent && contents.parent !== currentPath) {
      fetchDirectory(contents.parent);
    }
  };

  // Handle drive selection
  const handleDriveSelect = (drive) => {
    fetchDirectory(drive);
  };

  // Handle folder selection (confirm button)
  const handleSelect = () => {
    onSelect(currentPath);
    onClose();
  };

  // Handle keyboard navigation
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
      <div className="bg-dark-card border border-dark-border rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-dark-border">
          <h2 className="text-lg font-semibold text-white">Select Folder</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-dark-hover rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current path bar */}
        <div className="flex items-center gap-2 px-4 py-2 bg-dark-bg border-b border-dark-border">
          <button
            onClick={handleGoUp}
            disabled={!contents.parent || contents.parent === currentPath}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-dark-hover rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Go to parent folder"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <div className="flex-1 px-3 py-1.5 bg-dark-card border border-dark-border rounded text-sm text-gray-300 truncate">
            {currentPath || 'Loading...'}
          </div>
        </div>

        {/* Drives bar (Windows) */}
        {drives.length > 0 && (
          <div className="flex items-center gap-1 px-4 py-2 border-b border-dark-border overflow-x-auto">
            {drives.map((drive) => (
              <button
                key={drive}
                onClick={() => handleDriveSelect(drive)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-sm transition-colors ${
                  currentPath.toUpperCase().startsWith(drive.toUpperCase())
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-gray-400 hover:text-white hover:bg-dark-hover'
                }`}
              >
                <HardDrive className="w-3.5 h-3.5" />
                {drive}
              </button>
            ))}
          </div>
        )}

        {/* Directory contents */}
        <div className="flex-1 overflow-y-auto p-2 min-h-[300px]">
          {loading ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-red-400">
              <div className="text-center">
                <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                <p>{error}</p>
              </div>
            </div>
          ) : contents.dirs.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Folder className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No subfolders</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-1">
              {contents.dirs.map((dir) => (
                <button
                  key={dir.path}
                  onDoubleClick={() => handleNavigate(dir.path)}
                  onClick={() => handleNavigate(dir.path)}
                  className="flex items-center gap-3 w-full px-3 py-2 text-left rounded-lg hover:bg-dark-hover transition-colors group"
                >
                  <FolderOpen className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span className="text-gray-200 truncate flex-1">{dir.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 p-4 border-t border-dark-border bg-dark-bg">
          <p className="text-xs text-gray-500 truncate">
            Click a folder to navigate, then Select to confirm
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-dark-hover rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSelect}
              disabled={!currentPath}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Select This Folder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FolderBrowser;
