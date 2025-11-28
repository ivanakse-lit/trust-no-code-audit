# Product Requirements Document: Trust No Code Audit Dashboard

## 1. Executive Summary

The **Trust No Code Audit Dashboard** is a web-based frontend application that streamlines the process of running AI-powered code audits (Security, Architecture, and Production Readiness) by providing an intuitive interface for:

1. **Codebase Selection** - Browse and select local project directories for audit
2. **Report Location Management** - Configure where audit reports should be saved
3. **Bootstrap Prompt Generation** - Auto-generate copy-paste prompts for AI IDEs
4. **Report Viewing** - Browse and view completed audit reports in the browser

This eliminates the manual friction of editing file paths in prompt templates and provides a centralized dashboard for managing all audit workflows.

---

## 2. Problem Statement

### Current Pain Points

1. **Manual Path Editing** - Users must manually find and replace placeholder paths (`<REPO_ROOT_ABSOLUTE_PATH>`, `<REPORTS_FOLDER_ABSOLUTE_PATH>`) in prompt files every time they run an audit.

2. **No Central Interface** - Audit prompts, configuration, and reports are scattered across markdown files with no unified UI.

3. **Error-Prone Process** - Copy-pasting large prompts with manual edits leads to typos and incorrect paths, causing audit failures.

4. **Report Discovery** - After audits complete, users must navigate to the reports folder manually. There's no way to browse or preview reports in context.

5. **Repetitive Workflow** - Frequently audited projects require re-entering the same paths repeatedly.

### Target Users

- **Developers** running ad-hoc security/architecture audits on their projects
- **Tech Leads** conducting periodic code reviews before releases
- **Security Auditors** performing comprehensive codebase assessments
- **DevOps Engineers** evaluating production readiness

---

## 3. Goals & Success Metrics

### Goals

| Goal | Description |
|------|-------------|
| **Reduce Setup Time** | From ~3-5 minutes (manual copy-paste + path editing) to <30 seconds |
| **Eliminate Path Errors** | Zero typos in generated bootstrap prompts |
| **Centralize Workflow** | Single dashboard for all audit types and reports |
| **Enable Report Discovery** | Browse, search, and view reports without leaving the app |

### Success Metrics

- **Setup Time**: Average time from opening app to having a ready-to-paste prompt < 30 seconds
- **Error Rate**: 0% path-related audit failures from generated prompts
- **Adoption**: Users prefer the dashboard over manual prompt editing
- **Report Access**: 80% of reports viewed through the dashboard vs direct file access

---

## 4. User Personas

### Persona 1: Alex - Full-Stack Developer

- **Context**: Runs security audits on personal projects before deploying
- **Pain Point**: Forgets the exact prompt format; spends time re-reading QUICKSTART.md
- **Goal**: One-click audit setup with sensible defaults

### Persona 2: Sam - Security Engineer

- **Context**: Audits multiple client codebases weekly
- **Pain Point**: Managing paths for different projects is tedious
- **Goal**: Save frequently-used project paths; quickly switch between audits

### Persona 3: Jordan - Tech Lead

- **Context**: Reviews architecture before major releases
- **Pain Point**: Wants to compare reports over time; hard to find old reports
- **Goal**: Browse all historical reports; track improvements

---

## 5. User Flows

### Flow 1: Generate Bootstrap Prompt (Primary Flow)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. OPEN DASHBOARD                                                           │
│    User opens http://localhost:3000                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. SELECT AUDIT TYPE                                                        │
│    Choose from: Security | Architecture | Production Readiness              │
│    System displays audit description and expected outputs                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. SELECT CODEBASE PATH                                                     │
│    Option A: Type/paste path manually                                       │
│    Option B: Browse folders via file picker                                 │
│    Option C: Select from recent projects                                    │
│    System validates path exists                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. SELECT REPORTS FOLDER                                                    │
│    Option A: Auto-suggest sibling folder (e.g., ../project-reports)         │
│    Option B: Type/paste custom path                                         │
│    Option C: Browse folders via file picker                                 │
│    System validates folder is writable                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. CONFIGURE OPTIONS (Optional)                                             │
│    - Include/Exclude glob patterns                                          │
│    - Max file size                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 6. GENERATE & COPY PROMPT                                                   │
│    System generates complete bootstrap prompt                               │
│    User clicks "Copy to Clipboard"                                          │
│    Visual confirmation of successful copy                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 7. RUN IN AI IDE                                                            │
│    User pastes prompt into Windsurf/Cursor/etc.                             │
│    Audit runs and writes reports to specified folder                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Flow 2: View Reports

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. NAVIGATE TO REPORTS TAB                                                  │
│    User clicks "Reports" in navigation                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. SELECT REPORTS FOLDER                                                    │
│    Option A: Browse to folder containing reports                            │
│    Option B: Select from recently used report locations                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. BROWSE REPORTS                                                           │
│    System scans folder for .md and .json report files                       │
│    Displays list with: filename, date modified, audit type, size            │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. VIEW REPORT                                                              │
│    User clicks report to open                                               │
│    Markdown rendered with syntax highlighting                               │
│    JSON displayed in formatted, collapsible tree view                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. ACTIONS                                                                  │
│    - Download report                                                        │
│    - Copy report content                                                    │
│    - Open in default system app                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Flow 3: Manage Saved Projects (Secondary)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. NAVIGATE TO PROJECTS TAB                                                 │
│    User clicks "Projects" in navigation                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. VIEW SAVED PROJECTS                                                      │
│    List of previously audited projects with:                                │
│    - Project name, codebase path, reports path                              │
│    - Last audit date and type                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. QUICK ACTIONS                                                            │
│    - Re-run audit (opens generator with pre-filled paths)                   │
│    - View reports (opens report viewer for that project)                    │
│    - Edit project settings                                                  │
│    - Remove from saved list                                                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Functional Requirements

