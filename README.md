# ScopeLock
### Scope & Change-Order Management Platform for Software Agencies

**ScopeLock** is a B2B SaaS platform designed to help software development agencies, freelance development teams, and IT consulting firms manage project scope, track requirement changes, and formalize client approvals.

Its primary objective is to eliminate ambiguity around project deliverables and prevent untracked scope expansion by maintaining a structured, versioned, and tamper-evident record of everything agreed upon between an agency and its client.

---

## 1. The Problem

Scope disagreements are a recurring problem in software development engagements.

A project begins with an agreed proposal or Statement of Work (SOW). During development, clients introduce additional requirements, modify existing functionality, or request changes to previously agreed deliverables.

Without a formal mechanism for tracking these changes, agencies frequently encounter:

- Unpaid work resulting from undocumented scope expansion.
- Disagreements over whether a feature was included in the original agreement.
- Unclear project timelines and unexpected delivery delays.
- Inconsistent communication between project managers, developers, and clients.
- Missing records of who requested, approved, or rejected a particular change.

Most teams manage these processes through a combination of PDFs, email threads, spreadsheets, and project management tools.

ScopeLock aims to provide a centralized system of record for the entire scope lifecycle.

## 2. Product Overview

ScopeLock establishes a structured workflow around three fundamental concepts:

1. **Scope Baseline:** A versioned and approved representation of the original project agreement, including deliverables, requirements, exclusions, pricing, and milestones.
2. **Change Request:** A formal request to introduce, modify, or remove something relative to the currently approved baseline.
3. **Change Order:** A documented agreement describing the approved modification, its financial implications, and its impact on the project timeline.

Every approved change results in a new scope baseline, preserving the complete history of the engagement.

### What ScopeLock is not

ScopeLock is intentionally focused on scope governance rather than general project management.

It is not:
- A task or sprint management system.
- A replacement for project management platforms such as Jira or Asana.
- A legal e-signature service.
- An invoicing or accounting platform.

Its responsibility is to establish clarity, traceability, and accountability around project scope and subsequent changes.

## 3. Target Users

| User | Primary Responsibility |
|---|---|
| Agency Owner | Oversees engagements, commercial agreements, and approvals. |
| Project Manager | Maintains project scope, evaluates requests, and prepares estimates. |
| Technical Lead | Evaluates technical implications and implementation effort. |
| Contributor | Reviews project scope and submits change requests. |
| Client Approver | Reviews and approves or rejects proposed changes. |
| Client Viewer | Accesses shared project information and approval history. |

The platform follows a multi-tenant architecture, allowing multiple independent organizations to manage their projects and clients within the same application.

## 4. Core Functional Modules

### 4.1 Project and Client Management

- Organization and team management.
- Client registration and management.
- Project creation and configuration.
- Project-level member assignments.
- Role-based access and permissions.
- Organization-level data isolation.

### 4.2 Document Ingestion and Scope Extraction

Agencies can upload their existing project proposals, contracts, and Statements of Work.

The intended document processing pipeline will:

- Extract structured text from PDF and DOCX documents.
- Identify deliverables, requirements, exclusions, assumptions, pricing, and milestones.
- Use LLM-assisted extraction to propose structured scope items.
- Associate extracted items with their original document passages.
- Allow human review and modification before establishing a baseline.

AI-generated extractions will always remain drafts until reviewed and explicitly approved by an authorized user.

### 4.3 Scope Baseline Management

The scope baseline represents the authoritative record of agreed project scope.

Key capabilities include:

- Structured deliverable and requirement management.
- Explicit exclusion and assumption tracking.
- Baseline versioning.
- Approval and freezing of baseline versions.
- Content hashing for integrity verification.
- Comparison between historical baseline versions.

Approved baselines are immutable. Subsequent modifications must be represented through a new version rather than silently changing an existing agreement.

### 4.4 Change Request Management

Agency members and authorized client users can submit requests to modify existing project scope.

Each change request will contain:

- Request title and description.
- Associated project and baseline.
- Supporting attachments.
- Scope classification.
- Impact assessment.
- Current workflow status.

The planned workflow supports the following states:

`submitted → under_review → classified → estimating → quoted → client_review → approved / rejected`

Requests can also be withdrawn where permitted.

### 4.5 Scope Classification

ScopeLock will include an AI-assisted scope evaluation mechanism.

A submitted change request will be evaluated against the current baseline, including:

- Existing deliverables.
- Acceptance criteria.
- Explicit exclusions.
- Previously approved modifications.

The system will propose one of three classifications:

- **In Scope:** The requested functionality appears to be covered by existing agreements.
- **Out of Scope:** The request introduces functionality beyond the approved baseline.
- **Ambiguous:** The existing agreement does not provide sufficient clarity for a confident determination.

AI recommendations will include references to relevant baseline items.

Final classification remains under human control, and any override must be accompanied by a recorded reason.

### 4.6 Impact Assessment and Estimation

