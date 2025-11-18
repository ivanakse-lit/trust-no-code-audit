# Quick Start Guide

This guide shows you how to run both audits with minimal effort.

## 🎯 Common Pattern for Both Audits

Both Security and Architecture audits follow the same simple workflow:

### Step 1: Open the Audit File
- **Security Audit:** `AI_SECURITY_AUDIT_PROMPT.md`
- **Architecture Audit:** `AI_ARCHITECTURE_AUDIT_PROMPT.md`

### Step 2: Find the Bootstrap Section
Located at the top of each file, look for the copy-paste bootstrap prompt.

### Step 3: Copy & Customize the Bootstrap Prompt
Replace the placeholders:
- `<PROMPT_FILE_PATH>` → Full path to the audit file
- `<PROJECT_ROOT_ABSOLUTE_PATH>` or `<REPO_ROOT_ABSOLUTE_PATH>` → Path to your project
- `<REPORTS_FOLDER_ABSOLUTE_PATH>` → Where to save the report

### Step 4: Submit to Your AI Assistant
Paste the customized prompt and let the MoE system do the work.

---

## 🔐 Security Audit Example

```
Read and follow the audit spec at "B:\Dev\Audits\AI_SECURITY_AUDIT_PROMPT.md".
After reading, reply with this confirmation:
- SpecTitle: "AI Security Audit Mixture-of-Experts Orchestration Prompt"
- Version: 1.1.2
- ExpertsRoster: [Repository Mapper, Static Threat Hunter, Secrets & Config Analyst, Client Security Analyst, Network & Telemetry Analyst, Forensics & Provenance Analyst, Compliance & Controls Mapper, Deduplicator & Scoring, Remediation Planner, Report Writer, Quality Assurance & Validation (runs after critical experts)]
- Anti-Hallucination Protocol: Enabled (all findings must cite specific files/lines; no invented IOCs, files, or patterns; assumptions explicitly marked)

Parameters:
- RepositoryPath: C:\Projects\my-app
- ReportsFolder: C:\Projects\my-app-security-reports
- RuntimeMode: offline
- IncludeGlobs: ["**/*"]
- ExcludeGlobs: [".git/**", "node_modules/**", "**/dist/**", "**/build/**", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.webp", "**/*.ico", "**/*.zip", "**/*.exe", "**/*.dll", "**/*.so"]

Then run the MoE flow per the spec with QA validation after critical detection experts (2-6). Do not execute code or perform network calls. At the end, write "Security & Architecture.md" and "security_findings.json" into ReportsFolder using write_to_file. If the spec file or RepositoryPath is not accessible/readable, stop with AccessError and instruct me to provide a readable local snapshot path and a writable ReportsFolder, then re-run.
```

**Output:** `Security & Architecture.md` and `security_findings.json` in your reports folder.

---

## 🏗️ Architecture Audit Example

```
Read and follow the architecture audit spec at "B:\Dev\Audits\AI_ARCHITECTURE_AUDIT_PROMPT.md".
After reading, reply with this confirmation:
- SpecTitle: "AI Architecture Audit Mixture-of-Experts Orchestration Prompt"
- Version: 1.0.0
- ExpertsRoster: [Layering & Structure, Domain & Services, UI & Components, Types & Contracts, Testing & Testability, Refactoring Strategy & Integration, Quality Assurance & Validation (runs after each expert)]
- Anti-Hallucination Protocol: Enabled (all findings must cite specific files/lines; assumptions explicitly marked)

Parameters:
- ProjectPath: C:\Projects\my-app
- ReportsFolder: C:\Projects\my-app-architecture-reports
- IncludeGlobs: ["**/*"]
- ExcludeGlobs: [".git/**", "node_modules/**", "**/dist/**", "**/build/**", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.webp", "**/*.ico", "**/*.zip", "**/*.exe", "**/*.dll", "**/*.so"]

Then run the MoE flow per the spec. Automatically gather the file tree and key files from ProjectPath, run all 6 domain expert passes (with QA validation after each), and deliver the architecture report. If ReportsFolder is specified, write the report there using write_to_file; otherwise deliver inline. If the spec file or ProjectPath is not accessible/readable, stop with AccessError and instruct me to provide a readable path, then re-run.
```

**Output:** Comprehensive architecture report (inline or in ReportsFolder).

---

## 🛡️ Anti-Hallucination Protocol

Both audits include **Quality Assurance & Validation** to prevent AI hallucinations and ensure trustworthy findings.

### Security Audit

The Security Audit validates **critical threat detection findings** (experts 2-6) to ensure all security claims are evidence-based:

#### What It Validates:
- ✅ **Evidence citations:** All findings cite specific file paths and line numbers
- ✅ **IOC verification:** Domains, IPs, URLs, ports extracted from actual code (not invented)
- ✅ **Severity justification:** Critical/High findings backed by clear exploit vectors in code
- ✅ **Pattern verification:** Obfuscation (base64, hex) and dynamic execution (eval, new Function) reference actual usage
- ✅ **Confidence scores:** Proportional to evidence quality (0.0-1.0)

