# AI Audit Prompts — Trust No Code

A collection of Mixture-of-Experts (MoE) orchestration prompts for comprehensive codebase analysis. These prompts help you conduct thorough security audits and architectural reviews without executing any code.

**⚡ New to these audits? See [QUICKSTART.md](./QUICKSTART.md) for copy-paste examples.**

## Available Audits

### Security Audit
[AI_SECURITY_AUDIT_PROMPT.md](./AI_SECURITY_AUDIT_PROMPT.md) version 1.1.2 — An offline, evidence-first security audit that detects backdoors, secrets, risky client patterns, and third‑party tracking with anti-hallucination validation.

### Architecture Audit
[AI_ARCHITECTURE_AUDIT_PROMPT.md](./AI_ARCHITECTURE_AUDIT_PROMPT.md) version 1.0.0 — An iterative architecture review that analyzes layering, domain modeling, component structure, type safety, and testability to produce actionable refactoring roadmaps.

### Production Readiness Audit
[AI_PRODUCTION_AUDIT_PROMPT.md](./AI_PRODUCTION_AUDIT_PROMPT.md) version 1.0.0 — A production deployment readiness assessment that evaluates performance, reliability, operational resilience, configuration management, and CI/CD maturity to identify launch blockers and hardening priorities.

## Active Audits

### Nexus Platform - Production Readiness
- **Bootstrap File:** [bootstrap_ai_production_nexus.md](./bootstrap_ai_production_nexus.md)
- **Audit Type:** Production Readiness Assessment
- **Project:** Nexus Platform Complete (2025-11-18)
- **Project Path:** `b:\Dev\CrimsonStark\Nexus-Platform-Complete-2025-11-18`
- **Reports Folder:** `b:\Dev\reports`
- **Status:** ✅ Completed (2025-11-24)
- **Report:** `b:\Dev\reports\Production_Readiness_Report_2025-11-24.md`
- **Key Finding:** Needs Hardening (3.2/5.0) - 3 critical blockers identified

### Nexus Platform - Architecture Audit
- **Bootstrap File:** [bootstrap_ai_architecture_nexus.md](./bootstrap_ai_architecture_nexus.md)
- **Audit Type:** Architecture Review & Refactoring Roadmap
- **Project:** Nexus Platform Complete (2025-11-18)
- **Project Path:** `b:\Dev\CrimsonStark\Nexus-Platform-Complete-2025-11-18`
- **Reports Folder:** `b:\Dev\reports`
- **Status:** ✅ Completed (2025-11-24)
- **Report:** `b:\Dev\reports\Architecture_Audit_Report_2025-11-24.md`
- **Key Finding:** C+ Grade (2.8/5.0) - God component, flat structure, needs refactoring

### Nexus Platform - Security Audit
- **Bootstrap File:** [bootstrap_ai_security_nexus.md](./bootstrap_ai_security_nexus.md)
- **Audit Type:** Offline Security Audit (Read-Only, Evidence-Based)
- **Project:** Nexus Platform Complete (2025-11-18)
- **Repository Path:** `b:\Dev\CrimsonStark\Nexus-Platform-Complete-2025-11-18`
- **Reports Folder:** `b:\Dev\reports`
- **Status:** ✅ Completed (2025-11-24)
- **Reports:** `Security & Architecture.md` + `security_findings.json`
- **Key Finding:** HIGH RISK - 3 critical issues (hardcoded secrets, DB credentials, weak JWT)

## Why "Trust No Code"
- Never execute untrusted code; assume all code can be malicious until proven otherwise.
- Run audits on a local snapshot with network access disabled.
- Produce evidence-first, reproducible findings mapped to controls and regulations.
- Post-flight verification ensures reports are always written successfully to disk.

## Features

### Security Audit
- **Anti-hallucination protocol:** Quality Assurance expert validates security findings to ensure evidence-based threat detection.
- Offline only, read-only workflow (no code execution, no network calls).
- Mixture-of-Experts pipeline:
  1. Repository Mapper
  2. Static Threat Hunter
  3. Secrets & Config Analyst
  4. Client Security Analyst
  5. Network & Telemetry Analyst
  6. Forensics & Provenance Analyst
  7. Compliance & Controls Mapper
  8. Deduplicator & Scoring
  9. Remediation Planner
  10. Report Writer
  11. **Quality Assurance & Validation** (runs after detection experts 2-6)
- **Quality Assurance & Validation Expert** validates critical security findings to:
  - Verify all findings cite specific file paths and line numbers
  - Ensure IOCs (domains, IPs, URLs, ports) are extracted from code, not invented
  - Validate severity/confidence scores based on observable evidence
  - Distinguish facts from assumptions in security findings
  - Flag and correct hallucinated vulnerabilities or IOCs
  - Mark incomplete evidence as "requires manual verification"
