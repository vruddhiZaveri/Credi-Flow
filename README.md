# LendFlow

### End-to-End Digital Loan Origination & Product Analytics Platform

LendFlow is a full-stack portfolio project that explores how a personal loan application can move from product discovery and affordability estimation to application submission, simulated eligibility assessment, and status tracking.

The project combines software development with product management. Alongside the application, it will document user needs, feature prioritization, acceptance criteria, product metrics, and implementation trade-offs.

**Target role:** Associate Product Manager — Retail Assets / Digital Lending  
**Initial lending product:** Personal Loans  
**Development approach:** Incremental implementation with learning and documentation at each stage

> LendFlow is an educational simulation. It does not issue loans, perform real KYC, access credit bureaus, or make actual lending decisions. Use synthetic data during development.

---

## 1. Current Project Status

The frontend starter has been extracted, dependencies have been installed, and the Vite development server starts successfully.

### Verified

- The project root contains `package.json`.
- `npm install` completes successfully.
- The latest installation reported zero vulnerabilities.
- `npm run dev` starts Vite.
- The development server selected port `5174` because port `5173` was occupied.
- The application URL can be opened locally.

### Pending Verification

- Existing frontend screens and navigation.
- EMI calculator behavior.
- Application form validation and submission.
- Responsive layouts and accessibility.
- Production build.
- Existing source-code structure and implementation quality.

### Planned

- FastAPI backend.
- PostgreSQL database.
- Persistent loan applications.
- Simulated eligibility and affordability rules.
- Mock KYC workflow.
- Application status history.
- Internal review dashboard.
- Product analytics and funnel reporting.
- Automated tests and deployment.

A feature listed in this README is not necessarily implemented. The roadmap describes the intended scope.

---

## 2. Product Problem

Borrowers may struggle to understand loan affordability, complete lengthy forms, and track application progress.

Internal lending teams need visibility into pending applications, review exceptions, processing times, and reasons for customer drop-off.

LendFlow explores these problems through two connected experiences:

1. A borrower journey for discovering, applying for, and tracking a personal loan.
2. An internal experience for reviewing applications and measuring the lending funnel.

These are initial product hypotheses. User research and usability testing will help validate them.

---

## 3. Product Goals

- Make loan information and repayment estimates easy to understand.
- Help borrowers complete an application with clear validation and guidance.
- Provide transparent explanations for simulated eligibility outcomes.
- Give borrowers visibility into application progress.
- Help operations teams identify applications requiring attention.
- Measure conversion, abandonment, and processing time.
- Demonstrate product thinking through documented priorities and trade-offs.

### MVP Non-Goals

- Actual loan disbursal or payment collection.
- Real credit bureau integrations.
- Production identity verification.
- Live banking integrations.
- Automated real-world credit decisions.
- A complete loan servicing or collections platform.

---

## 4. Target Users

| User | Primary Need | Planned Experience |
|---|---|---|
| Borrower | Understand affordability and apply conveniently | Loan discovery, EMI calculator, application form, tracking |
| Credit/Risk Analyst | Understand simulated decision factors | Eligibility explanations and review queue |
| Operations Team | Monitor application progress and exceptions | Application list, status updates, processing history |
| Product Manager | Understand journey performance | Funnel metrics, drop-offs, turnaround times |

---

## 5. Feature Scope and Priorities

### P0 — Minimum Viable Product

| Feature | Purpose |
|---|---|
| Loan discovery | Explain the initial personal loan offering |
| EMI calculator | Estimate monthly repayments |
| Multi-step application | Collect applicant and loan details |
| Mock eligibility engine | Produce explainable simulated outcomes |
| Application tracking | Show the current application status |

### P1 — Next Iteration

| Feature | Purpose |
|---|---|
| Mock KYC | Demonstrate verification steps using synthetic data |
| Operations dashboard | Review pending applications and exceptions |
| Product analytics | Measure conversion, drop-offs, and processing times |
| Configurable rules | Adjust simulated policy thresholds centrally |
| Status history and audit events | Record important workflow changes |