#### Security-Specific Validations:
- **Backdoor/RCE findings** (Expert 2): Must cite exact code locations with dynamic execution or remote code fetch
- **Secrets/Keys** (Expert 3): Must show actual credential strings from config/code (redacted in report)
- **XSS/Auth issues** (Expert 4): Must reference specific DOM manipulation or auth flow code
- **IOCs** (Expert 5): All network endpoints extracted from code, not assumed
- **Forensics** (Expert 6): Commit anomalies cite git metadata; mark "not available" if .git missing

#### Example:
**❌ Without QA:** "Critical: Potential RCE vulnerability detected via eval usage"
- Problem: No file path, no code reference, vague claim

**✅ With QA:** "Critical (Confidence: 0.95): RCE vulnerability in `src/api/processor.js:127` - eval() executes user-controlled input from req.body.code without sanitization"
- Clear: File path, line number, specific code pattern, justified severity

---

### Architecture Audit

The Architecture Audit includes a **Quality Assurance & Validation Expert** that prevents AI hallucinations:

### What It Does:
- ✅ **Validates after every expert pass** (not just at the end)
- ✅ **Requires evidence citations** for all claims (file paths, directory names, code patterns)
- ✅ **Distinguishes facts from assumptions** with explicit language
- ✅ **Prevents invented content** (no fake files, patterns, or structures)
- ✅ **Ensures justified scores** (every 1-5 star rating backed by examples)
- ✅ **Maintains consistency** across all expert contributions

### What You Get:
- **Evidence-based findings:** Every claim cites specific files from your codebase
- **Clear assumptions:** Anything uncertain is marked: "Assuming...", "Not visible in provided data..."
- **No hallucinations:** The QA expert flags and corrects any invented content before it reaches you
- **Trustworthy scores:** All ratings are backed by concrete examples
- **Complete transparency:** Missing information is explicitly called out with recommendations for what to inspect

### Example:
**❌ Without QA:** "The app uses a centralized type system in `src/types/`..."
- Problem: May not exist; AI assumed it

**✅ With QA:** "Based on the file tree, no centralized `types/` directory is visible. Type definitions appear scattered across components. Recommend: Create `src/types/` and consolidate..."
- Clear: Evidence-based, marks what's missing, provides actionable guidance

---

## 💡 Pro Tips

### 1. **Inline vs File Output**
- **Architecture Audit:** ReportsFolder is optional—omit it for inline report delivery
- **Security Audit:** ReportsFolder is required for JSON + Markdown outputs

### 2. **Narrow Your Scan**
Use `IncludeGlobs` to focus on specific directories:
```yaml
IncludeGlobs: ["src/**", "lib/**"]  # Only scan src/ and lib/
```

### 3. **Larger Files**
Increase `MaxFileSizeMB` if you need to analyze large files:
```yaml
MaxFileSizeMB: 5  # Allow files up to 5MB
```

### 4. **Manual Mode**
Skip automatic file gathering by providing your own data:
- Security Audit: Prepare your own file list
- Architecture Audit: Provide `{{FILE_TREE_OR_STRUCTURE}}` and `{{KEY_FILES_OR_SNIPPETS}}`

### 5. **Always Check Post-Flight Verification**
After the audit completes, look for the verification message:
```
✅ POST-FLIGHT VERIFICATION PASSED

Reports Written:
- [Report Name]: [absolute_path] ([size] KB)
```
**If you don't see this message, the report may not have been saved!** Ask the AI to confirm the file location and re-write if needed.

---

## ⚡ Fastest Workflow (2 Steps)

### For Architecture Review:
1. Copy bootstrap from `AI_ARCHITECTURE_AUDIT_PROMPT.md`
2. Replace paths and submit

### For Security Audit:
1. Export repo ZIP and extract
2. Copy bootstrap from `AI_SECURITY_AUDIT_PROMPT.md`, replace paths, submit

**That's it!** The MoE system handles everything else.

---

## 🆘 Troubleshooting

### AccessError: Path not found
- Verify absolute paths are correct
- Use forward slashes `/` or escaped backslashes `\\` on Windows
- Ensure directories exist and are readable

### No output generated
- Check ReportsFolder permissions (if specified)
- Verify the audit completed all expert passes
- Look for error messages in the console

### Files taking too long
- Reduce `MaxFileSizeMB` to skip large files
- Add more patterns to `ExcludeGlobs`
- Use `IncludeGlobs` to narrow scope

---

## 📚 Next Steps

After receiving your report:

**Security Audit:**
- Review Critical/High findings first
- Check `security_findings.json` for machine-readable data
- Follow Track A (Eradicate) or Track B (Remediate) guidance

**Architecture Audit:**
- Review the scorecard to identify weak areas
- Start with Phase 1 refactors (High Impact/Low Risk)
- Use Before/After examples as templates for your refactoring

---

For detailed specifications, see the full prompt files or README.md.
