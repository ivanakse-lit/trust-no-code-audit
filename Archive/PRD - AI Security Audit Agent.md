# PRD — AI Security Audit Agent

Document version: 0.1 (Draft)
Owner: Security Engineering
Date: 2025-11-08
Status: Draft for review

---

## 1. Overview

### 1.1 Product Vision
An automated AI agent that performs read-only, static security audits on full‑stack repositories (backend + frontend + infra config) and generates a comprehensive Security & Architecture report without running any code.

### 1.2 Problem Statement
Security reviews are slow, inconsistent, and require deep domain expertise across stacks. Teams need a fast, explainable audit that highlights risks, evidence, and actionable remediation without executing untrusted code.

### 1.3 Goals
- Produce a structured security report that mirrors the internal template in `Security & Architecture.md`.
- Analyze codebases read-only (no execution, no dependency install, no build) and surface risks with evidence.
- Map findings to Australian regulations (Privacy Act, APPs, NDB) and ACSC Essential Eight.
- Provide prioritized, actionable recommendations with business impact framing.

### 1.4 Non-Goals
- No dynamic/runtime analysis, scanning live environments, or penetration testing.
- No code fixes, refactors, or auto-commits to target repos.
- No automatic contacting of third parties or authorities.
- No storage of customer code outside approved boundaries.

---

## 2. Users & Stakeholders
- Security Engineers: triage findings and plan remediation.
- Engineering Managers/CTO: assess risk, prioritize work, report to leadership.
- Compliance/Legal: verify APPs/NDB alignment and audit trail.
- External auditors/consultants: use standardized output for assurance.

---

## 3. Success Metrics (V1)
- Coverage: ≥95% of repo files scanned (non-binary, non-ignored).
- Findings precision: ≥80% precision for Critical/High categories (measured on benchmark repos).
- Time to first report: ≤5 minutes for repos ≤1000 files.
- Report completeness: 100% required sections present (see §7).
- Explainability: Each finding includes location, snippet, rule/rationale, and confidence score.

---

## 4. Assumptions & Constraints
- Input is a Git repository (local path or remote clone) accessible read-only.
- No code execution or network calls to untrusted endpoints during analysis.
- Language focus (V1): JavaScript/TypeScript (Node/React), Python (FastAPI/Django/Flask), HTML/CSS, JSON/YAML/TOML, shell scripts; generic patterns for others.
- Large repos may require batched scanning; memory/time limits apply.

---

## 5. High-Level Capabilities (V1)
- Repo ingestion: enumerate files respecting .gitignore and common binary filters.
- Static analysis detectors:
  - Secrets/credentials, tokens, keys.
  - Dynamic code execution and command execution (e.g., eval/exec/subprocess/child_process).
  - Obfuscation and payload indicators (base64 blobs, wasm, crypto misuse).
  - Networking and telemetry (domains, analytics, session replay, beacons).
  - Config and env handling (secrets in code, weak defaults, permissive CORS).
  - Client storage (localStorage/sessionStorage/cookies) and auth token handling.
  - Git hooks and dev-time tooling with write/exec capabilities.
  - Dependency manifests and risk notes (no external queries in V1).
- Evidence extraction: path, line ranges, minimal snippet, rule hit(s).
- Report generation conforming to the canonical template (see §7).

---

## 6. Constraints & Trust/Safety
- Read-only access to the repo filesystem.
- No execution of code; no package install/build.
- Offline by default; optional online lookups gated behind settings.
- PII minimization in outputs; redact secrets by default.
- Deterministic output for the same inputs and ruleset.

---

## 7. Canonical Report Contract (Output Spec)
The agent MUST produce a Markdown report matching the internal template used in `Security & Architecture.md` with the following sections at minimum:
- Executive Summary
- Application Architecture Overview
- Security Assessment (incl. authentication, data security, dependencies)
- Privacy & Compliance (AU focus: Privacy Act 1988, APPs, NDB; ACSC Essential Eight)
- Findings & Recommendations (prioritized)
- Risk Assessment Matrix (Critical/High/Medium/Low)
- Cost-Benefit Analysis (where applicable)
- Implementation Roadmap
- Appendices
  - Code snippets with file/line references
  - Regulatory mappings (APPs/ACSC) for each high-severity finding
  - Methodology and detector catalog

