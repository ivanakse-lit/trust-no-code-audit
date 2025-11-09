# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
