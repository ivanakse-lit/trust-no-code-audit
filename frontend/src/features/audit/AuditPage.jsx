import { Link } from 'react-router-dom';
import { FolderOpen, ExternalLink } from 'lucide-react';
import { useAuditConfig } from './hooks/useAuditConfig';
import { AuditTypeSelector, BootstrapPreview } from './components';
import { PathInput } from '../paths';

/**
 * Main audit configuration page
 * Guides user through audit type selection, path configuration, and prompt generation
 */
function AuditPage() {
  const {
    selectedAuditId,
    selectedAudit,
    codebasePath,
    reportsPath,
    reportsValid,
    isFormValid,
    setSelectedAuditId,
    handleCodebaseChange,
    handleReportsChange,
  } = useAuditConfig();

  return (
    <div className="space-y-8">
      {/* Section: Audit Type Selection */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-sm">1</span>
          Select Audit Type
        </h2>
        <AuditTypeSelector 
          selectedAuditId={selectedAuditId} 
          onSelect={setSelectedAuditId} 
        />
      </section>

      {/* Section: Path Configuration */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-sm">2</span>
          Configure Paths
        </h2>
        <div className="space-y-4">
          <PathInput
            label="Codebase Path"
            placeholder="C:\Projects\my-app or /home/user/projects/my-app"
            value={codebasePath}
            onChange={handleCodebaseChange}
            validationType="read"
            icon={FolderOpen}
          />
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <PathInput
                label="Reports Folder"
                placeholder="C:\Projects\my-app-reports or /home/user/projects/my-app-reports"
                value={reportsPath}
                onChange={handleReportsChange}
                validationType="write"
                icon={FolderOpen}
              />
            </div>
            {reportsValid && (
              <Link
                to="/reports"
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Reports
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Section: Generated Prompt */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-sm">3</span>
          Bootstrap Prompt
        </h2>
        <BootstrapPreview
          auditType={selectedAudit}
          codebasePath={codebasePath}
          reportsPath={reportsPath}
          isValid={isFormValid}
        />
      </section>
    </div>
  );
}

export default AuditPage;
