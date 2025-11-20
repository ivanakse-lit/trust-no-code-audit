# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Production Readiness Audit** (`AI_PRODUCTION_AUDIT_PROMPT.md` v1.0.0): New Mixture-of-Experts prompt for production deployment readiness assessment.
  - **Anti-Hallucination Protocol:** Comprehensive validation system to prevent AI hallucinations and ensure evidence-based findings.
  - **Quality Assurance & Validation Expert:** Sixth expert that runs after each of the 5 domain experts to validate findings in real-time.
    - Verifies all findings cite specific files and line numbers from the codebase.
    - Confirms existence of claimed issues (e.g., missing dependencies in package.json).
    - Filters out generic advice not applicable to the project's tech stack.
    - Marks assumptions explicitly when code is not fully visible.
    - Runs final QA pass on complete report before delivery.
  - Bootstrap section with copy-paste prompts for AI IDEs (Windsurf, Cursor, etc.).
  - YAML invocation parameters with ProjectPath, ReportsFolder (optional), Include/ExcludeGlobs.
  - Preflight access checks to validate paths before starting analysis.
  - Verification echo to confirm spec loading, parameters, and anti-hallucination protocol.
  - Automatic file tree generation and key file identification (configs, dockerfiles, error handlers, build scripts).
  - Five specialized domain expert personas:
    1. **Performance & Resource Efficiency Expert:** Identifies bottlenecks, N+1 queries, missing indexes, large bundle sizes, memory leaks, over-fetching.
    2. **Reliability & Error Handling Expert:** Evaluates error boundaries, structured logging, health checks, crash recovery, graceful degradation.
    3. **Operational Resilience Expert:** Assesses rate limiting, timeouts, circuit breakers, retries with exponential backoff, backpressure handling.
    4. **Configuration & 12-Factor Expert:** Validates environment variable usage, secrets management, feature flags, dev/prod parity.
    5. **Maintainability & CI/CD Expert:** Reviews dependency management, lockfiles, linting, build pipeline, documentation.
  - Production readiness scorecard with 5 key metrics (Performance, Reliability, Resilience, Configuration, Maintainability) rated 1-5 stars.
  - Overall readiness grade: Production Ready / Needs Hardening / Prototype Only.
  - Identifies top 3 critical launch blockers that must be fixed before deployment.
  - Phased hardening roadmap:
    - Phase 1: Pre-Launch Blockers (Must Fix)
    - Phase 2: Post-Launch Optimization (Nice to Have)
    - Phase 3: Scale-Up Architecture (Long Term)
  - All findings are evidence-based with explicit file/line citations; assumptions clearly marked.
  - Post-flight verification confirms report written with all 5 expert sections and scorecard complete.
- **Architecture Audit - Deep-Dive Requirements (CRITICAL FIX):** Transformed audit from superficial file-tree analysis to comprehensive code review.
  - **New Section 2.5 - Depth Requirements (MANDATORY):** Must read minimum 20-30 actual code files before making claims
    - At least 5-8 components from different domains (not just names)
    - At least 3-5 service implementations (full read)
    - At least 2-3 hooks, contexts, utils, type files
    - Code snippet requirements for every "problematic pattern" claim
  - **New Section 3 - Analysis Coverage & Limitations (REQUIRED in all reports):** Transparency section that must include:
    - Exact count and list of files actually read (not just scanned)
    - Coverage percentages by area (components: X%, services: Y%)
    - Explicit list of areas NOT analyzed
    - Confidence levels by category (structural: 90%, code quality: 25%, etc.)
    - Time Estimate Reality Check with 2-5x caveat for unanalyzed complexity
  - **Updated QA Validation - New Check #6: Depth Verification:** QA must verify:
    - Claims cite actual READ code (not just file names)
    - "Duplicated logic" backed by 2+ code snippets
    - "God components" cite actual file size/complexity
    - Time estimates are RANGES with caveats (not confident points)
    - Report includes Analysis Coverage section
  - **Root Cause:** Original prompt allowed making architectural claims based on file names alone without reading implementations. Produced reports that looked comprehensive (C+ grade, detailed refactor plans with time estimates) but were based on <15% code inspection. Time estimates were misleadingly confident.
  - **Impact:** Future reports will explicitly state what was/wasn't analyzed, confidence levels, and time estimate caveats. Users will know if they're getting a 40% confidence overview vs 85% deep audit.
