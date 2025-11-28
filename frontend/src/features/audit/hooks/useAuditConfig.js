import { useState, useCallback, useMemo } from 'react';
import { AUDIT_TYPES } from '../constants';

/**
 * Hook for managing audit configuration state
 * Handles audit type selection and path management with auto-suggest
 */
export function useAuditConfig() {
  const [selectedAuditId, setSelectedAuditId] = useState(null);
  const [codebasePath, setCodebasePath] = useState('');
  const [reportsPath, setReportsPath] = useState('');
  const [codebaseValid, setCodebaseValid] = useState(null);
  const [reportsValid, setReportsValid] = useState(null);

  // Get the selected audit configuration object
  const selectedAudit = useMemo(() => 
    AUDIT_TYPES.find(a => a.id === selectedAuditId),
    [selectedAuditId]
  );

  // Check if form is complete and valid
  const isFormValid = useMemo(() => 
    selectedAuditId && codebaseValid === true && reportsValid === true,
    [selectedAuditId, codebaseValid, reportsValid]
  );

  // Handle codebase path changes with auto-suggest for reports
  const handleCodebaseChange = useCallback((path, isValid) => {
    setCodebasePath(path);
    setCodebaseValid(isValid);
    
    // Auto-suggest sibling reports folder when codebase path is set
    if (path && !reportsPath) {
      const parts = path.replace(/\\/g, '/').split('/');
      const projectName = parts[parts.length - 1];
      parts[parts.length - 1] = `${projectName}-reports`;
      setReportsPath(parts.join('/'));
    }
  }, [reportsPath]);

  // Handle reports path changes and persist to localStorage for Reports page
  const handleReportsChange = useCallback((path, isValid) => {
    setReportsPath(path);
    setReportsValid(isValid);
    
    // Save valid reports path to localStorage for cross-page sync
    if (isValid && path) {
      localStorage.setItem('lastReportsPath', path);
    }
  }, []);

  // Reset all form state
  const resetForm = useCallback(() => {
    setSelectedAuditId(null);
    setCodebasePath('');
    setReportsPath('');
    setCodebaseValid(null);
    setReportsValid(null);
  }, []);

  return {
    // State
    selectedAuditId,
    selectedAudit,
    codebasePath,
    reportsPath,
    codebaseValid,
    reportsValid,
    isFormValid,
    
    // Actions
    setSelectedAuditId,
    handleCodebaseChange,
    handleReportsChange,
    resetForm,
  };
}
