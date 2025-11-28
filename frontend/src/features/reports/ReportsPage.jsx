import { useState, useEffect, useCallback } from 'react';
import { FolderOpen, RefreshCw, Clock, X, Star, StarOff } from 'lucide-react';
import { PathInput } from '../paths';
import { useReports } from './hooks/useReports';
import { ReportList, ReportViewer } from './components';

/**
 * Reports browser page with persistent history
 * Allows users to browse and view audit reports from a selected folder
 * Remembers recent reports folders for quick access
 */
function ReportsPage() {
  // Initialize from localStorage (synced from Audit page)
  const [reportsPath, setReportsPath] = useState(() => {
    return localStorage.getItem('lastReportsPath') || '';
  });
  const [pathValid, setPathValid] = useState(null);
  
  // Recent and favorite reports folders
  const [recentFolders, setRecentFolders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('recentReportsFolders') || '[]');
    } catch { return []; }
  });
  
  const [favoriteFolders, setFavoriteFolders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favoriteReportsFolders') || '[]');
    } catch { return []; }
  });

  // Listen for storage changes from Audit page (if both tabs open)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'lastReportsPath' && e.newValue) {
        setReportsPath(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Save to recent folders when path is validated
  const saveToRecent = useCallback((path) => {
    if (!path) return;
    
    setRecentFolders(current => {
      // Add to front, remove duplicates, limit to 10
      const updated = [
        { path, accessedAt: new Date().toISOString() },
        ...current.filter(f => f.path !== path)
      ].slice(0, 10);
      localStorage.setItem('recentReportsFolders', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Toggle favorite status
  const toggleFavorite = useCallback((path) => {
    setFavoriteFolders(current => {
      const isFavorite = current.includes(path);
      const updated = isFavorite 
        ? current.filter(p => p !== path)
        : [...current, path];
      localStorage.setItem('favoriteReportsFolders', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Remove from recent
  const removeFromRecent = useCallback((path) => {
    setRecentFolders(current => {
      const updated = current.filter(f => f.path !== path);
      localStorage.setItem('recentReportsFolders', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Select a folder from recent/favorites
  const selectFolder = useCallback((path) => {
    setReportsPath(path);
    localStorage.setItem('lastReportsPath', path);
  }, []);

  const {
    reports,
    selectedReport,
    reportContent,
    loading,
    error,
    fetchReports,
    loadReport,
  } = useReports(reportsPath, pathValid === true);

  const handlePathChange = (path, isValid) => {
    setReportsPath(path);
    setPathValid(isValid);
    
    // Save to recent when valid
    if (isValid && path) {
      saveToRecent(path);
    }
  };

  // Helper to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Helper to get folder name from path
  const getFolderName = (path) => {
    const parts = path.replace(/\\/g, '/').split('/').filter(Boolean);
    return parts[parts.length - 1] || path;
  };

  // Check if path is favorite
  const isFavorite = (path) => favoriteFolders.includes(path);

  // Combined list: favorites first, then recent (excluding favorites)
  const allFolders = [
    ...favoriteFolders.map(path => ({ path, isFavorite: true })),
    ...recentFolders.filter(f => !favoriteFolders.includes(f.path)).map(f => ({ ...f, isFavorite: false }))
  ];

  return (
    <div className="space-y-6">
      {/* Recent & Favorite Folders */}
      {allFolders.length > 0 && (
        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-medium text-gray-400">Recent Reports</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {allFolders.map(({ path, accessedAt, isFavorite: isFav }) => (
              <div
                key={path}
                className={`group flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors cursor-pointer ${
                  reportsPath === path 
                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' 
                    : 'bg-dark-bg border-dark-border text-gray-300 hover:bg-dark-hover hover:border-gray-600'
                }`}
                onClick={() => selectFolder(path)}
              >
                <FolderOpen className="w-4 h-4 flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate max-w-[200px]">
                    {getFolderName(path)}
                  </span>
                  {accessedAt && (
                    <span className="text-xs text-gray-500">{formatDate(accessedAt)}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(path); }}
                    className="p-1 rounded hover:bg-dark-hover"
                    title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {isFav ? (
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    ) : (
                      <StarOff className="w-3.5 h-3.5 text-gray-500 opacity-0 group-hover:opacity-100" />
                    )}
                  </button>
                  {!isFav && (
                    <button
                      onClick={(e) => { e.stopPropagation(); removeFromRecent(path); }}
                      className="p-1 rounded hover:bg-dark-hover opacity-0 group-hover:opacity-100"
                      title="Remove from recent"
                    >
                      <X className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Path Selection */}
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <PathInput
            label="Reports Folder"
            placeholder="C:\Projects\my-app-reports or browse to select"
            value={reportsPath}
            onChange={handlePathChange}
            validationType="read"
            icon={FolderOpen}
          />
        </div>
        <button
          onClick={() => pathValid && toggleFavorite(reportsPath)}
          disabled={!pathValid}
          className="flex items-center gap-2 px-4 py-2.5 bg-dark-card border border-dark-border rounded-lg text-gray-300 hover:bg-dark-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title={isFavorite(reportsPath) ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite(reportsPath) ? (
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          ) : (
            <Star className="w-4 h-4" />
          )}
        </button>
        <button
          onClick={fetchReports}
          disabled={!pathValid}
          className="flex items-center gap-2 px-4 py-2.5 bg-dark-card border border-dark-border rounded-lg text-gray-300 hover:bg-dark-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Reports List & Viewer */}
      {pathValid && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
          {/* Report List */}
          <div className="lg:col-span-1 bg-dark-card border border-dark-border rounded-lg overflow-hidden">
            <div className="p-3 border-b border-dark-border">
              <h3 className="text-sm font-medium text-gray-300">
                Reports {reports.length > 0 && `(${reports.length})`}
              </h3>
            </div>
            <div className="overflow-y-auto max-h-[550px]">
              <ReportList
                reports={reports}
                selectedReport={selectedReport}
                onSelect={loadReport}
                loading={loading}
              />
            </div>
          </div>

          {/* Report Viewer */}
          <div className="lg:col-span-2 bg-dark-card border border-dark-border rounded-lg overflow-hidden">
            <ReportViewer
              report={selectedReport}
              content={reportContent}
              loading={loading && selectedReport !== null}
            />
          </div>
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}

export default ReportsPage;
