const glossary = [
  {
    title: 'Organization',
    text: 'The agency or tenant that owns the account and isolates all project data.',
  },
  {
    title: 'Project',
    text: 'A single engagement between an agency and a client, anchored by a source document and a baseline.',
  },
  {
    title: 'Scope Baseline',
    text: 'An approved, immutable snapshot of deliverables, exclusions, price, and timeline for the project.',
  },
  {
    title: 'Change Request',
    text: 'A structured request to add, modify, or remove work relative to the current baseline.',
  },
  {
    title: 'Change Order',
    text: 'The formal quote and approval record produced after scope impact is assessed and accepted.',
  },
];

const userFlows = [
  {
    name: 'Onboard a project',
    steps: ['Create project', 'Upload proposal', 'Review parsed draft', 'Client approves baseline'],
  },
  {
    name: 'Handle change requests',
    steps: ['Submit CR', 'Check against scope', 'Estimate impact', 'Generate change order'],
  },
  {
    name: 'Review history',
    steps: ['Compare baselines', 'View approvals', 'Export audit report'],
  },
];

const modules = [
  'Document ingestion and parsing',
  'Scope baseline management',
  'Change requests',
  'Impact estimation',
  'Approvals',
  'Change-order documents',
  'Immutable history',
  'Notifications and integrations',
];

const personas = [
  {
    name: 'Agency owner',
    pain: 'Lost revenue from informal add-ons and undocumented approvals.',
  },
  {
    name: 'Project manager',
    pain: 'Unclear scope boundaries and no single source of truth for what is included.',
  },
  {
    name: 'Client stakeholder',
    pain: 'Surprise costs, unclear status, and a weak record of what was agreed.',
  },
  {
    name: 'Freelancer',
    pain: 'No formal process for handling evolution requests without awkward conversations.',
  },
];

function App() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">S</div>
          <div>
            <p className="eyebrow">Project scope platform</p>
            <h1>ScopeLock</h1>
          </div>
        </div>
        <nav className="nav">
          <a href="#overview">Overview</a>
          <a href="#concepts">Concepts</a>
          <a href="#flows">Flows</a>
          <a href="#modules">Modules</a>
        </nav>
      </header>

      <main className="content">
        <section id="overview" className="hero">
          <div className="hero-copy">
            <p className="badge">Built for agencies and consultancies</p>
            <h2>A single source of truth for scope, change, and approvals.</h2>
            <p className="lead">
              ScopeLock helps teams turn signed proposals into structured baselines and turn every later request into a traceable, priced change order.
            </p>
            <div className="cta-row">
              <button className="primary">View baseline</button>
              <button className="secondary">Review change flow</button>
            </div>
          </div>

          <div className="hero-panel">
            <div className="panel-card">
              <span className="panel-label">Active project</span>
              <strong>Client Portal v2</strong>
              <div className="mini-grid">
                <div>
                  <small>Baseline</small>
                  <span>v1.4</span>
                </div>
                <div>
                  <small>Open CRs</small>
                  <span>03</span>
                </div>
                <div>
                  <small>Approved</small>
                  <span>92%</span>
                </div>
                <div>
                  <small>Audit trail</small>
                  <span>256</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="stats">
          <div className="stat-box">
            <strong>4</strong>
            <span>Core personas</span>
          </div>
          <div className="stat-box">
            <strong>3</strong>
            <span>Primary workflows</span>
          </div>
          <div className="stat-box">
            <strong>8</strong>
            <span>Major modules</span>
          </div>
          <div className="stat-box">
            <strong>1</strong>
            <span>Immutable audit trail</span>
          </div>
        </section>

        <section id="concepts" className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Domain glossary</p>
            <h3>Core concepts</h3>
          </div>
          <div className="card-grid glossary-grid">
            {glossary.map((item) => (
              <article className="info-card" key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="flows" className="section-block">
          <div className="section-heading">
            <p className="eyebrow">User journeys</p>
            <h3>Primary workflows</h3>
          </div>
          <div className="flow-list">
            {userFlows.map((flow) => (
              <article className="flow-card" key={flow.name}>
                <h4>{flow.name}</h4>
                <ol>
                  {flow.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Who it serves</p>
            <h3>Typical users</h3>
          </div>
          <div className="card-grid personas-grid">
            {personas.map((persona) => (
              <article className="info-card" key={persona.name}>
                <h4>{persona.name}</h4>
                <p>{persona.pain}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="modules" className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Platform modules</p>
            <h3>Feature areas</h3>
          </div>
          <div className="module-list">
            {modules.map((module) => (
              <div className="module-item" key={module}>{module}</div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