The agent should use the existing `Security & Architecture.md` as a style/structure reference when present; otherwise, it must generate the same structure from its internal template.

---

## 8. Interfaces (V1)
- CLI/API input: path to repo, optional config (e.g., enable AU compliance mapping, redaction rules).
- Output: Markdown file `Security & Architecture.md` at repo root (or configured path), plus a JSON summary of findings (machine-readable).

---

## 9. Risks & Mitigations
- False positives on generic patterns → multi-signal rules and confidence scoring.
- Over-reporting minor issues → severity calibration and deduplication.
- Sensitive data exposure in report → redaction and snippet bounding.
- Large repos/timeouts → streaming/partitioned scanning.

---

## 10. Open Questions
- Which additional languages to prioritize after V1?
- Optional online enrichment (e.g., CVE lookups) for V2?
- Custom organization policies and allow/deny lists?

---

## 12. Functional Requirements (V1)

FR1. Repository Ingestion
- Read repository files with .gitignore and binary filters respected
- Inputs: local path or previously cloned repo; read-only access

FR2. Language-Aware Static Analysis
- Parse and scan JS/TS, Python, HTML, JSON/YAML/TOML, shell scripts
- Graceful fallback to text rules for unknown languages

FR3. Detector Categories
- Secrets/credentials/tokens/keys
- Dynamic and command execution (eval/exec/subprocess/child_process)
- Obfuscation/payload indicators (base64 blobs, packed code, wasm)
- Networking/telemetry (external URLs, analytics, tracking, beacons)
- Config/env issues (weak defaults, hardcoded secrets, permissive CORS)
- Client storage/auth (localStorage/sessionStorage/cookies handling)
- Git hooks/dev scripts with write/exec (e.g., execSync, pre-commit)
- Dependency manifests (note risks, no external queries in V1)

FR4. Evidence Extraction
- Capture path, language, line ranges, minimal snippet, rule IDs
- Redact secrets in snippets by default (masking tokens/keys)

FR5. Regulatory Mapping (Australia)
- Map Critical/High findings to APPs (Privacy Act 1988), NDB Scheme
- Map to ACSC Essential Eight and ISM controls where applicable

FR6. Risk Scoring & Confidence
- Assign severity (Critical/High/Medium/Low) and confidence (0–1)
- Provide rationale: matched rules, context signals

FR7. Report Generation (Markdown)
- Emit `Security & Architecture.md` matching canonical template (§7)
- Include code snippets, file/line refs, and regulatory mapping

FR8. JSON Findings Export
- Machine-readable JSON with normalized fields for integration

FR9. Determinism & Offline Mode
- Same inputs/rules produce identical outputs
- Operate fully offline by default (no external calls)

FR10. Configuration
- CLI flags or config file to enable/disable detectors and redaction
- Region setting for compliance focus (AU by default in V1)

User Stories
- As a Security Engineer, I want prioritized findings with evidence so I can triage quickly.
- As an Engineering Manager, I want an executive summary and risk matrix so I can plan remediation.
- As Legal/Compliance, I want APP/NDB/ACSC mapping so I can assess obligations.
- As an Auditor, I want deterministic reports and an audit trail of rules.

Acceptance (V1)
- Produces complete report sections (per §7) for repos ≤1000 files in ≤5 minutes.
- Critical/High findings include snippet, location, rule rationale, APP/ACSC mapping, and recommendation.
- Operates without running code or installing dependencies.

---

## 13. System Architecture & Workflow

