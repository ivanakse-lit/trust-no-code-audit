/**
 * Bootstrap prompt templates for each audit type
 * Templates are functions that take paths and return the complete prompt
 */
const PROMPT_TEMPLATES = {
  security: (promptPath, repoPath, reportsPath) => `Read and follow the audit spec at "${promptPath}".
After reading, reply with this confirmation:
- SpecTitle: "AI Security Audit Mixture-of-Experts Orchestration Prompt"
- Version: 1.1.2
- ExpertsRoster: [Repository Mapper, Static Threat Hunter, Secrets & Config Analyst, Client Security Analyst, Network & Telemetry Analyst, Forensics & Provenance Analyst, Compliance & Controls Mapper, Deduplicator & Scoring, Remediation Planner, Report Writer, Quality Assurance & Validation (runs after critical experts)]
- Anti-Hallucination Protocol: Enabled (all findings must cite specific files/lines; no invented IOCs, files, or patterns; assumptions explicitly marked)

Parameters:
- RepositoryPath: ${repoPath}
- ReportsFolder: ${reportsPath}
- RuntimeMode: offline
- IncludeGlobs: ["**/*"]
- ExcludeGlobs: [".git/**", "node_modules/**", "**/dist/**", "**/build/**", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.webp", "**/*.ico", "**/*.zip", "**/*.exe", "**/*.dll", "**/*.so"]

Then run the MoE flow per the spec with QA validation after critical detection experts (2-6). Do not execute code or perform network calls. At the end, write "Security & Architecture.md" and "security_findings.json" into ReportsFolder using write_to_file. If the spec file or RepositoryPath is not accessible/readable, stop with AccessError and instruct me to provide a readable local snapshot path and a writable ReportsFolder, then re-run.`,

  architecture: (promptPath, repoPath, reportsPath) => `Read and follow the architecture audit spec at "${promptPath}".
After reading, reply with this confirmation:
- SpecTitle: "AI Architecture Audit Mixture-of-Experts Orchestration Prompt"
- Version: 1.0.0
- ExpertsRoster: [Layering & Structure, Domain & Services, UI & Components, Types & Contracts, Testing & Testability, Refactoring Strategy & Integration, Quality Assurance & Validation (runs after each expert)]
- Anti-Hallucination Protocol: Enabled (all findings must cite specific files/lines; assumptions explicitly marked)

Parameters:
- ProjectPath: ${repoPath}
- ReportsFolder: ${reportsPath}
- IncludeGlobs: ["**/*"]
- ExcludeGlobs: [".git/**", "node_modules/**", "**/dist/**", "**/build/**", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.webp", "**/*.ico", "**/*.zip", "**/*.exe", "**/*.dll", "**/*.so"]

Then run the MoE flow per the spec. Automatically gather the file tree and key files from ProjectPath, run all 6 domain expert passes (with QA validation after each), and deliver the architecture report. Write the report to ReportsFolder using write_to_file. If the spec file or ProjectPath is not accessible/readable, stop with AccessError and instruct me to provide a readable path, then re-run.`,

  production: (promptPath, repoPath, reportsPath) => `Read and follow the production readiness audit spec at "${promptPath}".
After reading, reply with this confirmation:
- SpecTitle: "AI Production Readiness Audit Mixture-of-Experts Orchestration Prompt"
- Version: 1.0.0
- ExpertsRoster: [Performance & Resource Efficiency, Reliability & Error Handling, Operational Resilience, Configuration & 12-Factor, Maintainability & CI/CD, Quality Assurance & Validation (runs after each expert)]
- Anti-Hallucination Protocol: Enabled (all findings must cite specific files/lines; assumptions explicitly marked)

Parameters:
- ProjectPath: ${repoPath}
- ReportsFolder: ${reportsPath}
- IncludeGlobs: ["**/*"]
- ExcludeGlobs: [".git/**", "node_modules/**", "**/dist/**", "**/build/**", "**/*.png", "**/*.jpg", "**/*.zip", "**/*.exe"]

Then run the MoE flow per the spec. Scan the project structure, identify key files, run all 5 expert analysis passes, and deliver the production readiness report. Write the report to ReportsFolder using write_to_file. If the spec file or ProjectPath is not accessible/readable, stop with AccessError.`,
};

/**
 * Generate the complete bootstrap prompt for a given audit configuration
 * @param {Object} auditType - The audit type configuration object
 * @param {string} codebasePath - Path to the codebase to audit
 * @param {string} reportsPath - Path where reports should be saved
 * @param {string} auditsBasePath - Base path where audit prompt files are located
 * @returns {string} The complete bootstrap prompt
 */
export function generateBootstrapPrompt(auditType, codebasePath, reportsPath, auditsBasePath) {
  if (!auditType || !codebasePath || !reportsPath) return '';
  
  const promptPath = `${auditsBasePath}\\${auditType.promptFile}`;
  const template = PROMPT_TEMPLATES[auditType.id];
  
  if (!template) return '';
  
  return template(promptPath, codebasePath, reportsPath);
}
