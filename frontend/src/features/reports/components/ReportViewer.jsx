import { useState } from 'react';
import { FileText, Download, Copy, Check } from 'lucide-react';
import MarkdownViewer from './MarkdownViewer';
import JsonViewer from './JsonViewer';

/**
 * Container component for viewing report content
 * Handles both Markdown and JSON formats with copy/download actions
 */
function ReportViewer({ report, content, loading }) {
  const [copied, setCopied] = useState(false);

  if (!report) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Select a report to view</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-3" />
          <p>Loading report...</p>
        </div>
      </div>
    );
  }

  const isJson = report.name.endsWith('.json');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = report.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border bg-dark-bg/50">
        <div className="flex items-center gap-3">
          <FileText className={`w-5 h-5 ${isJson ? 'text-yellow-500' : 'text-blue-400'}`} />
          <h3 className="text-base font-medium text-white truncate">{report.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white bg-dark-card hover:bg-dark-hover border border-dark-border rounded-lg transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white bg-dark-card hover:bg-dark-hover border border-dark-border rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      {/* Content with generous padding for readability */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-8">
          {isJson ? (
            <JsonViewer content={content} />
          ) : (
            <MarkdownViewer content={content} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportViewer;
