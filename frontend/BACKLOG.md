# BACKLOG.md — Trust No Code Audit Dashboard

## Purpose of this Document

This `BACKLOG.md` serves as a dynamic record of development for the **Trust No Code Audit Dashboard**. It breaks down features into Epics, User Stories, and Tasks, tracking progress with checkboxes and completion dates.

---

## How to Use This Backlog

- **Epics:** Large bodies of work representing high-level goals or initiatives.
- **User Stories:** User-centric feature descriptions following the format:
    ```
    As a [type of user],
    I want [to perform an action/achieve a goal]
    so that [I get this benefit/value].
    ```
- **Acceptance Criteria (AC):** Testable conditions for story completion using Given/When/Then format.
- **Tasks:** Granular, actionable steps to complete a story.

### Progress Tracking
- `[ ]` = Not started / In progress
- `[x]` = Completed with date: *(Completed: YYYY-MM-DD)*

---

## Product Vision

"Eliminate the friction of manual path editing and prompt copy-pasting for AI-powered code audits, providing developers with a streamlined dashboard to configure audits and view reports."

---

## MVP Scope

- Audit type selection (Security, Architecture, Production)
- Codebase and reports path configuration
- Bootstrap prompt generation with copy-to-clipboard
- Report listing and viewing (Markdown + JSON)
- Dark theme UI optimized for developer experience

---

## Sprint Schedule

| Sprint | Focus Area | Status |
|--------|------------|--------|
| 1 | Project Setup & Core UI Structure | In Progress |
| 2 | Path Selection & Validation | Not Started |
| 3 | Bootstrap Prompt Generation | Not Started |
| 4 | Report Viewer | Not Started |
| 5 | Polish & Testing | Not Started |

---

## Epics, Features & User Stories

---

### [x] Epic 1: Project Foundation & Navigation *(Completed: 2025-11-26)*
*Goal: Establish the technical foundation with React, TailwindCSS, and a clean navigation structure.*

- [x] **US1.1: Application Shell & Navigation** [████████████] 5/5 tasks *(Completed: 2025-11-26)*

    As a **user**,
    I want **to see a clean dashboard with clear navigation**
    so that **I can easily switch between audit configuration and report viewing.**

    - **Acceptance Criteria:**
        - Given I open the application,
          When the page loads,
          Then I see a header with "Trust No Code Audit Dashboard" branding and navigation tabs.
        - Given I am on any page,
          When I click a navigation tab (Audit, Reports),
          Then I am taken to the corresponding view without page reload.
        - Given I am on a page,
          When I refresh the browser,
          Then I remain on the same view (URL routing).

    - **Tasks:**
        - [x] Task 1.1.1: Set up React project with Vite and TailwindCSS *(Completed: 2025-11-26)*
        - [x] Task 1.1.2: Configure dark theme as default with Tailwind *(Completed: 2025-11-26)*
        - [x] Task 1.1.3: Create `Layout` component with header and navigation *(Completed: 2025-11-26)*
        - [x] Task 1.1.4: Implement client-side routing with React Router *(Completed: 2025-11-26)*
        - [x] Task 1.1.5: Create placeholder pages: AuditPage, ReportsPage *(Completed: 2025-11-26)*

- [x] **US1.2: Backend API Server Setup** [████████████] 4/4 tasks *(Completed: 2025-11-26)*

    As a **developer**,
    I want **a local backend server for file system operations**
    so that **the frontend can browse directories and read files securely.**

    - **Acceptance Criteria:**
        - Given the server is running,
          When I make a request to `/api/health`,
          Then I receive a 200 OK response.
        - Given the server is running,
          When the frontend makes CORS requests,
          Then the requests are allowed from localhost:3000.
        - Given an invalid API endpoint,
          When I make a request,
          Then I receive a 404 with error details.

    - **Tasks:**
        - [x] Task 1.2.1: Create Express server with CORS configuration *(Completed: 2025-11-26)*
        - [x] Task 1.2.2: Add health check endpoint `/api/health` *(Completed: 2025-11-26)*
        - [x] Task 1.2.3: Configure Vite proxy for `/api` routes *(Completed: 2025-11-26)*
        - [x] Task 1.2.4: Add error handling middleware *(Completed: 2025-11-26)*

---

### [x] Epic 2: Audit Type Selection *(Completed: 2025-11-26)*
*Goal: Allow users to select between Security, Architecture, and Production audits with clear descriptions.*