Project managers can estimate the commercial and scheduling implications of proposed changes.

The estimation engine will support:

- Effort estimation by role.
- Configurable hourly rates.
- Fixed additional costs.
- Contingency percentages.
- Discounts.
- Fixed-price and time-and-materials estimation modes.
- Milestone adjustments.
- Revised project completion dates.

Financial calculations will use decimal arithmetic to avoid floating-point precision issues.

Historical estimates will retain snapshots of the rates used when they were created.

### 4.7 Approval Management

ScopeLock will provide structured approval workflows for baselines and change orders.

Planned capabilities include:

- Configurable approval chains.
- Sequential and parallel approvals.
- Internal and external approvers.
- Approval, rejection, and revision requests.
- Approval comments and timestamps.
- Expiring client access links.
- Notifications and reminders.

Each approval will be associated with the exact version of the artifact being approved.

If an artifact changes after an approval request is issued, the previous request must be invalidated and a new approval request created.

### 4.8 Change Order Generation

Once a change request has been estimated and quoted, ScopeLock will generate a formal Change Order document.

The document will include:

- Original baseline reference.
- Change request description.
- Scope classification and reasoning.
- Affected deliverables.
- Itemized cost breakdown.
- Timeline impact.
- Revised project totals.
- Approval information.
- Document integrity hash.

Generated documents will be versioned rather than overwritten.

### 4.9 Audit History and Integrity Verification

Every significant operation will generate an audit event.

The planned audit system will use an append-only, hash-chained event structure.

Each event will contain:

- Event identifier.
- Organization and project references.
- Event type.
- Associated entity.
- Actor information.
- Event payload.
- Timestamp.
- Previous event hash.
- Current event hash.

Hashes will be calculated using SHA-256 over a canonical representation of the event and its predecessor.

A verification mechanism will recompute the chain and identify inconsistencies.

The system aims to provide tamper-evident history and write-restricted audit records. It does not claim that database-backed records are mathematically impossible to alter.

---

## 5. System Architecture

ScopeLock is designed around a modular monolith architecture.

The initial architecture prioritizes clear module boundaries, transactional consistency, maintainability, and the ability to evolve individual components without introducing premature microservice complexity.

### High-Level Architecture

```text
                  ┌──────────────────────────┐
                  │     Next.js Frontend     │
                  │                          │
                  │  Agency Dashboard        │
                  │  Client Portal            │
                  │  Approval Interfaces     │
                  └────────────┬─────────────┘
                               │
                               ▼
                  ┌──────────────────────────┐
                  │      FastAPI Backend     │
                  │                          │
                  │  Authentication          │
                  │  Project Management      │
                  │  Baseline Management     │
                  │  Change Requests         │
                  │  Estimation Engine       │
                  │  Approval Management     │
                  │  Audit Management        │
                  └────────────┬─────────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌────────────┐   ┌────────────┐   ┌────────────┐
       │ PostgreSQL │   │   Redis    │   │   MinIO    │
       │            │   │            │   │            │
       │ Structured │   │ Job Queue  │   │ Documents  │
       │ Data       │   │            │   │ Attachments│
       │ Audit Log  │   │ Workers    │   │ PDFs       │
       └────────────┘   └─────┬──────┘   └────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Background Tasks │
                    │                  │
                    │ Document Parsing │
                    │ PDF Generation   │
                    │ Notifications    │
                    │ Webhook Delivery │
                    └──────────────────┘
```

### Technology Stack

| Component | Technology | Purpose |
|---|---|---|
| Frontend | Next.js, TypeScript | Web application and client portal |
| UI Styling | Tailwind CSS | Responsive interface |
| Backend | Python, FastAPI | REST API and application logic |
| Database | PostgreSQL | Relational data persistence |
| ORM | SQLAlchemy 2.x | Database interaction |
| Migrations | Alembic | Database schema versioning |
| Background Jobs | Redis + Celery | Asynchronous task execution |
| Object Storage | MinIO / S3-compatible storage | Documents and generated artifacts |
| Document Processing | PyMuPDF, pdfplumber, python-docx | PDF and DOCX extraction |
| PDF Generation | WeasyPrint, Jinja2 | Change orders and reports |
| AI Integration | Provider-agnostic LLM abstraction | Structured extraction and scope evaluation |
| Testing | Pytest | Unit and integration testing |
| Infrastructure | Docker Compose | Local development environment |
| CI/CD | GitHub Actions | Automated validation and testing |

---

## 6. Engineering Principles

The following principles will guide implementation decisions.

**1. Modular Monolith First**

The initial implementation will use clearly separated application modules rather than independently deployed microservices.

**2. Domain Logic Independent of Frameworks**

Business rules, workflow transitions, financial calculations, and baseline comparison logic should remain independent of FastAPI and infrastructure-specific concerns.

**3. Multi-Tenant Isolation**

All organization-owned data must be scoped to the appropriate tenant. Cross-organization access must be prevented at the application and, where appropriate, database levels.

**4. Explicit State Transitions**

