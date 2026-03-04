# Product Requirements Document: Agentic Audit Workflow (n8n)

## 1. Executive Summary
This document outlines the requirements for transforming the existing manual "Trust No Code" AI audits (Security and Architecture) into an automated, agentic workflow using n8n. The goal is to eliminate the friction of manual prompt injection and context management, providing a "one-click" audit experience that leverages a Mixture-of-Experts (MoE) architecture.

## 2. Problem Statement
The current audit workflow requires users to:
1.  Manually copy-paste large prompt files.
2.  Manually edit file paths in prompts.
3.  Rely on a single chat session's context window, which often leads to "lazy" analysis or hallucinations when dealing with large codebases.
4.  Lack of structured, repeatable output formats (chat outputs vary).

## 3. Goals & Objectives
-   **Automation:** Fully automate the audit process from input (repo path) to output (report artifacts).
-   **Scalability:** Enable the system to handle larger codebases by compartmentalizing agent contexts.
-   **Reliability:** Implement the "Anti-Hallucination" protocol programmatically via specific QA nodes.
-   **Demonstrability:** Create a visual n8n workflow that clearly demonstrates the MoE pattern.

## 4. User Stories
-   **As a Developer**, I want to provide a GitHub URL or local path to an n8n workflow and receive a comprehensive security report without copy-pasting prompts.
-   **As a Tech Lead**, I want to run an architecture audit on every major PR automatically to track technical debt.
-   **As an Auditor**, I want to see the specific "Expert" findings in isolation before they are merged into the final report.

## 5. Functional Requirements

### 5.1. Inputs
-   **Repository Source:** Local path or Git URL.
-   **Audit Type:** `Security`, `Architecture`, or `Production`.
-   **Branch/Commit:** (Optional) Specific version to audit.
-   **Scan Scope:** `IncludeGlobs` / `ExcludeGlobs` configurations.

### 5.2. Core Workflow (The "Agentic Loop")
The n8n workflow will implement a directed graph representing the Mixture-of-Experts.

#### Phase 1: Ingestion & Mapping
-   **Node 1: Context Loader:** Clones repo or reads local files.
-   **Node 2: Repository Mapper (Agent):** Scans file tree, identifies languages/frameworks, and selects "Key Files" for analysis. *Output: JSON list of relevant file paths.*

#### Phase 2: Expert Analysis (Parallel Execution)
The workflow branches based on the Audit Type. Each "Expert" is a separate AI Agent node with access to the `read_file` tool and specific system prompts derived from the original audit files.

**Scenario A: Security Audit Branch**
1.  **Static Threat Hunter Agent:** Scans for patterns (regex/AST) in key files.
2.  **Secrets Analyst Agent:** Checks config/env files for hardcoded credentials.
3.  **Client Security Agent:** Analyzes frontend code (XSS, state management).
4.  **Network & Telemetry Agent:** Maps API calls and tracking pixels.
5.  **Compliance Agent:** Maps findings to standards (ISO27001, GDPR).

**Scenario B: Architecture Audit Branch**
1.  **Layering Expert Agent:** Analyzes folder structure and dependencies.
2.  **Domain Expert Agent:** Evaluates business logic encapsulation.
3.  **Component Expert Agent:** Reviews UI/Component reusability.
4.  **Testing Expert Agent:** Assesses test coverage and quality.

-   **Artifacts:**
    -   `[Audit_Type]_Report.md`: Human-readable executive summary and details.
    -   `findings.json`: Structured machine-readable data (for CI/CD blocking).
-   **Notification:** Slack/Email/Discord notification with report summary.

## 6. Technical Architecture (n8n Specification)

### 6.1. Nodes Required
-   **Git Node:** For cloning/pulling repositories.
-   **Local File System Node:** For reading code contents dynamically.
-   **AI Agent Node (LangChain):**
    -   **Model:** Claude 3.5 Sonnet or GPT-4o (High context window required).
    -   **Tools:** `read_file`, `list_dir`, `grep`.
-   **Switch Node:** To route between Security and Architecture flows.
-   **Merge Node:** To aggregate parallel expert outputs.

### 6.2. Data Flow
1.  `Trigger` -> `Git Clone` -> `File System Read`
2.  `File System` -> `Repo Mapper Agent` -> `List of Files`
3.  `List of Files` -> `Split In Batches` (if necessary) -> `Expert Agents`
4.  `Expert Agents` -> `JSON Findings` -> `QA ,t`, and Production
5.  `QA Agent` -> `JSON Findings (Validated)` -> `Report Writer`
6.  `Report Writer` -> `Write File`

## 7. Success Metrics
-   **Reduction in Setup Time:** From ~5 mins (manual copy-paste) to <30 seconds (workflow trigger).
-   **Success Rate:** 95% of runs complete without "context limit" errors (handled by n8n batching/mapping).
-   **Finding Accuracy:** QA Node rejects >80% of hallucinated findings (verified by human review in testing).

## 8. Roadmap
-   **Phase 1 (MVP):** Single n8n workflow supporting Local Path inputs and Security Audit only.
-   **Phase 2:** Add Architecture and Production Audits, and Git URL support.
-   **Phase 3:** Integration with GitHub Webhooks (auto-audit PRs).
