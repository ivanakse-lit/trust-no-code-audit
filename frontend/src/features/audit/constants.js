import { Shield, Building2, Rocket } from 'lucide-react';

/**
 * Audit type configurations
 * Each type defines its metadata, expected outputs, and associated prompt file
 */
export const AUDIT_TYPES = [
  {
    id: 'security',
    name: 'Security Audit',
    icon: Shield,
    color: 'red',
    description: 'Comprehensive security analysis including threat hunting, secrets detection, and compliance mapping.',
    outputs: ['Security & Architecture.md', 'security_findings.json'],
    promptFile: 'AI_SECURITY_AUDIT_PROMPT.md',
  },
  {
    id: 'architecture',
    name: 'Architecture Audit',
    icon: Building2,
    color: 'blue',
    description: 'Deep analysis of code structure, layering, domain modeling, and architectural patterns.',
    outputs: ['Architecture_Audit_Report_YYYY-MM-DD.md'],
    promptFile: 'AI_ARCHITECTURE_AUDIT_PROMPT.md',
  },
  {
    id: 'production',
    name: 'Production Readiness',
    icon: Rocket,
    color: 'green',
    description: 'Production readiness assessment including performance, reliability, and operational resilience.',
    outputs: ['Production_Readiness_Report_YYYY-MM-DD.md'],
    promptFile: 'AI_PRODUCTION_AUDIT_PROMPT.md',
  },
];

/**
 * Color class mappings for audit type styling
 */
export const AUDIT_COLOR_CLASSES = {
  red: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/50',
    icon: 'text-red-500',
    selected: 'ring-red-500',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/50',
    icon: 'text-blue-500',
    selected: 'ring-blue-500',
  },
  green: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/50',
    icon: 'text-green-500',
    selected: 'ring-green-500',
  },
};

/**
 * Get the audits folder path for prompt file references
 */
export const getAuditsBasePath = () => {
  // This will be configured based on the actual installation path
  return 'B:\\Dev\\Audits';
};