### 6.1. Audit Selection & Configuration

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1.1 | Display three audit types: Security, Architecture, Production | P0 |
| FR-1.2 | Show audit description, expected outputs, and expert roster per type | P1 |
| FR-1.3 | Allow custom include/exclude glob patterns | P1 |
| FR-1.4 | Support max file size configuration | P2 |

### 6.2. Path Selection

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-2.1 | Manual text input for codebase path | P0 |
| FR-2.2 | Manual text input for reports folder path | P0 |
| FR-2.3 | Folder browser via backend API | P0 |
| FR-2.4 | Path validation (exists, readable/writable) | P0 |
| FR-2.5 | Auto-suggest reports folder as sibling directory | P1 |
| FR-2.6 | Recent paths dropdown (last 10 used) | P1 |
| FR-2.7 | Persist recent paths in localStorage | P1 |

### 6.3. Bootstrap Prompt Generation

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-3.1 | Generate complete bootstrap prompt for selected audit type | P0 |
| FR-3.2 | Substitute all path placeholders with actual paths | P0 |
| FR-3.3 | Copy prompt to clipboard with visual feedback | P0 |
| FR-3.4 | Display generated prompt in readable, scrollable view | P1 |
| FR-3.5 | Syntax highlighting for generated prompt | P2 |

### 6.4. Report Viewing

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-4.1 | Scan folder for report files (.md, .json) | P0 |
| FR-4.2 | Display report list with metadata (name, date, size) | P0 |
| FR-4.3 | Render Markdown reports with proper formatting | P0 |
| FR-4.4 | Display JSON reports in formatted tree view | P0 |
| FR-4.5 | Search/filter reports by name or content | P1 |
| FR-4.6 | Download report file | P1 |
| FR-4.7 | Open report in system default application | P2 |

### 6.5. Project Management

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-5.1 | Save project configuration (name, paths, settings) | P1 |
| FR-5.2 | List saved projects with quick actions | P1 |
| FR-5.3 | Re-run audit with pre-filled configuration | P1 |
| FR-5.4 | Delete saved project | P1 |

---

## 7. Non-Functional Requirements

### 7.1. Performance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-1.1 | Dashboard initial load time | < 2 seconds |
| NFR-1.2 | Path validation response | < 500ms |
| NFR-1.3 | Report list load (100 files) | < 1 second |
| NFR-1.4 | Markdown render time (1MB file) | < 500ms |

### 7.2. Usability

| ID | Requirement |
|----|-------------|
| NFR-2.1 | Responsive design supporting 1280px+ screens (desktop-first) |
| NFR-2.2 | Keyboard navigation for all primary actions |
| NFR-2.3 | Clear error messages with remediation steps |
| NFR-2.4 | Visual feedback for all user actions (loading, success, error) |
| NFR-2.5 | Dark mode support (matches developer IDE aesthetic) |

### 7.3. Reliability

| ID | Requirement |
|----|-------------|
| NFR-3.1 | Graceful handling of inaccessible paths |
| NFR-3.2 | Preserve user input on validation errors |
| NFR-3.3 | LocalStorage persistence survives browser refresh |

### 7.4. Security

| ID | Requirement |
|----|-------------|
| NFR-4.1 | Backend API only serves localhost (no external access) |
| NFR-4.2 | No arbitrary file execution—read-only file operations |
| NFR-4.3 | Path traversal protection on file browser API |