Components
- Orchestrator: coordinates scanning, aggregation, and report generation.
- Repo Reader: enumerates files, respects .gitignore and binary filters.
- Language Plugins: JS/TS, Python, markup/config parsers (graceful fallback to text scan).
- Detector Engine: rule/risk evaluation, multi-signal correlation, confidence scoring.
- Policy & Regulatory Mapper: maps findings to APPs, NDB, ACSC/ISM.
- Evidence Store (in-memory): normalized finding objects with redacted snippets.
- Report Generator: Markdown report + JSON summary output.
- Config & Redaction: controls for detectors, region, redaction, and output paths.

Workflow
1) Initialize with repo path and configuration.
2) Enumerate files; filter by size/type; batch for performance.
3) Parse language-aware where supported; otherwise text scan.
4) Apply detector rules; collect evidence and context features.
5) Score severity/confidence; map to APPs/NDB/ACSC; deduplicate.
6) Generate Markdown report aligned to `Security & Architecture.md` template.
7) Emit JSON findings and exit with non-zero code if Critical/High present (optional).

Trust & Safety
- Strictly read-only; no code execution, builds, or outbound network calls.
- Redact secrets/tokens; configurable retention for local-only storage.
- Deterministic ordering for reproducibility.

Extensibility
- Pluggable detectors and regional mappings (e.g., GDPR/CCPA in future).
- Plugin API for custom organization rules and allow/deny lists.

---

## 14. Detection Catalog (V1)

Secrets & Credentials
- Patterns: API keys, tokens, private keys (e.g., `BEGIN RSA PRIVATE KEY`, `AKIA`, `phc_`), `x-api-key`, `Authorization` headers, Stripe/Square identifiers
- Risks: APP 11 (security), NDB trigger on breach

Dynamic/Command Execution
- JS: `eval`, `Function`, `child_process.exec/execSync/spawn`
- Python: `eval`, `exec`, `__import__`, `subprocess.*`, `os.system`
- Risks: Remote code execution vectors, supply-chain abuse

Obfuscation/Payload Indicators
- Large base64 blobs, hex-encoded payloads, wasm modules without justification
- Risks: Hidden data exfiltration or malicious payloads

Networking/Telemetry/Tracking
- External domains in scripts/configs; analytics (e.g., PostHog), session replay (rrweb)
- Cross-border disclosure (APP 8), collection without consent (APP 3/5/6/11)

Config & Environment
- Hardcoded secrets, weak defaults (e.g., JWT fallback), permissive CORS (`*`), long-lived tokens
- Risks: APP 11 security failures; ACSC Essential Eight nonconformance

Client Storage & Auth
- `localStorage`/`sessionStorage` for tokens; non-httpOnly cookies
- Risks: XSS token theft (APP 11); recommend httpOnly + SameSite

Git Hooks & Dev Tooling
- Scripts with write/exec (e.g., `execSync` git commands), unprotected endpoints
- Risks: Unauthorized modification; ensure disabled in production

Dependencies (Manifests Only in V1)
- Note high-risk packages or unusual sources; no CVE lookups in offline mode

Evidence & Redaction
- Provide minimal surrounding lines; mask secrets by default; reference file paths and line ranges

---

## 15. Report Specification Details

Structure and Required Content
- Executive Summary: key risks, affected areas, top recommendations, effort/cost bands
- Application Architecture Overview: stack summary, data flows, external services
- Security Assessment: auth, data security, secrets handling, dependencies, config
- Privacy & Compliance (AU): APPs, NDB, ACSC mapping, cross-border data flows
- Findings & Recommendations: each finding with severity, confidence, evidence, fix
- Risk Assessment Matrix: likelihood vs impact, per category
- Cost-Benefit Analysis: remediation costs vs risk reduction
- Implementation Roadmap: phases, milestones, owners
- Appendices: code snippets with file/line refs, detector catalog, regulatory mapping

Field-Level Requirements for Each Finding
- id, title, severity, confidence, category, file path(s), line ranges
- snippet (redacted), rule(s) matched, rationale, regulatory mapping (APP/ACSC)
- business impact, remediation steps, references, related findings (dedup link)

Output Artifacts
- Markdown report at repo root: `Security & Architecture.md`
- JSON findings file: `security_findings.json`

---

## 16. Risk Scoring Model