### P2 — Advanced Enhancements

| Feature | Purpose |
|---|---|
| AI-based risk insights | Explore explainable insights using suitable synthetic data |
| A/B experimentation | Evaluate changes to the customer journey |
| Additional loan products | Extend the platform after validating the initial workflow |

Priorities may change as implementation and research reveal new constraints.

---

## 6. Technology Stack

### Current Frontend

| Technology | Purpose |
|---|---|
| React 19 | Build reusable user interface components |
| TypeScript 5 | Add static types and improve development feedback |
| Vite 6 | Run the development server and build frontend assets |
| Lucide React | Provide interface icons |
| npm | Manage frontend dependencies and scripts |

Exact installed versions are recorded in `package-lock.json`.

### Planned Backend

| Technology | Purpose |
|---|---|
| Python | Implement backend services and business logic |
| FastAPI | Expose HTTP endpoints |
| Pydantic | Validate request and response data |
| PostgreSQL | Store applications, decisions, events, and history |

The database access library, migration tooling, authentication approach, and hosting providers will be selected during implementation.

---

## 7. Planned Architecture

```text
Borrower Interface / Internal Dashboard
                  |
           React + TypeScript
                  |
             HTTP / JSON
                  |
              FastAPI API
                  |
    Application and Business Logic
                  |
              PostgreSQL
```

The initial backend is planned as one application with separate modules:

- Application management.
- Eligibility and affordability.
- Mock verification.
- Analytics.
- Status history and audit events.

These modules do not require separate deployed services for the MVP.

### Example Planned Request Flow

1. A borrower completes the application form.
2. The frontend sends the application to the API.
3. Pydantic validates the request structure.
4. Business rules validate the application.
5. The application is stored in PostgreSQL.
6. The simulated eligibility engine evaluates the inputs.
7. The decision and explanation are recorded.
8. The frontend displays the result and tracking information.

This flow is planned and is not yet verified as implemented.

---

## 8. Project Structure

### Confirmed Root Structure

```text
LENDFLOW/
├── src/
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

The original starter ZIP may also be present in the root.

### Local Development Environment

```text
LENDFLOW/
└── .venv/              # Local Python environment; created during setup
```

### Proposed Future Structure

```text
LENDFLOW/
├── src/                 # React application
├── backend/             # Future FastAPI application
├── docs/                # Product and technical documentation
├── .venv/               # Local Python environment; excluded from Git
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

Future folders will be introduced when their implementation begins.

---

## 9. Prerequisites

For local development, install:

- Node.js with npm.
- Python 3.
- Visual Studio Code or another editor.
- Git for version control.

PostgreSQL will be required when database implementation starts.

Check the available tools:

```powershell
node --version
npm --version
python --version
git --version
```

If Windows exposes Python through the launcher, use:

```powershell
py --version
```

---

## 10. Frontend Setup

Open PowerShell in the project directory:

```powershell
cd "C:\1_PLACEMENT\FINAL PROJECTS\LENDFLOW"
```

Install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

Open the Local URL printed in the terminal.

Example:

```text
http://localhost:5173/
```

If that port is occupied, Vite may choose another port:

```text
http://localhost:5174/
```

Keep the terminal running while using the application.

Stop the server with:

```text
Ctrl + C
```

### Available npm Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Run the configured TypeScript build followed by the Vite build |
| `npm run preview` | Preview an existing production build locally |

Create and preview a production build:

```powershell
npm run build
npm run preview
```

The preview command is intended for local verification.

---

## 11. Python Virtual Environment Setup

A virtual environment isolates the backend's Python dependencies from other Python projects.

It is independent of the frontend's `node_modules` directory.

### Create the Environment

Run from the project root:

```powershell
python -m venv .venv
```

Alternative using the Windows Python launcher:

```powershell
py -m venv .venv
```

### Activate in PowerShell

```powershell
.\.venv\Scripts\Activate.ps1
```

