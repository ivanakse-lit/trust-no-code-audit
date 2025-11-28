import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for validating file system paths with debouncing
 * @param {string} path - The path to validate
 * @param {string} validationType - 'read' or 'write' validation mode
 * @param {number} debounceMs - Debounce delay in milliseconds
 */
export function usePathValidation(path, validationType = 'read', debounceMs = 500) {
  const [validationState, setValidationState] = useState(null); // null, 'loading', 'valid', 'invalid', 'will-create'
  const [validationMessage, setValidationMessage] = useState('');
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    if (!path || path.length < 3) {
      setValidationState(null);
      setValidationMessage('');
      setIsValid(null);
      return;
    }

    const timer = setTimeout(async () => {
      setValidationState('loading');
      try {
        const response = await fetch('/api/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path, type: validationType }),
        });
        const data = await response.json();
        
        if (data.valid) {
          setValidationState('valid');
          setValidationMessage(validationType === 'write' ? 'Folder is writable' : 'Path exists and is readable');
          setIsValid(true);
        } else if (data.willCreate) {
          setValidationState('will-create');
          setValidationMessage('Folder will be created');
          setIsValid(true);
        } else {
          setValidationState('invalid');
          setValidationMessage(data.error || 'Path does not exist');
          setIsValid(false);
        }
      } catch (err) {
        setValidationState('invalid');
        setValidationMessage('Failed to validate path');
        setIsValid(false);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [path, validationType, debounceMs]);

  return {
    validationState,
    validationMessage,
    isValid,
  };
}

/**
 * Hook for managing recent paths with localStorage persistence
 * @param {string} storageKey - Unique key for localStorage
 * @param {number} maxPaths - Maximum number of paths to store
 */
export function useRecentPaths(storageKey, maxPaths = 10) {
  const [recentPaths, setRecentPaths] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setRecentPaths(JSON.parse(stored));
      } catch (e) {
        setRecentPaths([]);
      }
    }
  }, [storageKey]);

  // Save a new path to recent paths
  const savePath = useCallback((path) => {
    if (!path) return;
    
    setRecentPaths(current => {
      const updated = [path, ...current.filter(p => p !== path)].slice(0, maxPaths);
      localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });
  }, [storageKey, maxPaths]);

  // Clear all recent paths
  const clearPaths = useCallback(() => {
    localStorage.removeItem(storageKey);
    setRecentPaths([]);
  }, [storageKey]);

  return {
    recentPaths,
    savePath,
    clearPaths,
  };
}