- [x] **US2.1: Audit Type Cards** [████████████] 4/4 tasks *(Completed: 2025-11-26)*

    As a **user**,
    I want **to see three audit type options displayed as selectable cards**
    so that **I can quickly understand and choose the type of audit I need.**

    - **Acceptance Criteria:**
        - Given I am on the Audit page,
          When the page loads,
          Then I see three cards: Security, Architecture, Production Readiness.
        - Given I view an audit card,
          Then I see: icon, title, brief description, and expected outputs.
        - Given I click an audit card,
          When I select it,
          Then the card is visually highlighted and other cards are deselected.
        - Given I have selected an audit type,
          When I view the page,
          Then the audit description expands to show more details.

    - **Tasks:**
        - [x] Task 2.1.1: Create `AuditTypeCard` component with props for type, icon, description *(Completed: 2025-11-26)*
        - [x] Task 2.1.2: Define audit type configuration data (Security, Architecture, Production) *(Completed: 2025-11-26)*
        - [x] Task 2.1.3: Implement card selection state with visual feedback *(Completed: 2025-11-26)*
        - [x] Task 2.1.4: Display expected outputs list for selected audit type *(Completed: 2025-11-26)*

---

### [ ] Epic 3: Path Selection & Validation *(In Progress)*
*Goal: Enable users to input and validate codebase and reports folder paths.*

- [x] **US3.1: Codebase Path Input** [██████████░░] 4/5 tasks *(Completed: 2025-11-26)*

    As a **user**,
    I want **to enter the path to my codebase**
    so that **the audit knows which project to analyze.**

    - **Acceptance Criteria:**
        - Given I am on the Audit page with an audit type selected,
          When I view the form,
          Then I see a text input labeled "Codebase Path" with a placeholder example.
        - Given I type a path,
          When I stop typing (debounced 500ms),
          Then the system validates the path.
        - Given the path exists and is readable,
          When validation completes,
          Then I see a green checkmark with "Path exists and is readable".
        - Given the path does not exist,
          When validation completes,
          Then I see a red error icon with "Path does not exist".

    - **Tasks:**
        - [x] Task 3.1.1: Create `PathInput` component with label, input, validation status *(Completed: 2025-11-26)*
        - [x] Task 3.1.2: Implement debounced onChange handler (500ms) *(Completed: 2025-11-26)*
        - [x] Task 3.1.3: Create `/api/validate` endpoint for path validation *(Completed: 2025-11-26)*
        - [x] Task 3.1.4: Display validation status (loading, success, error) *(Completed: 2025-11-26)*
        - [ ] Task 3.1.5: Add path format hints for Windows/Mac/Linux

- [x] **US3.2: Reports Folder Path Input** [████████████] 4/4 tasks *(Completed: 2025-11-26)*

    As a **user**,
    I want **to specify where audit reports should be saved**
    so that **I can organize reports separately from my codebase.**

    - **Acceptance Criteria:**
        - Given I have entered a codebase path,
          When I view the reports folder input,
          Then it auto-suggests a sibling folder (e.g., `../my-project-reports`).
        - Given I enter a reports folder path,
          When validation completes successfully,
          Then I see "Folder is writable" with green checkmark.
        - Given the folder doesn't exist but parent is writable,
          When validation completes,
          Then I see "Folder will be created" with info icon.

    - **Tasks:**
        - [x] Task 3.2.1: Reuse `PathInput` component for reports folder *(Completed: 2025-11-26)*
        - [x] Task 3.2.2: Implement auto-suggest based on codebase path *(Completed: 2025-11-26)*
        - [x] Task 3.2.3: Add write permission validation to `/api/validate` *(Completed: 2025-11-26)*
        - [x] Task 3.2.4: Handle "folder will be created" scenario *(Completed: 2025-11-26)*

