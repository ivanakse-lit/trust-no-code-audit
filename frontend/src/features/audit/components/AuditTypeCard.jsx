import { Check } from 'lucide-react';
import { AUDIT_COLOR_CLASSES } from '../constants';

/**
 * Selectable card component for displaying an audit type option
 * Shows icon, title, description, and selection state
 */
function AuditTypeCard({ audit, isSelected, onSelect }) {
  const { name, icon: Icon, color, description, outputs } = audit;
  const colors = AUDIT_COLOR_CLASSES[color] || AUDIT_COLOR_CLASSES.blue;

  return (
    <button
      onClick={onSelect}
      className={`
        relative w-full text-left p-4 rounded-lg border transition-all
        ${isSelected 
          ? `${colors.bg} ${colors.border} ring-2 ${colors.selected}` 
          : 'bg-dark-card border-dark-border hover:border-gray-600 hover:bg-dark-hover'
        }
      `}
    >
      {/* Selected checkmark */}
      {isSelected && (
        <div className={`absolute top-3 right-3 p-1 rounded-full ${colors.bg}`}>
          <Check className={`w-4 h-4 ${colors.icon}`} />
        </div>
      )}

      {/* Icon */}
      <div className={`inline-flex p-2 rounded-lg ${colors.bg} mb-3`}>
        <Icon className={`w-6 h-6 ${colors.icon}`} />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-white mb-1">{name}</h3>

      {/* Brief description */}
      <p className="text-sm text-gray-400 line-clamp-2">{description}</p>

      {/* Output count */}
      <div className="mt-3 text-xs text-gray-500">
        {outputs.length} output file{outputs.length > 1 ? 's' : ''}
      </div>
    </button>
  );
}

export default AuditTypeCard;