### 7.5. Maintainability

| ID | Requirement |
|----|-------------|
| NFR-5.1 | Component-based architecture (React) |
| NFR-5.2 | TypeScript for type safety |
| NFR-5.3 | Automated tests for critical paths |
| NFR-5.4 | Clear separation between UI and API layers |

---

## 8. Technical Architecture

### 8.1. Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | React 18 + Vite | Fast dev experience, modern ecosystem |
| **Styling** | TailwindCSS | Utility-first, rapid UI development |
| **Icons** | Lucide React | Clean, consistent iconography |
| **Backend** | Node.js + Express | Simple local server for file operations |
| **State** | React useState/useReducer | Simple state; no external store needed |
| **Storage** | localStorage | Persist recent paths and settings |

### 8.2. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BROWSER (localhost:3000)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  AuditPage  │  │ ReportsPage │  │ProjectsPage │  │  SettingsPage│        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                │                │                │               │
│  ┌──────▼───────────────────────────────────────────────────▼──────┐       │
│  │                         SHARED COMPONENTS                        │       │
│  │  PathSelector │ AuditTypeCard │ BootstrapPreview │ ReportViewer  │       │
│  └──────────────────────────────────────────────────────────────────┘       │
│                                    │                                        │
│                          ┌─────────▼─────────┐                              │
│                          │   API Service     │                              │
│                          │ (fetch wrapper)   │                              │
│                          └─────────┬─────────┘                              │
└────────────────────────────────────┼────────────────────────────────────────┘
                                     │ HTTP
┌────────────────────────────────────┼────────────────────────────────────────┐
│                       BACKEND (localhost:3001)                              │
├────────────────────────────────────┼────────────────────────────────────────┤
│                          ┌─────────▼─────────┐                              │
│                          │   Express Server  │                              │
│                          └─────────┬─────────┘                              │
│         ┌──────────────────────────┼──────────────────────────────┐         │
│  ┌──────▼──────┐  ┌────────────────▼────────────────┐  ┌──────────▼──────┐  │
│  │ /api/browse │  │ /api/validate                   │  │ /api/reports    │  │
│  │ List dirs   │  │ Check path exists/writable      │  │ List/read files │  │
│  └─────────────┘  └─────────────────────────────────┘  └─────────────────┘  │
│                                    │                                        │
│                          ┌─────────▼─────────┐                              │
│                          │   File System     │                              │
│                          │   (Node.js fs)    │                              │
│                          └───────────────────┘                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.3. API Endpoints

| Method | Endpoint | Description | Request | Response |
|--------|----------|-------------|---------|----------|
| GET | `/api/browse` | List directory contents | `?path=/some/dir` | `{ dirs: [], files: [] }` |
| POST | `/api/validate` | Validate path | `{ path, type: "read"|"write" }` | `{ valid: bool, error? }` |
| GET | `/api/reports` | List reports in folder | `?path=/reports/dir` | `{ reports: [{ name, date, size }] }` |
| GET | `/api/report` | Read single report | `?path=/path/to/file.md` | `{ content: "..." }` |

---

## 9. UI Wireframes