- Shared evidence format with severity and confidence.
- Deterministic ordering and critical gating.
- Examples and Third‑Party Tracking Detection Checklist.
- Purpose‑first report: begins with an Application Purpose & Intended Use Summary derived from repo metadata to flag unexpected inclusions.
- All security findings are evidence-based with explicit file/line citations.
- **Post-flight verification:** Confirms both Markdown and JSON reports written successfully with file paths and sizes.

### Architecture Audit
- **Anti-hallucination protocol:** Quality Assurance expert validates findings after each pass to ensure evidence-based conclusions.
- Iterative expert analysis across six specialized domains:
  1. Layering & Structure Expert
  2. Domain Modeling & Services Expert
  3. UI & Components Expert
  4. Types & Contracts Expert
  5. Testing & Testability Expert
  6. Refactoring Strategy & Integration Expert
- **Quality Assurance & Validation Expert** runs after each domain expert to:
  - Verify all claims cite specific files/directories from provided data
  - Distinguish facts from assumptions
  - Ensure scores are justified with concrete examples
  - Flag and correct any hallucinated content
  - Maintain cross-expert consistency
- Cumulative reporting: each expert builds on and refines previous findings.
- Comprehensive scorecard with 7 architecture quality metrics (1-5 stars).
- Phased refactor roadmap (High Impact/Low Risk → Medium Term → Long Term).
- Before/After refactor examples with concrete implementation guidance.
- Scalability assessment and reusable code percentage estimates.
- All findings are evidence-based with explicit citations; assumptions clearly marked.
- **Post-flight verification:** Confirms report written with all 6 expert sections and scorecard complete.

### Production Readiness Audit
- **Anti-hallucination protocol:** Quality Assurance expert validates findings after each pass to ensure evidence-based conclusions.
- Mixture-of-Experts pipeline across five production domains:
  1. Performance & Resource Efficiency Expert
  2. Reliability & Error Handling Expert
  3. Operational Resilience Expert
  4. Configuration & 12-Factor Expert
  5. Maintainability & CI/CD Expert
- **Quality Assurance & Validation Expert** validates each expert's findings to:
  - Verify all findings cite specific files/lines from the codebase
  - Confirm existence of claimed issues (e.g., missing dependencies in package.json)
  - Filter out generic advice not applicable to the project's tech stack
  - Mark assumptions explicitly when code is not fully visible
- Production readiness scorecard with 5 key metrics (1-5 stars).
- Identifies critical launch blockers vs post-launch optimizations.
- Phased hardening roadmap (Pre-Launch Blockers → Post-Launch → Scale-Up).
- Focuses on real-world deployment concerns: database N+1 queries, missing rate limiting, lack of health checks, hardcoded configs, memory leaks.
- Overall readiness grade: Production Ready / Needs Hardening / Prototype Only.
- All findings are evidence-based with explicit file/line citations.
- **Post-flight verification:** Confirms report written with all 5 expert sections and scorecard complete.

## Quickstart

### Security Audit
1) Prepare an offline snapshot of the repository (ZIP export or git archive). Include `.git` only if you want commit/provenance checks.
2) Choose a reports folder outside the repo (to avoid accidental commits).
3) Open `AI_SECURITY_AUDIT_PROMPT.md` in your IDE/agent and follow the Bootstrap section.

### Architecture Audit
1) Open `AI_ARCHITECTURE_AUDIT_PROMPT.md` in your IDE/agent.
2) Copy the **Bootstrap prompt** from the top of the file.
3) Replace `<PROMPT_FILE_PATH>` with the path to the audit file.
4) Replace `<PROJECT_ROOT_ABSOLUTE_PATH>` with your project path.
5) (Optional) Replace `<REPORTS_FOLDER_ABSOLUTE_PATH>` or omit for inline report.
6) Submit to your AI assistant — it will automatically:
   - Echo confirmation with version and experts roster
   - Scan and generate the file tree
   - Identify key files for analysis
   - Extract representative code snippets
   - Run all 6 expert analysis passes
   - Deliver the comprehensive architecture report

**Manual Mode:** If you prefer, you can manually provide `{{FILE_TREE_OR_STRUCTURE}}` and `{{KEY_FILES_OR_SNIPPETS}}` instead of using ProjectPath.

### Production Readiness Audit
1) Open `AI_PRODUCTION_AUDIT_PROMPT.md` in your IDE/agent.
2) Copy the **Bootstrap prompt** from the file.
3) Replace `<PROMPT_FILE_PATH>` with the path to the audit file.
4) Replace `<PROJECT_ROOT_ABSOLUTE_PATH>` with your project path.
5) (Optional) Replace `<REPORTS_FOLDER_ABSOLUTE_PATH>` or omit for inline report.
6) Submit to your AI assistant — it will automatically:
   - Echo confirmation with version and experts roster
   - Scan the project structure
   - Identify key production-related files (configs, dockerfiles, error handlers, build scripts)
   - Run all 5 expert analysis passes
   - Deliver the comprehensive production readiness report with critical launch blockers

---

## Invocation Parameters