- [ ] **US3.3: Folder Browser** [░░░░░░░░░░░░] 0/5 tasks

    As a **user**,
    I want **to browse folders visually instead of typing paths**
    so that **I can navigate my file system easily.**

    - **Acceptance Criteria:**
        - Given I click "Browse" next to a path input,
          When the browser modal opens,
          Then I see a list of folders starting from a default location.
        - Given I am in the folder browser,
          When I click a folder,
          Then I navigate into that folder and see its contents.
        - Given I am in the folder browser,
          When I click "Select" on a folder,
          Then the modal closes and the path is populated in the input.
        - Given I am in the folder browser,
          When I click ".." or the back button,
          Then I navigate to the parent directory.

    - **Tasks:**
        - [x] Task 3.3.1: Create `/api/browse` endpoint to list directory contents *(Completed: 2025-11-26)*
        - [ ] Task 3.3.2: Create `FolderBrowser` modal component *(Completed: YYYY-MM-DD)*
        - [ ] Task 3.3.3: Implement folder navigation (enter, back, select) *(Completed: YYYY-MM-DD)*
        - [ ] Task 3.3.4: Add loading state for directory listing *(Completed: YYYY-MM-DD)*
        - [x] Task 3.3.5: Add path traversal protection in backend *(Completed: 2025-11-26)*

- [x] **US3.4: Recent Paths** [████████████] 3/3 tasks *(Completed: 2025-11-26)*

    As a **returning user**,
    I want **to see my recently used paths**
    so that **I don't have to re-type paths for projects I audit frequently.**

    - **Acceptance Criteria:**
        - Given I have used the app before,
          When I focus on a path input,
          Then I see a dropdown with my last 10 used paths.
        - Given I select a recent path,
          When I click it,
          Then the input is populated with that path.
        - Given I submit a valid path,
          Then it is saved to recent paths (localStorage).

    - **Tasks:**
        - [x] Task 3.4.1: Create `useRecentPaths` hook with localStorage persistence *(Completed: 2025-11-26)*
        - [x] Task 3.4.2: Add recent paths dropdown to `PathInput` component *(Completed: 2025-11-26)*
        - [x] Task 3.4.3: Save path on successful validation *(Completed: 2025-11-26)*

---

### [x] Epic 4: Bootstrap Prompt Generation *(Completed: 2025-11-26)*
*Goal: Generate complete, copy-ready bootstrap prompts for selected audit types with user-specified paths.*

- [x] **US4.1: Prompt Generation** [████████████] 4/4 tasks *(Completed: 2025-11-26)*

    As a **user**,
    I want **a complete bootstrap prompt generated automatically**
    so that **I can copy-paste it directly into my AI IDE without manual editing.**

    - **Acceptance Criteria:**
        - Given I have selected an audit type and entered valid paths,
          When I view the prompt section,
          Then I see a complete bootstrap prompt with my paths substituted.
        - Given the generated prompt,
          Then it includes: spec file path, repository path, reports folder, and all standard parameters.
        - Given I change the audit type or paths,
          When I view the prompt,
          Then it updates immediately to reflect my changes.

    - **Tasks:**
        - [x] Task 4.1.1: Define bootstrap prompt templates for each audit type *(Completed: 2025-11-26)*
        - [x] Task 4.1.2: Create `generateBootstrapPrompt(type, codebasePath, reportsPath)` function *(Completed: 2025-11-26)*
        - [x] Task 4.1.3: Create `BootstrapPreview` component with scrollable prompt display *(Completed: 2025-11-26)*
        - [x] Task 4.1.4: Connect prompt generation to form state changes *(Completed: 2025-11-26)*

- [x] **US4.2: Copy to Clipboard** [████████████] 3/3 tasks *(Completed: 2025-11-26)*

    As a **user**,
    I want **to copy the generated prompt with one click**
    so that **I can quickly paste it into my AI IDE.**

    - **Acceptance Criteria:**
        - Given a generated prompt,
          When I click "Copy to Clipboard",
          Then the prompt is copied to my clipboard.
        - Given I click "Copy",
          Then the button shows "Copied!" with a checkmark for 2 seconds.
        - Given clipboard copy fails,
          Then I see an error message with fallback instructions.

    - **Tasks:**
        - [x] Task 4.2.1: Implement clipboard copy with `navigator.clipboard.writeText` *(Completed: 2025-11-26)*
        - [x] Task 4.2.2: Add copy button with success/error feedback animation *(Completed: 2025-11-26)*
        - [x] Task 4.2.3: Add fallback for browsers without clipboard API *(Completed: 2025-11-26)*

- [x] **US4.3: Prompt Validation Warning** [████████████] 2/2 tasks *(Completed: 2025-11-26)*

    As a **user**,
    I want **to be warned if my configuration is incomplete**
    so that **I don't copy an invalid prompt.**

    - **Acceptance Criteria:**
        - Given I have not selected an audit type or paths are invalid,
          When I view the prompt section,
          Then I see a warning message instead of the prompt.
        - Given paths are invalid,
          Then the copy button is disabled with tooltip explaining why.

    - **Tasks:**
        - [x] Task 4.3.1: Implement form validation state (isValid computed) *(Completed: 2025-11-26)*
        - [x] Task 4.3.2: Display validation warning in `BootstrapPreview` *(Completed: 2025-11-26)*

