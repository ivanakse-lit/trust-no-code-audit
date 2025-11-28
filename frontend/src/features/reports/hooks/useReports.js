import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for fetching and managing reports from a folder
 * @param {string} reportsPath - Path to the reports folder
 * @param {boolean} isPathValid - Whether the path has been validated
 */
export function useReports(reportsPath, isPathValid) {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportContent, setReportContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch reports when path changes and is valid
  const fetchReports = useCallback(async () => {
    if (!reportsPath || !isPathValid) {
      setReports([]);
      setSelectedReport(null);
      setReportContent('');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/reports?path=${encodeURIComponent(reportsPath)}`);
      if (!response.ok) throw new Error('Failed to fetch reports');
      const data = await response.json();
      setReports(data.reports || []);
    } catch (err) {
      setError(err.message);
      setReports([]);
    } finally {
      setLoading(false);
    }
  }, [reportsPath, isPathValid]);

  // Auto-fetch when path changes
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // Load a specific report's content
  const loadReport = useCallback(async (report) => {
    setSelectedReport(report);
    setLoading(true);
    setError(null);
    
    try {
      const fullPath = `${reportsPath}/${report.name}`.replace(/\\/g, '/');
      const response = await fetch(`/api/report?path=${encodeURIComponent(fullPath)}`);
      if (!response.ok) throw new Error('Failed to load report');
      const data = await response.json();
      setReportContent(data.content);
    } catch (err) {
      setError(err.message);
      setReportContent('');
    } finally {
      setLoading(false);
    }
  }, [reportsPath]);

  // Clear selection
  const clearSelection = useCallback(() => {
    setSelectedReport(null);
    setReportContent('');
  }, []);

  return {
    reports,
    selectedReport,
    reportContent,
    loading,
    error,
    fetchReports,
    loadReport,
    clearSelection,
  };
}
