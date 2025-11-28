import { ChevronRight } from 'lucide-react';
import { AUDIT_TYPES } from '../constants';
import AuditTypeCard from './AuditTypeCard';

/**
 * Audit type selection grid with expandable details panel
 * Displays all available audit types and shows details for selected type
 */
function AuditTypeSelector({ selectedAuditId, onSelect }) {
  const selectedAudit = AUDIT_TYPES.find(a => a.id === selectedAuditId);

  return (
    <div>
      {/* Audit type cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {AUDIT_TYPES.map((audit) => (
          <AuditTypeCard
            key={audit.id}
            audit={audit}
            isSelected={selectedAuditId === audit.id}
            onSelect={() => onSelect(audit.id)}
          />
        ))}
      </div>
      
      {/* Expanded details for selected audit */}
      {selectedAudit && (
        <div className="mt-4 p-4 bg-dark-card border border-dark-border rounded-lg">
          <div className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-gray-300 text-sm">{selectedAudit.description}</p>
              <div className="mt-2">
                <span className="text-xs text-gray-500">Expected outputs:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedAudit.outputs.map((output) => (
                    <span key={output} className="px-2 py-1 bg-dark-hover text-gray-300 text-xs rounded">
                      {output}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuditTypeSelector;