### 9.1. Main Dashboard - Audit Generator

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  🛡️ Trust No Code Audit Dashboard                    [Audit] [Reports] [⚙️] │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │                        SELECT AUDIT TYPE                                │  │
│  ├────────────────────────────────────────────────────────────────────────┤  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │  │
│  │  │ 🛡️ SECURITY  │  │ 🏗️ ARCHITECT │  │ 🚀 PRODUCTION│                  │  │
│  │  │              │  │              │  │              │                  │  │
│  │  │ ● Selected   │  │              │  │              │                  │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘                  │  │
│  │                                                                        │  │
│  │  Threat hunting, secrets detection, compliance mapping                 │  │
│  │  Outputs: Security & Architecture.md, security_findings.json           │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │  CODEBASE PATH                                                         │  │
│  │  ┌──────────────────────────────────────────────────────┐ ┌──────────┐ │  │
│  │  │ C:\Projects\my-app                                   │ │ Browse.. │ │  │
│  │  └──────────────────────────────────────────────────────┘ └──────────┘ │  │
│  │  ✓ Path exists and is readable                                         │  │
│  │                                                                        │  │
│  │  Recent: my-app | other-project | client-xyz                           │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │  REPORTS FOLDER                                                        │  │
│  │  ┌──────────────────────────────────────────────────────┐ ┌──────────┐ │  │
│  │  │ C:\Projects\my-app-reports                           │ │ Browse.. │ │  │
│  │  └──────────────────────────────────────────────────────┘ └──────────┘ │  │
│  │  ✓ Folder is writable                                                  │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │                        GENERATED PROMPT                                 │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │  │
│  │  │ Read and follow the audit spec at "B:\Dev\Audits\AI_SECURITY..." │  │  │
│  │  │ After reading, reply with this confirmation:                     │  │  │
│  │  │ - SpecTitle: "AI Security Audit..."                              │  │  │
│  │  │ ...                                                              │  │  │
│  │  └──────────────────────────────────────────────────────────────────┘  │  │
│  │                                                            ┌──────────┐ │  │
│  │                                                            │ 📋 Copy  │ │  │
│  │                                                            └──────────┘ │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 9.2. Reports Viewer

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  🛡️ Trust No Code Audit Dashboard                    [Audit] [Reports] [⚙️] │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Reports Folder: C:\Projects\my-app-reports          [Browse..] [🔄 Refresh] │
│                                                                              │
│  ┌─────────────────────────────────┬──────────────────────────────────────┐  │
│  │         REPORT LIST             │           REPORT PREVIEW             │  │
│  ├─────────────────────────────────┼──────────────────────────────────────┤  │
│  │                                 │                                      │  │
│  │  📄 Security & Architecture.md  │  # Security Audit Report             │  │
│  │     Nov 26, 2025 • 45 KB        │                                      │  │
│  │     ● Selected                  │  ## Executive Summary                │  │
│  │                                 │  This report details the findings    │  │
│  │  📊 security_findings.json      │  of a comprehensive security audit   │  │
│  │     Nov 26, 2025 • 12 KB        │  performed on the repository...      │  │
│  │                                 │                                      │  │
│  │  📄 Architecture_Report.md      │  ## Critical Findings                │  │
│  │     Nov 20, 2025 • 38 KB        │  - **RCE via eval()**: src/api.js:42 │  │
│  │                                 │  - **Hardcoded API key**: .env.prod  │  │
│  │                                 │                                      │  │
│  │                                 │  ...                                 │  │
│  │                                 │                              [⬇️ DL] │  │
│  └─────────────────────────────────┴──────────────────────────────────────┘  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 10. MVP Definition

### MVP Scope (v1.0)

**In Scope:**
- Audit type selection (Security, Architecture, Production)
- Manual path input with validation
- Bootstrap prompt generation with copy-to-clipboard
- Report folder scanning and listing
- Markdown report rendering
- JSON report viewing (formatted)
- Dark theme UI

**Out of Scope (Post-MVP):**
- Saved projects management
- File browser dialog (native OS picker)
- Report search/filtering
- Syntax highlighting in prompts
- Custom glob pattern editor
- Export/share reports

### MVP Acceptance Criteria

1. User can select any of the three audit types
2. User can enter codebase and reports folder paths
3. Paths are validated for existence and permissions
4. Complete bootstrap prompt is generated and copyable
5. User can browse to a reports folder and view list of reports
6. Markdown reports render with proper formatting
7. JSON reports display in readable format
8. Application loads and responds within performance targets

---

## 11. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Path permissions vary by OS | Medium | Medium | Provide clear error messages; test on Windows/Mac/Linux |
| Large report files slow rendering | Low | Medium | Implement lazy loading; limit preview size |
| Users unfamiliar with prompt flow | Medium | High | Add tooltip guidance; include "How to Use" section |
| Browser file API limitations | High | High | Backend API provides file access; no browser-only solution |

---

## 12. Roadmap

### Phase 1: MVP (Current)
- Core audit generator UI
- Basic report viewer
- Local backend API

### Phase 2: Enhanced UX
- Saved projects management
- Native file browser integration
- Report search and filtering
- Keyboard shortcuts

### Phase 3: Advanced Features
- Audit history tracking
- Report diff/comparison
- Direct n8n workflow integration
- Team/shared configurations

---

## 13. Appendix

### A. Audit Types Reference

| Type | Prompt File | Outputs |
|------|-------------|---------|
| Security | `AI_SECURITY_AUDIT_PROMPT.md` | `Security & Architecture.md`, `security_findings.json` |
| Architecture | `AI_ARCHITECTURE_AUDIT_PROMPT.md` | `Architecture_Audit_Report_YYYY-MM-DD.md` |
| Production | `AI_PRODUCTION_AUDIT_PROMPT.md` | `Production_Readiness_Report_YYYY-MM-DD.md` |

### B. Bootstrap Prompt Templates

See `QUICKSTART.md` for complete bootstrap prompt examples for each audit type.
