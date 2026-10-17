import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Wallet,
  Check,
  CheckCircle2,
  CircleHelp,
  ShieldCheck,
  Clock3,
  Calculator,
  FileText,
  LayoutDashboard,
  Menu,
  X,
  TrendingUp,
  BarChart3,
  BadgeCheck,
  IndianRupee,
  CreditCard,
  Sparkles,
  Info,
  LockKeyhole,
  AlertCircle,
} 
from "lucide-react";
import "./style.css";
import type { LoanForm, InputField } from "./types/loan";
import { validateField, firstInvalidField, personalFields, financeFields, allowedTenures } from "./utils/validation";

type Page = "home" | "calculator" | "apply" | "tracking" | "insights";
type FormData = LoanForm;
type Decision = {
  status: "Preliminary eligible" | "Manual review" | "Outside demo criteria";
  reason: string;
  maxAmount: number;
  emi: number;
  id: string;
};
const formatINR = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
const emi = (p: number, annual: number, months: number) => {
  const r = annual / 1200;
  return r === 0
    ? p / months
    : (p * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
};
const interest = 11.5;
const initial: FormData = {
  name: "",
  email: "",
  phone: "",
  income: "",
  employment: "Salaried",
  existingEmi: "0",
  requested: "300000",
  tenure: "36",
  consent: false,
};
const screens: { key: Page; label: string }[] = [
  { key: "home", label: "Overview" },
  { key: "calculator", label: "EMI calculator" },
  { key: "apply", label: "Apply for loan" },
  { key: "tracking", label: "Track application" },
  { key: "insights", label: "Product insights" },
];
function App() {
  const [page, setPage] = useState<Page>("home");
  const [nav, setNav] = useState(false);
  const [amount, setAmount] = useState(300000);
  const [months, setMonths] = useState(36);
  const [form, setForm] = useState<FormData>(initial);
  const [step, setStep] = useState(1);
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [decision, setDecision] = useState<Decision | null>(null);
  const [events, setEvents] = useState<Record<string, number>>({ homepage: 1 });
  function go(p: Page) {
    setPage(p);
    setNav(false);
    setEvents((e) => ({ ...e, [p]: (e[p] || 0) + 1 }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  const request = Number(form.requested) || 0,
    earning = Number(form.income) || 0,
    existing = Number(form.existingEmi) || 0,
    period = Number(form.tenure);
  function validateStep(fields: readonly (keyof FormData)[]): boolean {
    setAttempted(true);
    const invalid = firstInvalidField(form, fields);
    if (invalid) {
      document.getElementById(`field-${invalid}`)?.focus();
      return false;
    }
    setAttempted(false);
    return true;
  }
  function decide() {
    if (!validateStep([...personalFields, ...financeFields])) return;
    const projected = emi(request, interest, period);
    const room = earning * 0.45 - existing;
    const max = Math.max(0, Math.floor(room / emi(1, interest, period)));
    let status: Decision["status"], reason: string;
    if (earning < 15000 || request < 25000 || request > 2500000 || room <= 0) {
      status = "Outside demo criteria";
      reason =
        "The values entered fall outside the illustrative thresholds for this demo.";
    } else if (projected <= room) {
      status = "Preliminary eligible";
      reason =
        "Estimated EMI is within the demo affordability threshold. This is not an approval or an offer.";
    } else {
      status = "Manual review";
      reason =
        "The requested EMI exceeds the demo affordability threshold. A different amount or tenure may help.";
    }
    setDecision({
      status,
      reason,
      maxAmount: max,
      emi: projected,
      id: "LF-DEMO-" + String(Date.now()).slice(-6),
    });
    setStep(3);
    setEvents((e) => ({ ...e, submitted: (e.submitted || 0) + 1 }));
  }
const input = (
  label: string,
  key: InputField,
  placeholder: string,
  type = "text",
) => {
  const error = touched[key] || attempted ? validateField(form, key) : "";
  const errorId = `${key}-error`;

  return (
    <label className="field">
      <span>{label}</span>
      <input
        id={`field-${key}`}
        onBlur={() => setTouched((previous) => ({ ...previous, [key]: true }))}
        value={form[key]}
        onChange={(event) => update(key, event.target.value)}
        placeholder={placeholder}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <small id={errorId} className="field-error">
          {error}
        </small>
      )}
    </label>
  );
};
  return (
    <div className="app">
      <aside className="sidebar">
        <button className="logo" onClick={() => go("home")}>
          <span className="logo-icon">
            <Wallet size={21} />
          </span>
          <span>
            Credi<span className="brand-blue">Flow</span>
            <small>DIGITAL LENDING DEMO</small>
          </span>
        </button>
        <div className="side-label">WORKSPACE</div>
        <nav>
          {screens.map((s) => (
            <button
              key={s.key}
              className={"navlink " + (page === s.key ? "active" : "")}
              onClick={() => go(s.key)}
            >
              {s.key === "home" ? (
                <LayoutDashboard size={18} />
              ) : s.key === "calculator" ? (
                <Calculator size={18} />
              ) : s.key === "apply" ? (
                <FileText size={18} />
              ) : s.key === "tracking" ? (
                <Clock3 size={18} />
              ) : (
                <BarChart3 size={18} />
              )}
              <span>{s.label}</span>
              {page === s.key && <span className="active-indicator" />}
            </button>
          ))}
        </nav>
        <div className="side-help">
          <ShieldCheck size={20} />
          <b>Built for responsible lending</b>
          <p>Illustrative rates, mock checks, no real bank connections.</p>
        </div>
        <span className="version">Portfolio MVP · v0.1</span>
      </aside>
      <div className="body">
        <header className="top">
          <div className="mobilelogo">
            <Wallet size={19} /> CrediFlow
          </div>
          <div className="crumb">
            Product /{" "}
            <strong>{screens.find((s) => s.key === page)?.label}</strong>
          </div>
          <span className="top-right">
            <span className="demo-pill">
              <span className="dot" /> DEMO ENVIRONMENT
            </span>
            <span className="avatar">VZ</span>
          </span>
          <button className="menubtn" onClick={() => setNav(!nav)}>
            {nav ? <X /> : <Menu />}
          </button>
        </header>
        {nav && (
          <div className="mobilemenu">
            {screens.map((s) => (
              <button key={s.key} onClick={() => go(s.key)}>
                {s.label}
              </button>
            ))}
          </div>
        )}
        <main className="main">
          {page === "home" && (
            <>
              <div className="welcome">
                <div>
                  <div className="eyebrow">
                    <Sparkles size={15} /> SMARTER LENDING EXPERIENCE
                  </div>
                  <h1>
                    Borrowing made <em>simple.</em>
                  </h1>
                  <p>
                    A modern, transparent digital loan journey. Explore your
                    options, estimate repayments, and check your preliminary
                    eligibility — all in one place.
                  </p>
                  <div className="actions">
                    <button className="primary" onClick={() => go("apply")}>
                      Start application <ArrowRight size={17} />
                    </button>
                    <button
                      className="secondary"
                      onClick={() => go("calculator")}
                    >
                      Calculate EMI <Calculator size={16} />
                    </button>
                  </div>
                </div>
                <div className="heroart">
                  <div className="hero-top">
                    <span>PERSONAL LOAN</span>
                    <span className="card-icon">
                      <CreditCard size={25} />
                    </span>
                  </div>
                  <span className="hero-big">₹3,00,000</span>
                  <span className="hero-sub">Illustrative loan amount</span>
                  <div className="hero-divider" />
                  <div className="hero-stats">
                    <span>
                      Annual rate <strong>11.5%</strong>
                    </span>
                    <span>
                      Tenure <strong>36 months</strong>
                    </span>
                  </div>
                  <div className="hero-badge">
                    <BadgeCheck size={16} /> Clear & transparent
                  </div>
                </div>
              </div>
              <div className="section-heading">
                <div>
                  <h2>Everything you need, in one flow</h2>
                  <p>Designed around clarity and control at every step.</p>
                </div>
              </div>
              <div className="feature-grid">
                <button className="feature" onClick={() => go("calculator")}>
                  <span className="feature-icon blue">
                    <Calculator />
                  </span>
                  <h3>Know your EMI</h3>
                  <p>
                    Explore monthly repayments with flexible amounts and
                    tenures.
                  </p>
                  <span className="feature-link">
                    Try calculator <ArrowUpRight size={15} />
                  </span>
                </button>
                <button className="feature" onClick={() => go("apply")}>
                  <span className="feature-icon purple">
                    <ShieldCheck />
                  </span>
                  <h3>Check eligibility</h3>
                  <p>
                    See a transparent, rules-based estimate using mock financial
                    inputs.
                  </p>
                  <span className="feature-link">
                    Get started <ArrowUpRight size={15} />
                  </span>
                </button>
                <button className="feature" onClick={() => go("tracking")}>
                  <span className="feature-icon mint">
                    <Clock3 />
                  </span>
                  <h3>Track your journey</h3>
                  <p>Review your demo application's progress and next steps.</p>
                  <span className="feature-link">
                    Track status <ArrowUpRight size={15} />
                  </span>
                </button>
              </div>
              <div className="how">
                <div className="section-heading">
                  <h2>How CrediFlow works</h2>
                </div>
                <div className="steps">
                  {[
                    ["01", "Explore", "Choose amount & tenure"],
                    ["02", "Apply", "Share illustrative details"],
                    ["03", "Check", "Receive a mock outcome"],
                    ["04", "Track", "See your application status"],
                  ].map(([no, title, desc], i) => (
                    <div className="how-step" key={no}>
                      <div className="step-no">{no}</div>
                      <b>{title}</b>
                      <p>{desc}</p>
                      {i < 3 && <ArrowRight className="step-arrow" size={17} />}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {page === "calculator" && (
            <>
              <div className="pagehead">
                <div className="eyebrow">PLAN BEFORE YOU BORROW</div>
                <h1>EMI Calculator</h1>
                <p>
                  Adjust the amount and term to see how your repayment could
                  look.
                </p>
              </div>
              <div className="two-col">
                <div className="panel calc-panel">
                  <div className="calc-row">
                    <label>Loan amount</label>
                    <strong>{formatINR(amount)}</strong>
                  </div>
                  <input
                    type="range"
                    min="25000"
                    max="2500000"
                    step="25000"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                  <div className="range-limits">
                    <span>₹25,000</span>
                    <span>₹25,00,000</span>
                  </div>
                  <div className="calc-row spacer-top">
                    <label>Loan tenure</label>
                    <strong>{months} months</strong>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="60"
                    step="6"
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                  />
                  <div className="range-limits">
                    <span>6 months</span>
                    <span>60 months</span>
                  </div>
                  <div className="rate">
                    <span>Illustrative annual interest rate</span>
                    <b>{interest}% p.a.</b>
                  </div>
                  <button
                    className="primary full"
                    onClick={() => {
                      update("requested", String(amount));
                      update("tenure", String(months));
                      go("apply");
                    }}
                  >
                    Apply with these details <ArrowRight size={17} />
                  </button>
                </div>
                <div className="panel result-panel">
                  <span className="small-label">ESTIMATED MONTHLY EMI</span>
                  <div className="monthly">
                    {formatINR(emi(amount, interest, months))}
                    <span>/month</span>
                  </div>
                  <div className="mini-chart">
                    <div
                      style={{
                        width: `${(amount / (emi(amount, interest, months) * months)) * 100}%`,
                      }}
                    />
                    <span />
                  </div>
                  <div className="legend">
                    <span>
                      <i className="blue-dot" /> Principal
                    </span>
                    <span>
                      <i className="light-dot" /> Interest
                    </span>
                  </div>
                  <div className="result-line">
                    <span>Principal</span>
                    <strong>{formatINR(amount)}</strong>
                  </div>
                  <div className="result-line">
                    <span>Total interest</span>
                    <strong>
                      {formatINR(
                        emi(amount, interest, months) * months - amount,
                      )}
                    </strong>
                  </div>
                  <div className="result-line last">
                    <span>Total payable</span>
                    <strong>
                      {formatINR(emi(amount, interest, months) * months)}
                    </strong>
                  </div>
                  <div className="info">
                    <Info size={17} /> Estimates are illustrative, not a loan
                    quote. Actual rates, fees, and eligibility depend on a
                    lender's policies.
                  </div>
                </div>
              </div>
            </>
          )}
          {page === "apply" && (
            <>
              <div className="pagehead">
                <div className="eyebrow">DIGITAL APPLICATION JOURNEY</div>
                <h1>Apply for a personal loan</h1>
                <p>
                  A guided experience with transparent steps and a simulated
                  eligibility result.
                </p>
              </div>
              <div className="application">
                <div className="progress">
                  {[
                    ["01", "Personal details"],
                    ["02", "Finances & consent"],
                    ["03", "Demo outcome"],
                  ].map(([num, label], i) => (
                    <div
                      className={
                        "progress-step " + (step >= i + 1 ? "current" : "")
                      }
                      key={num}
                    >
                      <span>{step > i + 1 ? <Check size={16} /> : num}</span>
                      <b>{label}</b>
                    </div>
                  ))}
                </div>
                <div className="panel form-panel">
                  {step === 1 && (
                    <>
                      <h2>Tell us about yourself</h2>
                      <p>
                        We'll use this information only within your current
                        browser session.
                      </p>
                      <div className="formgrid">
                        {input("Full name", "name", "e.g. Aanya Mehta")}
                        {input(
                          "Email address",
                          "email",
                          "aanya@example.com",
                          "email",
                        )}
                        {input(
                          "Mobile number",
                          "phone",
                          "10-digit number",
                          "tel",
                        )}
                        <label className="field">
                          <span>Employment type</span>
                          <select
                            value={form.employment}
                            onChange={(e) =>
                              update("employment", e.target.value)
                            }
                          >
                            <option>Salaried</option>
                            <option>Self-employed</option>
                            <option>Other</option>
                          </select>
                        </label>
                      </div>
                      <div className="formactions">
                        <button
                          className="primary"
                          onClick={() => {
                            if (validateStep(personalFields)) setStep(2);
                          }}
                        >
                          Continue <ArrowRight size={17} />
                        </button>
                      </div>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <h2>Let's understand your finances</h2>
                      <p>
                        Use fictional values only. This demonstration does not
                        perform a credit bureau check.
                      </p>
                      <div className="formgrid">
                        {input(
                          "Monthly income (₹)",
                          "income",
                          "e.g. 65000",
                          "number",
                        )}
                        {input(
                          "Existing monthly EMIs (₹)",
                          "existingEmi",
                          "e.g. 5000",
                          "number",
                        )}
                        {input(
                          "Requested amount (₹)",
                          "requested",
                          "e.g. 300000",
                          "number",
                        )}
                        <label className="field">
                          <span>Repayment tenure</span>
                          <select
                            id="field-tenure"
                            value={form.tenure}
                            onChange={(e) => update("tenure", e.target.value)}
                          >
                            {allowedTenures.map(
                              (m) => (
                                <option value={m} key={m}>
                                  {m} months
                                </option>
                              ),
                            )}
                          </select>
                        </label>
                      </div>
                      <label className="checkline">
                        <input
                          id="field-consent"
                          type="checkbox"
                          aria-invalid={attempted && Boolean(validateField(form, "consent"))}
                          aria-describedby={attempted && !form.consent ? "consent-error" : undefined}
                          checked={form.consent}
                          onChange={(e) => update("consent", e.target.checked)}
                        />
                        <span>
                          I understand this is a portfolio demonstration and the
                          result is not a credit decision, loan offer, or
                          approval.
                        </span>
                      </label>
                      {attempted && !form.consent && (
                        <p id="consent-error" className="field-error">{validateField(form, "consent")}</p>
                      )}
                      <div className="formactions">
                        <button
                          className="secondary"
                          onClick={() => { setAttempted(false); setStep(1); }}
                        >
                          <ArrowLeft size={17} /> Back
                        </button>
                        <button
                          className="primary"
                          onClick={decide}
                        >
                          Check demo eligibility <ArrowRight size={17} />
                        </button>
                      </div>
                    </>
                  )}
                  {step === 3 && decision && (
                    <div className="outcome">
                      <div className="outcomeicon">
                        <CheckCircle2 size={36} />
                      </div>
                      <div className="small-label">
                        APPLICATION REFERENCE · {decision.id}
                      </div>
                      <h2>{decision.status}</h2>
                      <p>{decision.reason}</p>
                      <div className="outcome-grid">
                        <div>
                          <span>Requested amount</span>
                          <b>{formatINR(request)}</b>
                        </div>
                        <div>
                          <span>Indicative monthly EMI</span>
                          <b>{formatINR(decision.emi)}</b>
                        </div>
                        <div>
                          <span>Affordability-based max*</span>
                          <b>{formatINR(decision.maxAmount)}</b>
                        </div>
                      </div>
                      <div className="info">
                        <Info size={17} /> *Based only on a 45%
                        income-to-total-EMI demo threshold, illustrative
                        interest, and your inputs. Real credit decisions use
                        more factors.
                      </div>
                      <div className="formactions centered">
                        <button
                          className="secondary"
                          onClick={() => {
                            setStep(2);
                            setDecision(null);
                          }}
                        >
                          Edit details
                        </button>
                        <button
                          className="primary"
                          onClick={() => go("tracking")}
                        >
                          Track application <ArrowRight size={17} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {page === "tracking" && (
            <>
              <div className="pagehead">
                <div className="eyebrow">APPLICATION VISIBILITY</div>
                <h1>Application tracking</h1>
                <p>A clear timeline of your demonstration loan journey.</p>
              </div>
              {decision ? (
                <div className="panel track-panel">
                  <div className="tracktop">
                    <div>
                      <span className="small-label">REFERENCE ID</span>
                      <h2>{decision.id}</h2>
                      <p>Applicant: {form.name}</p>
                    </div>
                    <span className="statebadge">{decision.status}</span>
                  </div>
                  <div className="timeline">
                    <div className="timeline-item completed">
                      <span>
                        <Check size={17} />
                      </span>
                      <div>
                        <b>Application received</b>
                        <p>Your demo details were submitted successfully.</p>
                      </div>
                    </div>
                    <div className="timeline-item completed">
                      <span>
                        <Check size={17} />
                      </span>
                      <div>
                        <b>Automated pre-check completed</b>
                        <p>Illustrative affordability rules were applied.</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <span>3</span>
                      <div>
                        <b>Actual lender underwriting</b>
                        <p>
                          Not available in the demo. No external lender or
                          credit bureau was contacted.
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    className="secondary"
                    onClick={() => go("calculator")}
                  >
                    Explore EMI scenarios <ArrowRight size={15} />
                  </button>
                </div>
              ) : (
                <div className="empty-state">
                  <span className="feature-icon blue">
                    <FileText size={27} />
                  </span>
                  <h2>No application yet</h2>
                  <p>
                    Complete the sample application to generate a reference
                    number and a tracking timeline.
                  </p>
                  <button className="primary" onClick={() => go("apply")}>
                    Begin application <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
          {page === "insights" && (
            <>
              <div className="pagehead">
                <div className="eyebrow">APM PORTFOLIO CASE STUDY</div>
                <h1>Product performance lab</h1>
                <p>
                  A demonstration of the product metrics an APM would track.
                  Counters below represent only this browser session, not real
                  users.
                </p>
              </div>
              <div className="metric-grid">
                <div className="metric">
                  <span>Application page views</span>
                  <strong>{events.apply || 0}</strong>
                  <small>Session events</small>
                </div>
                <div className="metric">
                  <span>Demo applications</span>
                  <strong>{events.submitted || 0}</strong>
                  <small>Completed simulations</small>
                </div>
                <div className="metric">
                  <span>Calculation visits</span>
                  <strong>{events.calculator || 0}</strong>
                  <small>Intent signal</small>
                </div>
                <div className="metric">
                  <span>Demo completion ratio</span>
                  <strong>
                    {events.apply
                      ? Math.round(
                          ((events.submitted || 0) / (events.apply || 1)) * 100,
                        )
                      : 0}
                    %
                  </strong>
                  <small>Submissions / visits, may exceed 100%</small>
                </div>
              </div>
              <div className="panel insight-panel">
                <h2>Product hypothesis & experiment</h2>
                <p>
                  <strong>Hypothesis:</strong> Breaking loan applications into
                  guided steps with eligibility explanations will reduce
                  abandonment versus a long form.
                </p>
                <div className="insight-grid">
                  <div>
                    <b>Primary metric</b>
                    <span>Application completion rate</span>
                  </div>
                  <div>
                    <b>Secondary metric</b>
                    <span>Median time to submit</span>
                  </div>
                  <div>
                    <b>Guardrail metric</b>
                    <span>Validation error rate</span>
                  </div>
                </div>
                <p>
                  <strong>Proposed A/B test:</strong> Compare the current 2-step
                  form against a single-page form. Instrument step starts,
                  errors, exits and successful submissions, then evaluate an
                  adequately sized sample.
                </p>
                <div className="info">
                  <AlertCircle size={17} /> Production analytics would require
                  consent-aware event instrumentation, anonymous identifiers,
                  secure storage, and appropriate privacy controls.
                </div>
              </div>
            </>
          )}
          <footer>
            <LockKeyhole size={14} /> Educational prototype only · Not
            affiliated with a bank · No real approvals, KYC or credit checks
          </footer>
        </main>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