The terminal prompt should show:

```text
(.venv) PS C:\1_PLACEMENT\FINAL PROJECTS\LENDFLOW>
```

### Update pip

After activation:

```powershell
python -m pip install --upgrade pip
```

### Check the Interpreter

```powershell
python -c "import sys; print(sys.executable)"
```

The path should point to:

```text
LENDFLOW\.venv\Scripts\python.exe
```

### Select the Environment in VS Code

1. Install the Python extension if required.
2. Press `Ctrl + Shift + P`.
3. Select `Python: Select Interpreter`.
4. Choose `.venv\Scripts\python.exe`.

### Deactivate

```powershell
deactivate
```

Activation applies to the current terminal session. React can run in a separate terminal without activating the Python environment.

Backend dependencies and startup commands will be documented when the backend is implemented.

---

## 12. Development Workflow

Use separate terminals when running the frontend and backend.

### Terminal 1 — Frontend

```powershell
cd "C:\1_PLACEMENT\FINAL PROJECTS\LENDFLOW"
npm run dev
```

### Terminal 2 — Python Work

```powershell
cd "C:\1_PLACEMENT\FINAL PROJECTS\LENDFLOW"
.\.venv\Scripts\Activate.ps1
```

There is currently no verified backend startup command.

### Feature Development Approach

For each feature:

1. Define the user problem.
2. Write a user story.
3. Define acceptance criteria.
4. Identify the relevant screens and data.
5. Implement the smallest useful version.
6. Verify normal, invalid, and boundary inputs.
7. Document behavior and trade-offs.
8. Add analytics where appropriate.

---

## 13. Planned Borrower Journey

1. Discover the personal loan offering.
2. Estimate repayments using the EMI calculator.
3. Start an application.
4. Enter personal and employment details.
5. Enter income, obligations, and loan requirements.
6. Review the information and provide required consent.
7. Submit the application.
8. Receive a simulated eligibility result or review status.
9. Track application progress.

The exact form fields, step order, and consent copy will be defined in the product requirements.

---

## 14. EMI Calculator

The planned calculator estimates a fixed monthly repayment for a reducing-balance loan.

### Formula

```text
EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
```

Where:

- `P` = loan principal.
- `r` = monthly interest rate as a decimal.
- `n` = number of monthly installments.

For an annual interest rate expressed as a percentage:

```text
r = annualInterestRate / (12 × 100)
```

### Zero-Interest Case

When the interest rate is zero:

```text
EMI = P / n
```

### Planned Outputs

- Estimated monthly EMI.
- Total repayment.
- Total interest.

### Planned Validation

- Principal must be greater than zero.
- Tenure must be a positive whole number of months.
- Interest rate cannot be negative.
- Inputs must be finite numbers.
- Calculations must handle a zero interest rate.
- Display rounding must be consistent.

The estimate will exclude fees and other charges unless explicitly modeled. Actual lender repayment schedules may differ.

Existing calculator behavior still requires source review and verification.

---

## 15. Simulated Eligibility Engine

The planned eligibility engine will use transparent, configurable rules.

Potential inputs include:

- Applicant age.
- Employment type.
- Monthly income.
- Existing monthly debt obligations.
- Requested loan amount.
- Requested tenure.
- Estimated EMI.

### Example Affordability Measure

```text
FOIR =
(Existing Monthly Debt Obligations + Proposed EMI)
÷ Monthly Income
× 100
```

FOIR means Fixed Obligations to Income Ratio.

The application must handle missing or zero income before calculating this ratio.

### Possible Simulated Outcomes

- Eligible under demo rules.
- Requires manual review.
- Not eligible under demo rules.

Each result should include clear reasons linked to the configured rules.

Thresholds will be defined as demonstration policy choices. They will not be presented as actual lender policies.

---

## 16. Planned Application Lifecycle

A proposed lifecycle is:

```text
Draft → Submitted → Under Review → Approved / Rejected
```

Additional stages, such as mock verification, may be introduced after the core flow works.

