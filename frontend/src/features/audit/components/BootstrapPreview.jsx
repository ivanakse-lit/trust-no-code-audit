import { useState } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { getAuditsBasePath } from '../constants';
import { generateBootstrapPrompt } from '../utils/promptGenerator';

/**
 * Component for displaying and copying the generated bootstrap prompt
 * Shows validation warnings when configuration is incomplete
 */
function BootstrapPreview({ auditType, codebasePath, reportsPath, isValid }) {
  const [copied, setCopied] = useState(false);

  const prompt = isValid 
    ? generateBootstrapPrompt(auditType, codebasePath, reportsPath, getAuditsBasePath())
    : '';

  const handleCopy = async () => {
    if (!prompt) return;
    
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers without clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = prompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isValid) {
    return (
      <div className="bg-dark-card border border-dark-border rounded-lg p-6">
        <div className="flex items-center gap-3 text-yellow-500">
          <AlertCircle className="w-5 h-5" />
          <div>
            <p className="font-medium">Configuration Incomplete</p>
            <p className="text-sm text-gray-400 mt-1">
              Select an audit type and enter valid paths to generate the bootstrap prompt.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-dark-border">
        <span className="text-sm text-gray-400">
          Ready to copy — paste into Windsurf, Cursor, or any AI IDE
        </span>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
            copied
              ? 'bg-green-500/20 text-green-400'
              : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy to Clipboard
            </>
          )}
        </button>
      </div>

      {/* Prompt content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
          {prompt}
        </pre>
      </div>
    </div>
  );
}

export default BootstrapPreview;