---

### [x] Epic 5: Report Viewing *(Completed: 2025-11-26)*
*Goal: Allow users to browse and view audit reports in the browser.*

- [x] **US5.1: Reports Folder Selection** [████████████] 3/3 tasks *(Completed: 2025-11-26)*

    As a **user**,
    I want **to select a folder containing audit reports**
    so that **I can browse reports from different projects.**

    - **Acceptance Criteria:**
        - Given I navigate to the Reports page,
          When I enter or browse to a folder path,
          Then the system scans for report files.
        - Given recent paths exist,
          When I view the Reports page,
          Then I can quickly select from recent report folders.

    - **Tasks:**
        - [x] Task 5.1.1: Create `ReportsPage` with folder path input *(Completed: 2025-11-26)*
        - [x] Task 5.1.2: Reuse `PathInput` and `FolderBrowser` components *(Completed: 2025-11-26)*
        - [x] Task 5.1.3: Add separate recent paths for reports folders *(Completed: 2025-11-26)*

- [x] **US5.2: Report Listing** [████████████] 4/4 tasks *(Completed: 2025-11-26)*

    As a **user**,
    I want **to see a list of reports in the selected folder**
    so that **I can find the report I want to view.**

    - **Acceptance Criteria:**
        - Given I have selected a valid reports folder,
          When the folder is scanned,
          Then I see a list of .md and .json files with: name, date modified, file size.
        - Given the folder has no report files,
          Then I see "No reports found in this folder".
        - Given I click a report in the list,
          Then it is highlighted and its content loads in the preview pane.

    - **Tasks:**
        - [x] Task 5.2.1: Create `/api/reports` endpoint to list report files *(Completed: 2025-11-26)*
        - [x] Task 5.2.2: Create `ReportList` component with file metadata *(Completed: 2025-11-26)*
        - [x] Task 5.2.3: Implement report selection state *(Completed: 2025-11-26)*
        - [x] Task 5.2.4: Add empty state for folders with no reports *(Completed: 2025-11-26)*

- [x] **US5.3: Markdown Report Rendering** [██████████░░] 3/4 tasks *(Completed: 2025-11-26)*

    As a **user**,
    I want **to view Markdown reports with proper formatting**
    so that **I can read the audit findings clearly.**

    - **Acceptance Criteria:**
        - Given I select a .md report,
          When it loads,
          Then I see rendered Markdown with headings, lists, code blocks, and tables.
        - Given the report has code blocks,
          Then syntax highlighting is applied.
        - Given the report is large,
          Then content is scrollable without affecting the report list.

    - **Tasks:**
        - [x] Task 5.3.1: Create `/api/report` endpoint to read file content *(Completed: 2025-11-26)*
        - [x] Task 5.3.2: Add `react-markdown` or similar library for rendering *(Completed: 2025-11-26)*
        - [x] Task 5.3.3: Create `MarkdownViewer` component with styling *(Completed: 2025-11-26)*
        - [ ] Task 5.3.4: Add syntax highlighting for code blocks

- [x] **US5.4: JSON Report Viewing** [████████████] 3/3 tasks *(Completed: 2025-11-26)*

    As a **user**,
    I want **to view JSON reports in a readable format**
    so that **I can explore structured finding data.**

    - **Acceptance Criteria:**
        - Given I select a .json report,
          When it loads,
          Then I see formatted JSON with proper indentation.
        - Given the JSON has nested objects,
          Then I can expand/collapse sections.
        - Given the JSON is invalid,
          Then I see an error message with raw content fallback.

    - **Tasks:**
        - [x] Task 5.4.1: Create `JsonViewer` component with formatted display *(Completed: 2025-11-26)*
        - [x] Task 5.4.2: Add expand/collapse functionality for nested objects *(Completed: 2025-11-26)*
        - [x] Task 5.4.3: Handle JSON parse errors gracefully *(Completed: 2025-11-26)*

