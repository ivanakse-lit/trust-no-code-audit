# AI Audit Prompts — Trust No Code

A collection of Mixture-of-Experts (MoE) orchestration prompts for comprehensive codebase analysis. These prompts help you conduct thorough security audits and architectural reviews without executing any code.

**⚡ New to these audits? See [QUICKSTART.md](./QUICKSTART.md) for copy-paste examples.**

## Available Audits

### Security Audit
[AI_SECURITY_AUDIT_PROMPT.md](./AI_SECURITY_AUDIT_PROMPT.md) version 1.1.2 — An offline, evidence-first security audit that detects backdoors, secrets, risky client patterns, and third‑party tracking with anti-hallucination validation.

### Architecture Audit
[AI_ARCHITECTURE_AUDIT_PROMPT.md](./AI_ARCHITECTURE_AUDIT_PROMPT.md) version 1.0.0 — An iterative architecture review that analyzes layering, domain modeling, component structure, type safety, and testability to produce actionable refactoring roadmaps.

## Why "Trust No Code"
- Never execute untrusted code; assume all code can be malicious until proven otherwise.
- Run audits on a local snapshot with network access disabled.
- Produce evidence-first, reproducible findings mapped to controls and regulations.

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