- **Architecture Audit - Project Structure Section (CRITICAL FIX):** Added mandatory "Project Structure" section to Final Report Structure (Section 2).
  - File tree visualization now REQUIRED in all architecture reports
  - Shows root directory, src/ structure, file counts, sizes, and visual problem indicators (🔴, ⚠️, ✅)
  - Highlights missing directories (domain/, layouts/, routes/), clutter, and test organization issues
  - QA validation now checks that Project Structure section is present and complete
  - Post-flight verification updated to confirm file tree is included
  - **Root Cause:** Original prompt didn't require file structure; QA expert didn't check for it
  - **Fix:** Added as Section 2 with detailed requirements; QA final pass now verifies presence
- **Post-Flight Verification:** Both audits now include mandatory verification steps after report generation to ensure files are written successfully.
  - Security Audit: Verifies both Markdown and JSON reports exist with sizes and finding counts
  - Architecture Audit: Verifies report exists with all 6 expert sections and scorecard
  - Prevents silent failures where reports are not saved to disk
  - Provides clear file paths, sizes, and completion status to users
- **Security Audit v1.1.2:** Added Quality Assurance & Validation expert (Expert 11) to prevent hallucinations in security findings.
  - **Anti-Hallucination Protocol:** Comprehensive validation system for security threat detection.
  - **QA Expert** validates findings from critical detection experts (2-6) in real-time:
    - Static Threat Hunter (backdoors/RCE)
    - Secrets & Config Analyst (credentials/keys)
    - Client Security Analyst (XSS/auth)
    - Network & Telemetry Analyst (IOCs/endpoints)
    - Forensics & Provenance Analyst (commit anomalies)
  - Ensures all findings cite specific file paths and line numbers from repository.
  - Validates IOCs (domains, IPs, URLs, ports) are extracted from actual code, not invented.
  - Severity and confidence scores must be justified with observable code evidence.
  - Distinguishes facts ("Found in src/api.js:42") from assumptions ("Potentially vulnerable if...").
  - Flags and corrects hallucinated vulnerabilities, file paths, or IOCs.
  - Marks incomplete evidence as "requires manual verification."
  - Execution flow updated to include QA validation after each detection expert (steps 2-6).
- **QUICKSTART.md**: New quick start guide with copy-paste examples for both Security and Architecture audits, troubleshooting tips, and workflow optimization.
- **Architecture Audit** (`AI_ARCHITECTURE_AUDIT_PROMPT.md` v1.0.0): New Mixture-of-Experts prompt for iterative architecture review.
  - **Anti-Hallucination Protocol (Critical):** Comprehensive validation system to prevent AI hallucinations and ensure evidence-based findings.
  - **Quality Assurance & Validation Expert:** Seventh expert that runs after each of the 6 domain experts to validate findings in real-time.
    - Verifies all claims cite specific files, directories, or code patterns from provided inputs.
    - Distinguishes facts from assumptions with explicit language requirements.
    - Ensures all 1-5 star scores are justified with concrete examples.
    - Flags and corrects any hallucinated content (invented files, patterns, or structures).
    - Maintains cross-expert consistency throughout the report.
    - Runs final QA pass on complete report before delivery.
  - Bootstrap section aligned with Security Audit format for consistency and ease of use.
  - Copy-paste bootstrap prompts for Windsurf, Cursor, and other AI IDEs.
  - YAML invocation parameters with ProjectPath, ReportsFolder (optional), Include/ExcludeGlobs.
  - Preflight access checks to validate paths before starting analysis.
  - Verification echo to confirm spec loading and parameters, including anti-hallucination protocol confirmation.
  - Automatic file tree generation and key file identification from ProjectPath.
  - Six specialized domain expert personas: Layering & Structure, Domain & Services, UI & Components, Types & Contracts, Testing & Testability, and Refactoring Strategy & Integration.
  - Cumulative reporting where each expert builds on and refines previous findings with QA validation.
  - Comprehensive 7-metric scorecard (Layer Separation, Flatness, Domain Reusability, Component Reusability, Type Safety, Testability, Dependency Inversion) with evidence-based scoring.
  - Phased refactor roadmap (High Impact/Low Risk → Medium Term → Long Term).
  - Before/After refactor examples with concrete implementation guidance citing real or clearly proposed files.
  - Scalability assessment and reusable code percentage estimates.
  - Manual override option for users who prefer to provide file tree and snippets directly.
  - Explicit handling of missing information with "Not visible in provided data" disclaimers.

### Changed
- Updated README to reflect multiple audit types (Security, Architecture, and Production Readiness).
- Enhanced README structure with separate sections for each audit's features, quickstart, parameters, and outputs.
- Expanded educational goals to cover security, architectural, and production deployment best practices.

## 1.1.1 — 2025-11-09
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