### Workflow Requirements

- Enforce permitted status transitions.
- Record when a status changes.
- Record who or what initiated the change.
- Preserve the previous status.
- Display understandable status descriptions to borrowers.
- Prevent unauthorized updates.

Approval represents a simulated application outcome. It does not indicate real disbursal.

---

## 17. Planned Data Model

| Entity | Purpose |
|---|---|
| Applicant | Store synthetic applicant details |
| Loan Application | Store requested terms and application state |
| Eligibility Decision | Store the simulated outcome and reasons |
| Verification Record | Store mock verification progress |
| Status History | Record lifecycle changes |
| Analytics Event | Record product interactions |
| Audit Event | Record important system actions |
| Rule Configuration | Store versioned demo policy settings |

The final schema, relationships, and retention approach will be designed during backend development.

---

## 18. Product Analytics

Analytics should explain where users struggle and how efficiently applications are processed.

### Proposed Events

- `loan_page_viewed`
- `emi_calculated`
- `application_started`
- `application_step_completed`
- `application_validation_failed`
- `application_submitted`
- `eligibility_evaluated`
- `application_status_viewed`

Event properties should avoid raw personal identifiers and sensitive applicant information.

### Proposed Metrics

| Metric | Definition |
|---|---|
| Application completion rate | Submitted applications divided by started applications within a defined cohort |
| Step conversion rate | Applications reaching the next step divided by those entering the current step |
| Step abandonment rate | Applications that do not progress within a defined observation window |
| Decision turnaround time | Time from submission to the first recorded eligibility decision |
| Manual review rate | Applications routed to review divided by evaluated applications |
| Validation failure rate | Defined validation failures divided by relevant form attempts |

Metric definitions must specify the time window, cohort, denominator, and treatment of retries.

Synthetic demo activity will not be described as real customer performance.

---

## 19. Product Management Deliverables

### Product Requirements Document

- Problem statement.
- Product vision.
- Target users.
- User needs and assumptions.
- MVP scope.
- Functional requirements.
- Non-functional requirements.
- Success metrics.
- Constraints and dependencies.

### UX Deliverables

- Borrower journey map.
- Internal review journey.
- Low-fidelity wireframes.
- Desktop and mobile designs.
- Form validation and error states.
- Figma prototype.
- Usability observations.

### Planning Deliverables

- Prioritized backlog.
- User stories.
- Acceptance criteria.
- MoSCoW or RICE prioritization.
- Release milestones.
- Product decision log.

### Final Case Study

- Problem and intended audience.
- Research and assumptions.
- Scope and prioritization.
- UX decisions.
- Architecture and implementation.
- Testing evidence.
- Analytics design.
- Trade-offs and limitations.
- Future improvements.

---

## 20. Testing Strategy

### Frontend

- Verify EMI calculations, including zero interest.
- Verify form validation and error messages.
- Verify navigation between application steps.
- Verify retention of entered data while navigating.
- Verify loading, empty, and error states.
- Check keyboard navigation and labels.
- Check desktop and mobile layouts.

### Backend — Planned

- Request and response validation.
- Eligibility rule boundaries.
- Invalid and missing inputs.
- Database persistence.
- Permitted status transitions.
- Authorization for internal actions.
- Error handling.

### End-to-End — Planned

- Complete a valid application.
- Correct invalid inputs and resubmit.
- Retrieve application status.
- Route an application to manual review.
- Verify analytics events without duplication.

### Current Validation

- Dependency installation: completed.
- Development server startup: completed.
- Production build: pending.
- Functional testing: pending.
- Automated tests: not yet verified.

Testing tools will be selected as implementation progresses.

---

## 21. Data Handling and Configuration

- Use synthetic applicant data during development.
- Do not commit real identity documents or financial details.
- Store backend secrets in environment variables.
- Exclude local `.env` files from Git.
- Use an `.env.example` file with placeholder values when configuration is introduced.
- Validate data on the backend even when frontend validation exists.
- Avoid logging sensitive form contents.
- Add authorization before exposing internal workflows.

