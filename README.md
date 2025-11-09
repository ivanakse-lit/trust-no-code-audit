# AI Security Audit (MoE) — Trust No Code

An offline, evidence-first Mixture-of-Experts orchestration prompt for static security auditing of codebases. It helps you detect backdoors, secrets, risky client patterns, and third‑party tracking—without executing any code.

[AI_SECURITY_AUDIT_PROMPT.md](./AI_SECURITY_AUDIT_PROMPT.md) version 1.1.1 contains the full spec used by the orchestrator.

## Why "Trust No Code"
- Never execute untrusted code; assume all code can be malicious until proven otherwise.
- Run audits on a local snapshot with network access disabled.
- Produce evidence-first, reproducible findings mapped to controls and regulations.

## Features
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
- Shared evidence format with severity and confidence.
- Deterministic ordering and critical gating.
- Examples and Third‑Party Tracking Detection Checklist.
- Purpose‑first report: begins with an Application Purpose & Intended Use Summary derived from repo metadata to flag unexpected inclusions.

## Quickstart
1) Prepare an offline snapshot of the repository (ZIP export or git archive). Include `.git` only if you want commit/provenance checks.
2) Choose a reports folder outside the repo (to avoid accidental commits).
3) Open `AI_SECURITY_AUDIT_PROMPT.md` in your IDE/agent and follow the Bootstrap section.

### Invocation parameters (template)
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

### Preflight access check
- Spec file readable.
- RepositoryPath exists and is readable.
- ReportsFolder exists or is creatable and writable.
- `.git` metadata optional; mark "not available" if missing.

## Outputs
- `Security & Architecture.md` — human-readable executive report.
- `security_findings.json` — machine-readable findings.
  - Note: The report begins with an Application Purpose & Intended Use Summary.

## Evidence format
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
- Help teams audit AI‑assisted and fast‑paced “vibe coding” projects responsibly.
- Encourage secure defaults, secret hygiene, safe client patterns, and consent-gated telemetry.

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