### Architecture Audit — Parameters Template
```yaml
ProjectPath: /absolute/path/to/project-root
ReportsFolder: /absolute/path/to/reports  # optional: omit for inline report
IncludeGlobs: ["**/*"]
ExcludeGlobs: [".git/**", "node_modules/**", "**/dist/**", "**/build/**", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.webp", "**/*.ico", "**/*.zip", "**/*.exe", "**/*.dll", "**/*.so"]
MaxFileSizeMB: 2
```

**Preflight access check:**
- Spec file readable.
- ProjectPath exists and is readable.
- ReportsFolder (if specified) exists or is creatable and writable.

### Production Readiness Audit — Parameters Template
```yaml
ProjectPath: /absolute/path/to/project-root
ReportsFolder: /absolute/path/to/reports  # optional: omit for inline report
IncludeGlobs: ["**/*"]
ExcludeGlobs: [".git/**", "node_modules/**", "**/dist/**", "**/build/**", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.webp", "**/*.ico", "**/*.zip", "**/*.exe", "**/*.dll", "**/*.so"]
MaxFileSizeMB: 2
```

**Preflight access check:**
- Spec file readable.
- ProjectPath exists and is readable.
- ReportsFolder (if specified) exists or is creatable and writable.

### Security Audit — Parameters Template
```yaml
RepositoryPath: /absolute/path/to/repo-root
ReportsFolder: /absolute/path/to/reports
IncludeGlobs: ["**/*"]
ExcludeGlobs: [".git/**", "node_modules/**", "**/dist/**", "**/build/**", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.webp", "**/*.ico", "**/*.zip", "**/*.exe", "**/*.dll", "**/*.so"]
MaxFileSizeMB: 2
BinaryExtensions: [".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".zip", ".exe", ".dll", ".so"]
RuntimeMode: offline
GitMetadata: auto
```

**Preflight access check:**
- Spec file readable.
- RepositoryPath exists and is readable.
- ReportsFolder exists or is creatable and writable.
- `.git` metadata optional; mark "not available" if missing.

## Outputs

### Security Audit
- `Security & Architecture.md` — human-readable executive report.
- `security_findings.json` — machine-readable findings.
  - Note: The report begins with an Application Purpose & Intended Use Summary.

### Architecture Audit
- Comprehensive architecture report including:
  - Executive Summary with overall grade
  - 7-metric scorecard (⭐ 1-5 ratings)
  - Detailed findings by area (Layering, Domain, UI, Types, Testing)
  - Phased refactor roadmap (High/Medium/Long-term priorities)
  - Before/After refactor examples
  - Scalability assessment and reusability estimates

### Production Readiness Audit
- `Production_Readiness_Report_YYYY-MM-DD.md` — comprehensive production deployment assessment.
- Report includes:
  - Executive Summary with overall readiness grade (Production Ready / Needs Hardening / Prototype Only)
  - Top 3 critical launch blockers
  - 5-metric production readiness scorecard (⭐ 1-5 ratings): Performance, Reliability, Resilience, Configuration, Maintainability
  - Detailed findings by expert area:
    - Performance & Resource Efficiency (N+1 queries, bundle sizes, memory leaks)
    - Reliability & Error Handling (error boundaries, logging, health checks)
    - Operational Resilience (rate limiting, timeouts, circuit breakers)
    - Configuration & 12-Factor (env vars, secrets management, feature flags)
    - Maintainability & CI/CD (dependency management, linting, build pipeline)
  - Phased hardening roadmap:
    - Phase 1: Pre-Launch Blockers (Must Fix)
    - Phase 2: Post-Launch Optimization (Nice to Have)
    - Phase 3: Scale-Up Architecture (Long Term)

## Security Audit — Evidence Format
```json
{
  "id": "F-###",
  "title": "...",
  "severity": "Critical|High|Medium|Low",
  "confidence": 0.0,
  "evidence": [{"path": "...", "lines": "n–m", "snippet": "(redacted)"}],
  "rationale": "...",
  "rules": ["RULE-..."],
  "iocs": ["domain", "port", "url"],
  "mappings": {"AU": [], "EU": [], "US": [], "ISO27001": [], "NIST80053": [], "NIST800171": [], "SOC2": []}
}
```

## Educational goals
- Help teams audit AI‑assisted and fast‑paced "vibe coding" projects responsibly.
- **Security:** Encourage secure defaults, secret hygiene, safe client patterns, and consent-gated telemetry.
- **Architecture:** Promote clean layering, domain-driven design, type safety, and testable code structures.
- Foster iterative improvement through expert-guided analysis and actionable refactoring roadmaps.

## Contributing
- Use SemVer and Keep a Changelog.
- Propose new detection rules, mappings, or examples via PRs.
- Keep outputs deterministic and redact secrets in all snippets.

## Security
- Do not run code from untrusted repositories.
- Keep network access disabled during audits.
- Treat any Critical finding as “Do Not Run” and follow Track A eradication guidance.

## License
 This project is licensed under the MIT License. See LICENSE for details.

## Changelog
See [CHANGELOG.md](./CHANGELOG.md).