Frontend environment variables are visible to the browser and must not contain secrets.

---

## 22. Git Ignore Recommendations

Add the following entries to the root `.gitignore`:

```gitignore
# Frontend dependencies and build output
node_modules/
dist/
*.tsbuildinfo

# Python environment and generated files
.venv/
__pycache__/
*.py[cod]
.pytest_cache/
.mypy_cache/
.ruff_cache/
.coverage
htmlcov/

# Local environment configuration
.env
.env.*
!.env.example

# Logs
*.log

# Operating system files
.DS_Store
Thumbs.db
```

Commit source files, `package.json`, and `package-lock.json`.

Do not commit `.venv` or `node_modules`. These directories can be recreated from dependency configuration.

---

## 23. Troubleshooting

### npm Cannot Find package.json

Confirm the current directory:

```powershell
Get-Location
Test-Path .\package.json
```

Run npm commands from the folder containing `package.json`.

### Port 5173 Is Already in Use

Use the Local URL Vite prints after selecting another port.

If an extra development server is running, stop it with `Ctrl + C` in its terminal.

### Python Is Not Recognized

Try:

```powershell
py --version
```

If available, create the environment with:

```powershell
py -m venv .venv
```

### PowerShell Blocks Environment Activation

Allow scripts for the current PowerShell process:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
```

Then activate:

```powershell
.\.venv\Scripts\Activate.ps1
```

### VS Code Uses the Wrong Python Interpreter

Open the command palette and select:

```text
Python: Select Interpreter
```

Choose:

```text
.venv\Scripts\python.exe
```

### The Browser Shows an Unexpected Version

Confirm that the browser URL matches the Local URL in the terminal running the intended project.

---

## 24. Development Roadmap

### Phase 1 — Validate the Starter

- Inspect source files.
- Identify implemented features.
- Verify the browser interface.
- Verify the EMI calculator.
- Verify application interactions.
- Run the production build.

### Phase 2 — Define the Product

- Write the PRD.
- Define personas and journeys.
- Prioritize the MVP.
- Write user stories and acceptance criteria.
- Define success metrics.

### Phase 3 — Improve the Frontend

- Create reusable components.
- Implement responsive layouts.
- Add accessible forms.
- Improve validation and feedback.
- Add loading, empty, and error states.

### Phase 4 — Add Backend and Persistence

- Create the FastAPI application.
- Define request and response models.
- Design the database schema.
- Add migrations and persistence.
- Connect frontend requests to the API.

### Phase 5 — Implement Lending Simulation

- Add configurable eligibility rules.
- Add affordability calculations.
- Add mock verification.
- Implement status transitions.
- Add explanations and audit history.

### Phase 6 — Add Analytics and Internal Tools

- Instrument product events.
- Build funnel reporting.
- Add an operations dashboard.
- Measure turnaround time and review queues.
- Define experiment hypotheses and guardrails.

### Phase 7 — Test, Deploy, and Present

- Complete appropriate automated tests.
- Verify deployment configuration.
- Deploy the application.
- Update documentation.
- Prepare the product case study.
- Write evidence-based resume bullets.

---

## 25. Learning Objectives

This project is being built step by step to understand:

- React components, state, and events.
- TypeScript types and interfaces.
- Form design and validation.
- REST APIs and HTTP.
- FastAPI and Pydantic.
- Relational database design.
- Business rules and workflow transitions.
- Product instrumentation and metrics.
- Testing and debugging.
- Git and deployment.
- Product requirements, prioritization, and trade-offs.

For each major feature, the documentation should explain:

1. What problem it solves.
2. Why the approach was chosen.
3. Where the code belongs.
4. How data moves through the system.
5. How the behavior is verified.
6. What it demonstrates from a product management perspective.

---

## 26. Author

**Vruddhi Zaveri**

LendFlow is a portfolio and learning project focused on digital lending workflows, full-stack development, and product management.