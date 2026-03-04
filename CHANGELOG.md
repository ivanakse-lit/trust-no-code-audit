# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.4.0] — 2026-03-04

### Added
- **Security Audit Expert 13: Prompt Injection & LLM Security Analyst** (`AI_SECURITY_AUDIT_PROMPT.md` v1.4.0): New expert dedicated to detecting prompt injection vulnerabilities in AI-enabled applications, derived from real-world three-layer defense patterns.
  - **The Lethal Trifecta (Critical Pattern):** Detects applications that simultaneously ingest untrusted external content, have tool access, and expose exfiltration vectors — auto-Critical severity when all three are present.
  - **7 Detection Categories:**
    1. The Lethal Trifecta (Critical) — untrusted content ingestion + tool access + exfiltration vectors
    2. Missing Prompt Sanitization Layer — no regex injection-phrase detection, no markdown/XML escaping, no `[FLAGGED:*]` marking
    3. Missing XML Trust Boundaries — no `<external_data trust="untrusted">` wrapping; instructions placed before data instead of after (recency bias)
    4. Missing or Weak LLM Guard Pre-Filter — no cheap single-turn pre-flight check; guard defaults to "pass" on malformed response instead of fail-safe "suspicious"
    5. Fail-Open Access Controls — empty allowlist defaults to allow-all instead of block-all
    6. Unprotected System Prompt / Configuration Files — no PreToolUse hook blocking writes to critical config files
    7. Chain Attack Vectors — injected content in logs/memory without escaping trust boundary delimiters
  - **Detection Signals:** LLM API call sites combined with external data ingestion, direct string interpolation into prompts, fail-open allowlist patterns, absent pre-flight guard, log functions missing trust boundary delimiter escaping.
  - **7 Annotated Code Examples** (Bad/Good pairs): Lethal Trifecta, missing sanitization, missing XML trust boundary, fail-open allowlist, missing LLM guard, fail-open guard, chain attack via log injection, unprotected config file.
  - **Prompt Injection Defense Checklist** (12 items): Parallel to existing AI-threat and tracking checklists, covers all seven detection categories.
  - Expert 13 added to QA validation scope — runs after Expert 13 to validate all prompt injection findings.
  - Execution Flow updated with Step 6.7 for Expert 13.
  - All version references and ExpertsRoster updated throughout the spec.
- **SECOND-BRAIN-SECURITY.md**: New reference document describing a real-world three-layer prompt injection defense system for AI agents with tool access. Documents the "Lethal Trifecta" concept, deterministic sanitization with `[FLAGGED:*]` markers, XML trust boundaries with recency-bias placement, LLM guard pre-filter with fail-safe defaults, fail-closed allowlists, SOUL.md protection hooks, daily log sanitization, and bash command blocking.
- **Production Readiness Audit** (`AI_PRODUCTION_AUDIT_PROMPT.md` v1.0.0): New Mixture-of-Experts prompt for production deployment readiness assessment.
  - **Anti-Hallucination Protocol:** Comprehensive validation system to prevent AI hallucinations and ensure evidence-based findings.
  - **Quality Assurance & Validation Expert:** Sixth expert that runs after each of the 5 domain experts to validate findings in real-time.
  - Five specialized domain expert personas: Performance & Resource Efficiency, Reliability & Error Handling, Operational Resilience, Configuration & 12-Factor, Maintainability & CI/CD.
  - Production readiness scorecard with 5 key metrics rated 1–5 stars.
  - Overall readiness grade: Production Ready / Needs Hardening / Prototype Only.
  - Phased hardening roadmap: Pre-Launch Blockers → Post-Launch Optimization → Scale-Up Architecture.
  - Post-flight verification confirms report written with all 5 expert sections and scorecard complete.
- **Architecture Audit — Deep-Dive Requirements:** Transformed audit from file-tree analysis to comprehensive code review requiring minimum 20–30 files read before making claims.
  - Analysis Coverage & Limitations section now required in all reports with file counts, coverage percentages, confidence levels, and time estimate caveats.
  - Project Structure section (file tree with visual indicators) now mandatory in all architecture reports.
  - QA Validation updated with Depth Verification check (#6).
- **Post-Flight Verification:** All audits now include mandatory verification after report generation — confirms files exist, sizes are non-zero, and finding counts are reported.
- **Security Audit v1.1.2:** Added Quality Assurance & Validation expert (Expert 11) with anti-hallucination protocol for security findings; validates IOCs, file citations, and severity scores after each detection expert (2–6).
- **QUICKSTART.md**: New quick-start guide with copy-paste examples for Security, Architecture, and Production Readiness audits, troubleshooting tips, and workflow optimisation.
- **Architecture Audit** (`AI_ARCHITECTURE_AUDIT_PROMPT.md` v1.0.0): New Mixture-of-Experts prompt for iterative architecture review with 6 domain experts, 7-metric scorecard, phased refactor roadmap, before/after examples, and cumulative QA validation.

### Changed
- Security audit version bumped 1.3.0 → 1.4.0; all internal version references and ExpertsRoster updated.
- QA validation scope updated to `(2-6, 12, 13)` across all version references.
- Updated README to reflect Security Audit v1.4.0, Expert 13, and prompt injection detection features.
- Updated README to reflect multiple audit types (Security, Architecture, Production Readiness).
- Expanded educational goals to cover security, architecture, and production deployment best practices.

## [1.1.1] — 2025-11-09
### Added
- Purpose-first report section: "Application Purpose & Intended Use Summary" now appears at the top of the report, with cited evidence and uncertainty notes.
- Repository Mapper now infers application purpose and intended use from repo metadata (README, manifests, top-level docs) and records evidence.
### Changed
- Spec version bumped to 1.1.1; README updated to reflect purpose-first behavior and outputs.

## 1.1.0 — 2025-11-09
### Added
- Public open-source release of the AI Security Audit Mixture-of-Experts orchestration prompt.
- Experts roster and orchestrated offline flow with deterministic ordering.
- Shared evidence format (severity, confidence, redacted snippets).
- Critical gating for active malware/backdoor findings.
- Examples and Third‑Party Tracking Detection Checklist.
- Deliverables: `Security & Architecture.md` and `security_findings.json`.
- Preflight access checks and default Include/Exclude globs.