Business workflows will use defined state machines with explicit transition rules, authorization checks, and transactional side effects.

**5. Immutable Approved Artifacts**

Approved baselines, approval decisions, and generated document versions must retain their historical identity and content.

**6. Auditable Operations**

Significant state changes must produce corresponding audit events.

**7. AI as an Assistive Layer**

LLMs can propose classifications, extract structured information, and provide recommendations. They must never independently approve scope, modify frozen baselines, or trigger consequential business operations without validated application logic and human authorization.

**8. Testable Financial Logic**

Cost and timeline calculations must be implemented as deterministic domain functions with dedicated tests.

---

## 7. Security and Data Protection

Project proposals, contracts, pricing information, and client communications can contain commercially sensitive information.

Security is therefore a core architectural requirement.

The planned security controls include:

- Organization-level tenant isolation.
- Role-based access control.
- Explicit authorization checks on protected operations.
- Secure password hashing.
- Rate limiting for authentication endpoints.
- Signed, expiring, single-use client access tokens.
- Validation of uploaded files and file size limits.
- Short-lived document download URLs.
- Environment-based secret management.
- Restricted access to internal comments, pricing margins, and attachments.
- Audit logging of significant actions.
- Cross-tenant access and authorization testing.

Uploaded documents will be treated as untrusted input, particularly when processed by LLM-based components.

Structured output validation, source verification, and human review will be required before extracted information can become part of an approved baseline.

---

## 8. Testing Strategy

Testing will focus particularly on business invariants and workflow correctness.

| Testing Layer | Areas of Focus |
|---|---|
| Unit Tests | Cost calculations, timeline calculations, baseline diffing, state transitions |
| Property-Based Tests | Workflow invariants, calculation properties, baseline consistency |
| Integration Tests | API endpoints, database transactions, tenant isolation |
| Document Tests | Extraction accuracy, source references, hallucination prevention |
| Security Tests | Authorization, cross-tenant access, token validation, audit integrity |
| End-to-End Tests | Project creation, baseline approval, change request, estimation, approval, new baseline |

The target is at least 85% test coverage for core domain modules, with automated CI checks preventing failing tests from being merged.

---

## 9. Development Roadmap

Development will follow incremental phases, with each phase intended to produce a demonstrable improvement to the application.

| Phase | Focus | Planned Deliverables |
|---|---|---|
| 0 | Foundation | Repository setup, Docker environment, authentication, tenant isolation, CI |
| 1 | Baseline Core | Projects, clients, structured scope, baseline versioning, approval, audit log |
| 2 | Change Management | Change requests, workflow engine, estimation, approvals, baseline generation |
| 3 | Documents & Reports | Document uploads, storage, PDF generation, client access |
| 4 | Intelligent Extraction | LLM-assisted document parsing, structured extraction, source references |
| 5 | Scope Intelligence | AI-assisted scope classification, retrieval, citations, dashboard |
| 6 | Hardening & Integrations | Security improvements, observability, webhooks, Slack and Jira integrations |

The initial development priority is a functional scope-management core. AI-based functionality will be introduced only after the underlying domain model and workflows are reliable.

---

## 10. Current Development Status

ScopeLock is being developed incrementally.

The repository is intended to evolve from its foundational architecture into a functional scope-management platform.

Planned capabilities and architectural decisions documented in this README should not be interpreted as claims that those capabilities are already implemented.

Implementation status will be reflected through actual repository code, tests, documentation, and subsequent releases.

---

## 11. Project Boundaries and Non-Goals

To maintain a focused product direction, the following capabilities are outside the initial scope:

- General-purpose task and sprint management.
- Full accounting and invoicing.
- Payroll and employee management.
- Legally certified electronic signature workflows.
- Automatic contractual interpretation without human review.
- Autonomous approval or rejection of client requests.

The system is intended to complement existing agency workflows rather than replace every tool used by an agency.

---

## 12. Long-Term Direction

Beyond the initial release, potential extensions include:

- Scope drift analytics showing financial and scheduling deviations from the original agreement.
- Ambiguity detection in proposals before client approval.
- Estimate accuracy analysis using historical project data.
- Reusable scope templates for common project categories.
- Integration with time-tracking platforms.
- Revenue recovery analytics.
- Public document hash verification.
- Deeper integrations with GitHub, Jira, and Slack.

The long-term objective is to make ScopeLock a reliable source of truth for the commercial and operational boundaries of software development engagements.

---

## 13. Repository and Contribution Philosophy

Development will prioritize:

- Small, focused, and meaningful commits.
- Explicit architectural decisions.
- Consistent naming and domain terminology.
- Reproducible development environments.
- Automated testing and validation.
- Documentation of important technical trade-offs.
- Separation of business logic from infrastructure.
- Backward-compatible API and database evolution wherever practical.

The project is intended to remain actively developed, with its architecture and implementation evolving as requirements become clearer.

---

**ScopeLock — Know what was agreed. Control what changes.**