Severity Levels
- Critical: Immediate action; severe business/regulatory risk; active data exposure
- High: Action within sprint; material risk; exploitable without complex preconditions
- Medium: Action within quarter; moderate risk or compensating controls exist
- Low: Informational or weak signal; track and monitor

Scoring Formula (0–100)
- Score = 0.35*Impact + 0.25*Likelihood + 0.20*Exploitability + 0.20*RegulatoryExposure
- Impact: data sensitivity, scope, privilege required
- Likelihood: prevalence in repo, pattern strength, historical frequency
- Exploitability: ease of exploitation, preconditions, required access
- RegulatoryExposure: APP 6/8/11, NDB trigger potential, cross-border flows

Confidence (0.0–1.0)
- Derived from number and strength of matched signals, language parser quality, and context

Deduplication & Correlation
- Group similar hits (same root cause) and present consolidated remediation

---

## 17. Non-Functional Requirements

Performance
- ≤5 minutes for ≤1000 files; progressive output for larger repos

Reliability & Determinism
- Same inputs/rules yield identical outputs; stable ordering

Security & Privacy
- Read-only; no execution; redaction on by default; local processing by default

Explainability
- Every finding includes rules hit, snippet, rationale, and mapping to standards

Maintainability
- Modular detectors; plugin API; rule packs versioned and testable

Configurability
- Enable/disable detectors; region presets; redaction policies; output paths

---

## 18. Acceptance Criteria & Test Plan (TDD)

Unit Tests
- Detector suites with positive/negative fixtures per rule
- Redaction tests to ensure secrets masked consistently

Contract Tests
- Golden Markdown report comparison against canonical template
- JSON schema validation for findings export

Determinism Tests
- Repeat scans produce identical outputs (hash compare)

Performance Tests
- Repos of 1k/5k/20k files complete within target thresholds

Compliance Mapping Tests
- APP/ACSC mappings present for Critical/High findings

Coverage Targets
- Detector rule coverage ≥90%; branch coverage ≥80%

---

## 19. Implementation Roadmap

Phase 1 — MVP (4 weeks)
- Repo reader, core detectors (secrets, exec, tracking, config), AU mappings
- Markdown report + JSON findings; determinism and redaction

Phase 2 — Enrichment (4–6 weeks)
- Expanded language support; correlation/dedup; cost-benefit estimation
- CORS/auth/storage hardening heuristics; improved confidence scoring

Phase 3 — Enterprise (6–8 weeks)
- Plugin API, organization policies, region presets (GDPR/CCPA)
- CLI/SDK integration, batch reports, dashboards (out of scope for V1 UI)

Milestones
- M1: First full report on benchmark repos
- M2: Precision ≥80% for Critical/High on gold set
- M3: Deterministic builds and signed rule packs

---

## 20. Appendices

Appendix A — Prompt Template (Internal)
- Objective: "Perform read-only static audit. Do not execute code."
- Constraints: offline by default; redact secrets; deterministic ordering
- Output: Markdown report + JSON; use `Security & Architecture.md` structure

Appendix B — Example Rule Patterns
- Secrets: generic API key regex, RSA private key headers, provider-specific prefixes
- Exec: `eval`, `exec`, `child_process.execSync`, `subprocess.Popen`
- Tracking: known analytics domains (PostHog), session replay (rrweb)
- Config: JWT default keys, wildcard CORS, long-lived tokens

Appendix C — Sample Report Outline
- Section headings with brief placeholders to validate structure

Appendix D — Regulatory Mapping (AU)
- APP 3/5/6/8/11 examples; ACSC Essential Eight references

Appendix E — Config Schema (YAML)
- detectors, region, redaction, output, performance knobs

---

## 11. Document Control
- Version 0.1 — PRD skeleton created; to be expanded in subsequent sections.
- Version 0.2 — Added Functional Requirements, System Architecture & Workflow, and Detection Catalog (V1).
- Version 0.3 — Added Report Specification, Risk Scoring, Non-Functional Requirements, Acceptance Criteria & Test Plan, Roadmap, and Appendices.