- [x] **US5.5: Report Actions** [████████████] 2/2 tasks *(Completed: 2025-11-26)*

    As a **user**,
    I want **to download or copy report content**
    so that **I can share or save reports outside the app.**

    - **Acceptance Criteria:**
        - Given I am viewing a report,
          When I click "Download",
          Then the file downloads to my system.
        - Given I am viewing a report,
          When I click "Copy",
          Then the raw content is copied to clipboard.

    - **Tasks:**
        - [x] Task 5.5.1: Implement file download functionality *(Completed: 2025-11-26)*
        - [x] Task 5.5.2: Add copy raw content button *(Completed: 2025-11-26)*

---

### [ ] Epic 6: Polish & Non-Functional Requirements *(Target: Sprint 5)*
*Goal: Ensure the application meets quality, performance, and usability standards.*

- [ ] **US6.1: Loading & Error States** [░░░░░░░░░░░░] 0/3 tasks

    As a **user**,
    I want **clear feedback when actions are loading or fail**
    so that **I know the system is working and can recover from errors.**

    - **Acceptance Criteria:**
        - Given any API call is in progress,
          Then I see a loading indicator (spinner or skeleton).
        - Given an API call fails,
          Then I see an error message with retry option.
        - Given a recoverable error,
          Then I can dismiss the error and try again.

    - **Tasks:**
        - [ ] Task 6.1.1: Create `LoadingSpinner` and `SkeletonLoader` components *(Completed: YYYY-MM-DD)*
        - [ ] Task 6.1.2: Create `ErrorMessage` component with retry button *(Completed: YYYY-MM-DD)*
        - [ ] Task 6.1.3: Implement error boundary for unexpected errors *(Completed: YYYY-MM-DD)*

- [ ] **US6.2: Keyboard Accessibility** [░░░░░░░░░░░░] 0/2 tasks

    As a **keyboard user**,
    I want **to navigate and use the app without a mouse**
    so that **I can work efficiently with my preferred input method.**

    - **Acceptance Criteria:**
        - Given I press Tab,
          Then focus moves logically through interactive elements.
        - Given I press Enter or Space on a button or card,
          Then the action is triggered.

    - **Tasks:**
        - [ ] Task 6.2.1: Add proper `tabIndex` and focus styles *(Completed: YYYY-MM-DD)*
        - [ ] Task 6.2.2: Ensure all interactive elements are keyboard accessible *(Completed: YYYY-MM-DD)*

- [ ] **US6.3: Performance Optimization** [░░░░░░░░░░░░] 0/2 tasks

    As a **user**,
    I want **the app to load and respond quickly**
    so that **I don't waste time waiting.**

    - **Acceptance Criteria:**
        - Given I open the app,
          Then the initial page load is under 2 seconds.
        - Given I load a large report (1MB+),
          Then rendering completes within 500ms.

    - **Tasks:**
        - [ ] Task 6.3.1: Implement lazy loading for report viewer *(Completed: YYYY-MM-DD)*
        - [ ] Task 6.3.2: Add virtualization for large report content *(Completed: YYYY-MM-DD)*

---

## Non-Functional Requirements Checklist

### Performance
- [ ] Dashboard initial load < 2 seconds
- [ ] Path validation response < 500ms
- [ ] Report list load (100 files) < 1 second
- [ ] Markdown render (1MB file) < 500ms

### Usability
- [ ] Dark theme by default
- [ ] Responsive layout (1280px+ screens)
- [ ] Clear error messages with remediation steps
- [ ] Visual feedback for all user actions

### Security
- [ ] Backend only serves localhost
- [ ] No arbitrary file execution
- [ ] Path traversal protection on all file APIs

### Maintainability
- [ ] Component-based React architecture
- [ ] Consistent code style (ESLint + Prettier)
- [ ] Unit tests for critical functions

---

## Backlog Summary

### High Priority (P0) - MVP
- [x] Project setup (partial - scaffold exists)
- [ ] Audit type selection
- [ ] Path input with validation
- [ ] Bootstrap prompt generation
- [ ] Copy to clipboard
- [ ] Report folder selection
- [ ] Report listing
- [ ] Markdown rendering

### Medium Priority (P1) - Enhanced UX
- [ ] Folder browser modal
- [ ] Recent paths dropdown
- [ ] JSON viewer with expand/collapse
- [ ] Download reports
- [ ] Error handling with retry

### Low Priority (P2) - Post-MVP
- [ ] Saved projects management
- [ ] Report search/filtering
- [ ] Syntax highlighting in prompts
- [ ] Custom glob pattern editor

---

## Change Log

| Date | Change |
|------|--------|
| 2025-11-26 | Initial backlog created |
