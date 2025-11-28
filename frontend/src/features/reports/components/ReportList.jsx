import { FileText, FileJson, RefreshCw } from 'lucide-react';

/**
 * List component for displaying available reports in a folder
 * Shows file metadata and handles selection
 */
function ReportList({ reports, selectedReport, onSelect, loading }) {
  const getFileIcon = (filename) => {
    if (filename.endsWith('.json')) return FileJson;
    return FileText;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (loading && reports.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2" />
        Loading reports...
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>No reports found</p>
        <p className="text-xs mt-1">Select a folder containing .md or .json files</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-dark-border">
      {reports.map((report) => {
        const Icon = getFileIcon(report.name);
        const isSelected = selectedReport?.name === report.name;
        
        return (
          <li key={report.name}>
            <button
              onClick={() => onSelect(report)}
              className={`w-full text-left p-3 hover:bg-dark-hover transition-colors ${
                isSelected ? 'bg-dark-hover border-l-2 border-blue-500' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 mt-0.5 ${
                  report.name.endsWith('.json') ? 'text-yellow-500' : 'text-blue-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-200 truncate">{report.name}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <span>{formatDate(report.modified)}</span>
                    <span>•</span>
                    <span>{formatSize(report.size)}</span>
                  </div>
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default ReportList;
