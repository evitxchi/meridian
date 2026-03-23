import { useState, useEffect, useRef } from "react";

// ─── SHARED ─────────────────────────────────────────────
const FONTS_LINK = "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap";
const SERIF = "'Libre Baskerville', serif";
const SANS = "'Outfit', 'Helvetica Neue', sans-serif";

function Nav({ page, setPage }) {
  return (
    <nav style={{ padding: "22px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("home")}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: SERIF, fontStyle: "italic" }}>M</div>
        <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.03em", fontFamily: SANS }}>Meridian</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {[
          { label: "Product", key: "product" },
          { label: "Pricing", key: "pricing" },
          { label: "Log in", key: "login" },
        ].map((item) => (
          <span key={item.key} onClick={() => setPage(item.key)} style={{ fontSize: 14, color: page === item.key ? "#1A1A1A" : "#999", cursor: "pointer", fontWeight: page === item.key ? 500 : 400, fontFamily: SANS, transition: "color 0.2s" }}>
            {item.label}
          </span>
        ))}
        <button onClick={() => setPage("login")} style={{ background: "#1A1A1A", border: "none", borderRadius: 8, padding: "10px 22px", color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: SANS }}>
          Get started →
        </button>
      </div>
    </nav>
  );
}

function NavDark({ page, setPage }) {
  return (
    <nav style={{ padding: "22px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("home")}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: SERIF, fontStyle: "italic" }}>M</div>
        <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.03em", fontFamily: SANS, color: "#fff" }}>Meridian</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {[
          { label: "Product", key: "product" },
          { label: "Pricing", key: "pricing" },
          { label: "Log in", key: "login" },
        ].map((item) => (
          <span key={item.key} onClick={() => setPage(item.key)} style={{ fontSize: 14, color: page === item.key ? "#fff" : "rgba(255,255,255,0.45)", cursor: "pointer", fontWeight: page === item.key ? 500 : 400, fontFamily: SANS, transition: "color 0.2s" }}>
            {item.label}
          </span>
        ))}
        <button onClick={() => setPage("login")} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "10px 22px", color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: SANS }}>
          Get started →
        </button>
      </div>
    </nav>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ padding: "24px 48px", borderTop: "1px solid #EDEDEA", maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("home")}>
        <div style={{ width: 22, height: 22, borderRadius: 5, background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff", fontFamily: SERIF, fontStyle: "italic" }}>M</div>
        <span style={{ fontSize: 12, color: "#bbb", fontWeight: 300, fontFamily: SANS }}>Meridian · Customer discovery, navigated.</span>
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        {["Product", "Pricing", "Log in"].map((l) => (
          <span key={l} onClick={() => setPage(l.toLowerCase().replace(" ", ""))} style={{ fontSize: 11, color: "#bbb", cursor: "pointer", fontFamily: SANS, fontWeight: 300 }}>{l}</span>
        ))}
      </div>
    </footer>
  );
}

function FooterDark({ setPage }) {
  return (
    <footer style={{ padding: "24px 48px", borderTop: "1px solid rgba(255,255,255,0.06)", maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("home")}>
        <div style={{ width: 22, height: 22, borderRadius: 5, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff", fontFamily: SERIF, fontStyle: "italic" }}>M</div>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontWeight: 300, fontFamily: SANS }}>Meridian · Customer discovery, navigated.</span>
      </div>
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontWeight: 300, fontFamily: SANS }}>© 2026 Meridian</span>
    </footer>
  );
}

function useScrollReveal() {
  const [visible, setVisible] = useState(new Set());
  const refs = useRef({});
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setVisible((p) => new Set([...p, e.target.id])); });
    }, { threshold: 0.1 });
    Object.values(refs.current).forEach((r) => { if (r) obs.observe(r); });
    return () => obs.disconnect();
  }, []);
  const anim = (id, delay = 0) => ({
    opacity: visible.has(id) ? 1 : 0,
    transform: visible.has(id) ? "translateY(0)" : "translateY(40px)",
    transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });
  return { refs, anim, visible };
}

// ─── HOME (LANDING) ─────────────────────────────────────

const DASHBOARD_VIEWS = [
  {
    label: "Discovery Brief", sidebarActive: 0,
    stats: [
      { label: "Contacts found", value: "247", change: "+32 this week", changeColor: "#4ADE80" },
      { label: "Interviews done", value: "18", change: "4 scheduled", changeColor: "#4ADE80" },
      { label: "Hypotheses tested", value: "6/9", change: "3 validated", changeColor: "#4ADE80" },
    ],
    rows: [
      { name: "Sarah Chen", role: "Head of Ops · Flexport", status: "Interview scheduled", dot: "#FEBC2E" },
      { name: "Marcus Rivera", role: "VP Product · Deel", status: "Responded", dot: "#4ADE80" },
      { name: "Aisha Patel", role: "Dir. Strategy · Ramp", status: "Outreach sent", dot: "#666" },
      { name: "James Okafor", role: "COO · Brex", status: "AI recommended", dot: "#818CF8" },
    ],
  },
  {
    label: "Contacts", sidebarActive: 1,
    stats: [
      { label: "Total sourced", value: "389", change: "+56 this week", changeColor: "#4ADE80" },
      { label: "Response rate", value: "34%", change: "↑ 8% vs last sprint", changeColor: "#4ADE80" },
      { label: "Enriched", value: "312", change: "80% coverage", changeColor: "#4ADE80" },
    ],
    rows: [
      { name: "Elena Vasquez", role: "Head of Growth · Figma", status: "New role · 5 days", dot: "#818CF8" },
      { name: "David Kim", role: "VP Ops · Notion", status: "Matched brief", dot: "#4ADE80" },
      { name: "Rachel Foster", role: "Dir. Product · Linear", status: "Intent signal", dot: "#FB923C" },
      { name: "Omar Hassan", role: "COO · Vercel", status: "In sequence", dot: "#FEBC2E" },
    ],
  },
  {
    label: "Outreach", sidebarActive: 2,
    stats: [
      { label: "Sequences active", value: "6", change: "3 channels each", changeColor: "#4ADE80" },
      { label: "Emails sent", value: "142", change: "68% open rate", changeColor: "#4ADE80" },
      { label: "Meetings booked", value: "18", change: "+5 this week", changeColor: "#4ADE80" },
    ],
    rows: [
      { name: "LinkedIn → Email → Follow-up", role: "Series B Ops managers · 48 contacts", status: "23% reply rate", dot: "#4ADE80" },
      { name: "Cold email → Phone", role: "VP Product mid-market · 31 contacts", status: "12% reply rate", dot: "#FB923C" },
      { name: "Community DM → Video ask", role: "Founders r/startups · 22 contacts", status: "38% reply rate", dot: "#4ADE80" },
      { name: "Warm intro → Scheduling link", role: "Referred contacts · 14 contacts", status: "64% reply rate", dot: "#22D3EE" },
    ],
  },
  {
    label: "Interviews", sidebarActive: 3,
    stats: [
      { label: "Completed", value: "24", change: "3 this week", changeColor: "#4ADE80" },
      { label: "Avg. duration", value: "28m", change: "Optimal range", changeColor: "#4ADE80" },
      { label: "Key themes", value: "7", change: "2 new this week", changeColor: "#FB923C" },
    ],
    rows: [
      { name: "Workflow handoffs", role: "Mentioned by 18/24 interviewees", status: "Strong signal", dot: "#4ADE80" },
      { name: "Pricing sensitivity", role: "$30-50/seat sweet spot emerging", status: "Mixed signal", dot: "#FB923C" },
      { name: "Integration needs", role: "Slack + Notion most requested", status: "Consistent", dot: "#4ADE80" },
      { name: "Switching costs", role: "Current tools deeply embedded", status: "Blocker risk", dot: "#F87171" },
    ],
  },
  {
    label: "Insights", sidebarActive: 4,
    stats: [
      { label: "Hypotheses validated", value: "5/9", change: "56% hit rate", changeColor: "#4ADE80" },
      { label: "Contradictions found", value: "3", change: "Needs resolution", changeColor: "#FB923C" },
      { label: "Confidence level", value: "High", change: "Ready to build", changeColor: "#4ADE80" },
    ],
    rows: [
      { name: "Ops managers need handoff tools", role: "Validated by 18/24 interviews", status: "Validated", dot: "#4ADE80" },
      { name: "Teams will pay $50/mo/seat", role: "Mixed — price sensitive below Series B", status: "Partial", dot: "#FB923C" },
      { name: "Slack integration is critical", role: "Only 6/24 mentioned unprompted", status: "Invalidated", dot: "#F87171" },
      { name: "Mobile access is needed", role: "14/24 do discovery on the go", status: "Validated", dot: "#4ADE80" },
    ],
  },
];

const SIDEBAR_ITEMS = ["Discovery Brief", "Contacts", "Outreach", "Interviews", "Insights"];

function HomePage({ setPage }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dashView, setDashView] = useState(0);
  const { refs, anim } = useScrollReveal();

  useEffect(() => {
    const iv = setInterval(() => setDashView((p) => (p + 1) % DASHBOARD_VIEWS.length), 3500);
    return () => clearInterval(iv);
  }, []);

  const handleSubmit = (e) => { e.preventDefault(); if (email.includes("@")) setSubmitted(true); };
  const view = DASHBOARD_VIEWS[dashView];

  const EmailForm = () => (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, maxWidth: 440, margin: "0 auto" }}>
      {!submitted ? (
        <>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"
            style={{ flex: 1, padding: "14px 18px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 14, outline: "none", fontFamily: SANS, fontWeight: 300 }} />
          <button type="submit" style={{ padding: "14px 28px", borderRadius: 10, border: "none", background: "#fff", color: "#0C1220", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: SANS, whiteSpace: "nowrap" }}>Get started →</button>
        </>
      ) : (
        <div style={{ flex: 1, padding: "14px 18px", borderRadius: 10, background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.25)", color: "#4ADE80", fontSize: 14, fontWeight: 500, textAlign: "center", fontFamily: SANS }}>You're on the list.</div>
      )}
    </form>
  );

  return (
    <div style={{ background: "linear-gradient(180deg, #FAFAF8 0%, #D0DCE8 15%, #6B9FCC 35%, #2E5090 55%, #1A2744 75%, #0C1220 100%)", fontFamily: SANS, minHeight: "100vh" }}>
      {/* Nav — starts light, so dark text */}
      <nav style={{ padding: "22px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("home")}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: SERIF, fontStyle: "italic" }}>M</div>
          <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.03em", fontFamily: SANS, color: "#1A1A1A" }}>Meridian</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {[{ label: "Product", key: "product" }, { label: "Pricing", key: "pricing" }, { label: "Log in", key: "login" }].map((item) => (
            <span key={item.key} onClick={() => setPage(item.key)} style={{ fontSize: 14, color: "#777", cursor: "pointer", fontWeight: 400, fontFamily: SANS }}>{item.label}</span>
          ))}
          <button onClick={() => setPage("login")} style={{ background: "#1A1A1A", border: "none", borderRadius: 8, padding: "10px 22px", color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: SANS }}>Get started →</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 48px 60px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 20, background: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.06)", marginBottom: 36, fontSize: 12.5, color: "#666", fontWeight: 400 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2D7A4F" }} />
          Early access — limited spots
        </div>
        <h1 style={{ fontFamily: SERIF, fontSize: "clamp(44px, 6.5vw, 76px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.08, margin: "0 auto 28px", maxWidth: 780, color: "#1A1A1A" }}>
          <em>Discover</em> your customer
        </h1>
        <p style={{ fontSize: 17, color: "#555", lineHeight: 1.65, maxWidth: 480, margin: "0 auto 16px", fontWeight: 300 }}>
          Meridian is your AI-powered customer discovery platform. Find the right people, ask the right questions, and know exactly what to build.
        </p>
        <p style={{ fontSize: 14, color: "#888", margin: "0 auto 40px", fontWeight: 300 }}>Find people. Ask questions. Build conviction.</p>
        
        {/* Email form — light variant for top */}
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, maxWidth: 440, margin: "0 auto" }}>
          {!submitted ? (
            <>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"
                style={{ flex: 1, padding: "14px 18px", borderRadius: 10, border: "1px solid #E0E0DA", background: "#fff", color: "#1A1A1A", fontSize: 14, outline: "none", fontFamily: SANS, fontWeight: 300 }} />
              <button type="submit" style={{ padding: "14px 28px", borderRadius: 10, border: "none", background: "#1A1A1A", color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: SANS, whiteSpace: "nowrap" }}>Get started →</button>
            </>
          ) : (
            <div style={{ flex: 1, padding: "14px 18px", borderRadius: 10, background: "#E8F5ED", border: "1px solid #C4E6D0", color: "#2D7A4F", fontSize: 14, fontWeight: 500, textAlign: "center", fontFamily: SANS }}>You're on the list.</div>
          )}
        </form>
        <p style={{ fontSize: 12, color: "#aaa", margin: "16px 0 0", fontWeight: 300 }}>Free during beta · No credit card required</p>

        {/* Animated dashboard */}
        <div style={{ marginTop: 64, background: "linear-gradient(180deg, #1A1A1E 0%, #232328 100%)", borderRadius: 20, padding: "32px 32px 0", maxWidth: 920, margin: "64px auto 0", overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.18)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
            <div style={{ flex: 1 }} />
            <div style={{ padding: "5px 14px", borderRadius: 7, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 10, color: "#666", fontFamily: "monospace", fontWeight: 600 }}>⌘K</span>
              <span style={{ fontSize: 12, color: "#555", fontWeight: 300 }}>Search anything...</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 20, minHeight: 340 }}>
            <div style={{ width: 170, flexShrink: 0, paddingTop: 4 }}>
              {SIDEBAR_ITEMS.map((item, i) => (
                <div key={i} style={{ padding: "11px 16px", borderRadius: 8, background: view.sidebarActive === i ? "rgba(255,255,255,0.08)" : "transparent", fontSize: 13, color: view.sidebarActive === i ? "#fff" : "rgba(255,255,255,0.35)", fontWeight: view.sidebarActive === i ? 500 : 300, marginBottom: 2, transition: "all 0.4s ease" }}>{item}</div>
              ))}
              <div style={{ display: "flex", gap: 6, padding: "20px 16px 0", marginTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {DASHBOARD_VIEWS.map((_, i) => (
                  <div key={i} onClick={() => setDashView(i)} style={{ width: i === dashView ? 18 : 6, height: 6, borderRadius: 3, background: i === dashView ? "#4ADE80" : "rgba(255,255,255,0.12)", cursor: "pointer", transition: "all 0.4s ease" }} />
                ))}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
                {view.stats.map((s, i) => (
                  <div key={`${dashView}-${i}`} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "16px 14px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 8, fontWeight: 300 }}>{s.label}</div>
                    <div style={{ fontSize: 26, fontWeight: 600, color: "#fff", letterSpacing: "-0.03em" }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: s.changeColor, marginTop: 4, fontWeight: 400 }}>{s.change}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" }}>
                {view.rows.map((row, i) => (
                  <div key={`${dashView}-row-${i}`} style={{ padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <div>
                      <div style={{ fontSize: 13.5, color: "#eee", fontWeight: 500 }}>{row.name}</div>
                      <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.35)", marginTop: 3, fontWeight: 300 }}>{row.role}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: row.dot }} />
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>{row.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lower dark section with stars */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Stars only in this lower dark region */}
        <StarFieldAbsolute />

        {/* Simplify — sits in the mid-gradient zone, use white text */}
        <section id="simplify" ref={(el) => (refs.current["simplify"] = el)} style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "120px 48px 80px", textAlign: "center", ...anim("simplify") }}>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px,4.5vw,52px)", fontWeight: 400, letterSpacing: "-0.02em", margin: "0 0 20px", lineHeight: 1.1, color: "#fff" }}><em>Simplify</em> your discovery</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.9)", margin: "0 0 6px", fontWeight: 500 }}>Stop duct-taping 8 tools together.</p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", maxWidth: 440, margin: "0 auto 48px", lineHeight: 1.6, fontWeight: 300 }}>Connect all your discovery workflows in one place.</p>
          <span onClick={() => setPage("product")} style={{ display: "inline-block", padding: "12px 28px", borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.5)", color: "#fff", fontSize: 12, fontWeight: 500, cursor: "pointer", letterSpacing: "0.04em", textTransform: "uppercase" }}>More about Meridian</span>
        </section>

        {/* Stats */}
        <section id="stats" ref={(el) => (refs.current["stats"] = el)} style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "40px 48px 100px", ...anim("stats") }}>
          <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 24, padding: "56px 48px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              { stat: "60%", label: "of founder hypotheses are wrong before real conversations" },
              { stat: "5-8", label: "tools currently duct-taped together for basic discovery" },
              { stat: "73%", label: "of startups skip customer discovery entirely" },
              { stat: "4hrs", label: "wasted per interview on manual prep and synthesis" },
            ].map((p, i) => (
              <div key={i}>
                <div style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 400, color: "#fff", letterSpacing: "-0.02em", marginBottom: 10 }}>{p.stat}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5, fontWeight: 300 }}>{p.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "80px 48px 120px", textAlign: "center" }}>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px,5vw,58px)", fontWeight: 400, letterSpacing: "-0.02em", margin: "0 0 16px", lineHeight: 1.1, color: "#fff" }}><em>Build</em> what matters</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 400, margin: "0 auto 40px", lineHeight: 1.6, fontWeight: 300 }}>Join the waitlist and be first to supercharge your customer discovery.</p>
          <EmailForm />
        </section>
        <footer style={{ position: "relative", zIndex: 1, padding: "24px 48px", borderTop: "1px solid rgba(255,255,255,0.06)", maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("home")}>
            <div style={{ width: 22, height: 22, borderRadius: 5, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff", fontFamily: SERIF, fontStyle: "italic" }}>M</div>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontWeight: 300, fontFamily: SANS }}>Meridian · Customer discovery, navigated.</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Product", "Pricing", "Log in"].map((l) => (
              <span key={l} onClick={() => setPage(l.toLowerCase().replace(" ", ""))} style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", cursor: "pointer", fontFamily: SANS, fontWeight: 300 }}>{l}</span>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

// ─── ANIMATED MOCKUPS FOR PRODUCT PAGE ──────────────────

function BriefMockup() {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Industry", value: "B2B SaaS · Logistics", icon: "🏢" },
    { label: "Persona", value: "Head of Ops · Mid-market", icon: "👤" },
    { label: "Hypothesis", value: "Manual handoffs cause 4hr/week waste", icon: "🎯" },
    { label: "Channel", value: "LinkedIn DM → Video call", icon: "📡" },
  ];
  useEffect(() => { const iv = setInterval(() => setStep((p) => (p + 1) % steps.length), 2200); return () => clearInterval(iv); }, []);
  return (
    <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 16, padding: "24px 20px", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 16 }}>Building your brief...</div>
      {steps.map((s, i) => (
        <div key={i} style={{ padding: "12px 14px", borderRadius: 10, background: i <= step ? "rgba(255,255,255,0.06)" : "transparent", border: i === step ? "1px solid rgba(74,222,128,0.3)" : "1px solid transparent", marginBottom: 6, display: "flex", alignItems: "center", gap: 12, transition: "all 0.4s ease", opacity: i <= step ? 1 : 0.25 }}>
          <span style={{ fontSize: 16 }}>{s.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>{s.label}</div>
            <div style={{ fontSize: 13, color: i <= step ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)", fontWeight: 500, transition: "color 0.4s" }}>{s.value}</div>
          </div>
          {i < step && <span style={{ fontSize: 12, color: "#4ADE80" }}>✓</span>}
          {i === step && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ADE80", animation: "pulse 1.5s infinite" }} />}
        </div>
      ))}
      <div style={{ marginTop: 12, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <div style={{ width: `${((step + 1) / steps.length) * 100}%`, height: "100%", background: "linear-gradient(90deg, #4ADE80, #22D3EE)", borderRadius: 2, transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
}

function SourcingMockup() {
  const [found, setFound] = useState(0);
  const contacts = [
    { name: "Elena V.", co: "Figma", signal: "New role · 3 days", score: 94 },
    { name: "David K.", co: "Notion", signal: "Reddit pain post", score: 88 },
    { name: "Rachel F.", co: "Linear", signal: "G2 review", score: 82 },
    { name: "Omar H.", co: "Vercel", signal: "Competitor eval", score: 79 },
    { name: "Lena S.", co: "Retool", signal: "Job change", score: 76 },
  ];
  useEffect(() => { const iv = setInterval(() => setFound((p) => p < contacts.length ? p + 1 : 0), 1800); return () => clearInterval(iv); }, []);
  return (
    <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 16, padding: "24px 20px", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Scanning sources...</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#4ADE80", fontFamily: "monospace" }}>{found}</div>
      </div>
      {contacts.slice(0, found).map((c, i) => (
        <div key={i} style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)", marginBottom: 5, display: "flex", alignItems: "center", justifyContent: "space-between", animation: "fadeSlideIn 0.4s ease" }}>
          <div>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{c.name} <span style={{ color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>· {c.co}</span></div>
            <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.35)", fontWeight: 300, marginTop: 2 }}>{c.signal}</div>
          </div>
          <div style={{ background: "rgba(74,222,128,0.12)", padding: "3px 8px", borderRadius: 5, fontSize: 11, color: "#4ADE80", fontWeight: 600 }}>{c.score}</div>
        </div>
      ))}
      {found < contacts.length && (
        <div style={{ padding: "10px 14px", borderRadius: 10, border: "1px dashed rgba(255,255,255,0.08)", textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 5 }}>
          Searching LinkedIn, Reddit, G2...
        </div>
      )}
    </div>
  );
}

function OutreachMockup() {
  const [activeStep, setActiveStep] = useState(0);
  const sequence = [
    { channel: "LinkedIn DM", day: "Day 1", status: "Sent", rate: "72% open", color: "#3B82F6" },
    { channel: "Email follow-up", day: "Day 3", status: "Opened", rate: "58% open", color: "#8B5CF6" },
    { channel: "Phone call", day: "Day 5", status: "Connected", rate: "23% pickup", color: "#22D3EE" },
    { channel: "Calendar invite", day: "Day 5", status: "Booked ✓", rate: "Interview set", color: "#4ADE80" },
  ];
  useEffect(() => { const iv = setInterval(() => setActiveStep((p) => (p + 1) % sequence.length), 2000); return () => clearInterval(iv); }, []);
  return (
    <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 16, padding: "24px 20px", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 16 }}>Active sequence · Sarah Chen</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {sequence.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "stretch", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: i <= activeStep ? s.color : "rgba(255,255,255,0.1)", border: i === activeStep ? `2px solid ${s.color}` : "2px solid transparent", boxShadow: i === activeStep ? `0 0 12px ${s.color}44` : "none", transition: "all 0.4s ease", flexShrink: 0 }} />
              {i < sequence.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 36, background: i < activeStep ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)", transition: "background 0.4s" }} />}
            </div>
            <div style={{ flex: 1, paddingBottom: i < sequence.length - 1 ? 16 : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, color: i <= activeStep ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.25)", fontWeight: 500, transition: "color 0.4s" }}>{s.channel}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 300, marginTop: 2 }}>{s.day} · {s.rate}</div>
                </div>
                {i <= activeStep && <span style={{ fontSize: 11, color: s.color, fontWeight: 500, transition: "color 0.4s" }}>{s.status}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InterviewMockup() {
  const [msgIdx, setMsgIdx] = useState(0);
  const messages = [
    { type: "transcript", speaker: "Them", text: "We usually just email a spreadsheet back and forth..." },
    { type: "copilot", text: "💡 They described a workaround. Ask: \"How often does that spreadsheet get out of sync?\"" },
    { type: "transcript", speaker: "You", text: "How often does that spreadsheet get out of sync?" },
    { type: "transcript", speaker: "Them", text: "Honestly? Every single day. It's the biggest pain point on our team." },
    { type: "copilot", text: "🔥 Strong signal — pain is daily and team-wide. Probe: \"What has that cost you?\"" },
  ];
  useEffect(() => { const iv = setInterval(() => setMsgIdx((p) => (p + 1) % messages.length), 2500); return () => clearInterval(iv); }, []);
  const visible = messages.slice(0, msgIdx + 1);
  return (
    <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 16, padding: "24px 20px", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Live interview · 14:32</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#F87171", animation: "pulse 1.5s infinite" }} />
          <span style={{ fontSize: 10, color: "#F87171", fontWeight: 500 }}>Recording</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 200 }}>
        {visible.map((m, i) => (
          <div key={i} style={{
            padding: "10px 14px", borderRadius: 10,
            background: m.type === "copilot" ? "rgba(74,222,128,0.08)" : "rgba(255,255,255,0.04)",
            border: m.type === "copilot" ? "1px solid rgba(74,222,128,0.15)" : "1px solid rgba(255,255,255,0.05)",
            animation: i === msgIdx ? "fadeSlideIn 0.4s ease" : "none",
          }}>
            {m.type === "transcript" && <div style={{ fontSize: 10, color: m.speaker === "You" ? "#60A5FA" : "rgba(255,255,255,0.35)", fontWeight: 500, marginBottom: 4 }}>{m.speaker}</div>}
            <div style={{ fontSize: 12.5, color: m.type === "copilot" ? "#4ADE80" : "rgba(255,255,255,0.75)", lineHeight: 1.5, fontWeight: 300 }}>{m.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightsMockup() {
  const [activeTheme, setActiveTheme] = useState(0);
  const themes = [
    { name: "Workflow handoffs", mentions: 18, strength: 94, status: "Validated", color: "#4ADE80" },
    { name: "Pricing sensitivity", mentions: 12, strength: 62, status: "Mixed", color: "#FB923C" },
    { name: "Mobile access", mentions: 14, strength: 78, status: "Validated", color: "#4ADE80" },
    { name: "Slack integration", mentions: 6, strength: 28, status: "Invalidated", color: "#F87171" },
  ];
  useEffect(() => { const iv = setInterval(() => setActiveTheme((p) => (p + 1) % themes.length), 2400); return () => clearInterval(iv); }, []);
  return (
    <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 16, padding: "24px 20px", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 16 }}>Theme analysis · 24 interviews</div>
      {themes.map((th, i) => (
        <div key={i} style={{ padding: "12px 14px", borderRadius: 10, background: i === activeTheme ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)", border: i === activeTheme ? `1px solid ${th.color}33` : "1px solid transparent", marginBottom: 6, transition: "all 0.4s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{th.name}</span>
            <span style={{ fontSize: 10, color: th.color, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: `${th.color}15` }}>{th.status}</span>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ flex: 1, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <div style={{ width: `${th.strength}%`, height: "100%", background: th.color, borderRadius: 2, transition: "width 0.6s ease" }} />
            </div>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 300, minWidth: 65 }}>{th.mentions} mentions</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── STARFIELD & CONSTELLATIONS ─────────────────────────

function StarFieldInner({ positioning }) {
  const [stars] = useState(() => {
    const s = [];
    for (let i = 0; i < 180; i++) {
      s.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.2 + 0.4,
        opacity: Math.random() * 0.7 + 0.1,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      });
    }
    return s;
  });

  const constellations = [
    { lines: [[8,12,12,8],[12,8,18,6],[18,6,22,9],[22,9,20,15],[20,15,14,17],[14,17,8,12],[14,17,16,22],[16,22,12,26],[16,22,20,25]], opacity: 0.08 },
    { lines: [[75,8,82,14],[82,14,72,16],[72,16,75,8]], opacity: 0.07 },
    { lines: [[35,35,40,30],[40,30,45,36],[45,36,50,31],[50,31,55,37]], opacity: 0.06 },
    { lines: [[60,65,65,62],[65,62,70,64],[70,64,72,60],[72,60,78,58],[78,58,80,62],[80,62,76,65],[76,65,72,60]], opacity: 0.07 },
    { lines: [[88,42,92,38],[92,38,90,44],[88,42,94,40]], opacity: 0.06 },
    { lines: [[12,72,18,68],[18,68,22,72],[22,72,18,76],[18,76,12,72],[18,68,18,76]], opacity: 0.06 },
  ];

  return (
    <div style={{ position: positioning, top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {stars.map((s, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${s.x}%`,
          top: `${s.y}%`,
          width: s.size,
          height: s.size,
          borderRadius: "50%",
          background: s.size > 1.8 ? "#E0E8FF" : "#fff",
          opacity: s.opacity,
          animation: `twinkle ${s.duration}s ${s.delay}s infinite ease-in-out`,
          boxShadow: s.size > 1.5 ? `0 0 ${s.size * 3}px rgba(200,220,255,${s.opacity * 0.5})` : "none",
        }} />
      ))}
      <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
        {constellations.map((c, ci) =>
          c.lines.map(([x1,y1,x2,y2], li) => (
            <line key={`${ci}-${li}`} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`} stroke="rgba(160,190,255,1)" strokeWidth="0.5" opacity={c.opacity} />
          ))
        )}
        {constellations.map((c, ci) => {
          const points = new Set();
          c.lines.forEach(([x1,y1,x2,y2]) => { points.add(`${x1},${y1}`); points.add(`${x2},${y2}`); });
          return [...points].map((p, pi) => {
            const [x,y] = p.split(",");
            return <circle key={`dot-${ci}-${pi}`} cx={`${x}%`} cy={`${y}%`} r="1.5" fill="rgba(160,190,255,0.25)" />;
          });
        })}
      </svg>
      <div style={{ position: "absolute", top: "10%", left: "20%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(100,140,255,0.04) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", top: "50%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(140,100,255,0.03) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: "15%", left: "40%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(80,180,255,0.03) 0%, transparent 70%)" }} />
    </div>
  );
}

function StarField() { return <StarFieldInner positioning="fixed" />; }
function StarFieldAbsolute() { return <StarFieldInner positioning="absolute" />; }

// ─── PRODUCT PAGE ───────────────────────────────────────

function ProductPage({ setPage }) {
  const { refs, anim } = useScrollReveal();
  const phases = [
    {
      num: "01", title: "Discovery Brief", subtitle: "Define your research target",
      desc: "The intelligent intake engine asks sharp questions to build a complete research profile. Industry, persona, company size, seniority, hypothesis type, communication channel, timeline, and budget — all captured in minutes.",
      gradient: "linear-gradient(180deg, #0C1220 0%, #1A2744 60%, #2E5090 100%)",
      mockup: <BriefMockup />,
    },
    {
      num: "02", title: "Audience Sourcing", subtitle: "Find the right people automatically",
      desc: "Meridian hunts for your ideal interview subjects across LinkedIn, Reddit, Discord, professional directories, and conferences — then builds a ranked, enriched contact list.",
      gradient: "linear-gradient(180deg, #0C1220 0%, #1A2744 60%, #3B6CB5 100%)",
      mockup: <SourcingMockup />,
    },
    {
      num: "03", title: "Outreach Orchestration", subtitle: "Reach them on the right channel",
      desc: "Automated, personalized outreach across every channel — crafted to feel human, timed to maximize response, with smart follow-up sequences that adapt based on engagement.",
      gradient: "linear-gradient(180deg, #0C1220 0%, #1A2744 60%, #4A80C8 100%)",
      mockup: <OutreachMockup />,
    },
    {
      num: "04", title: "Interview Copilot", subtitle: "AI-assisted, human-led conversations",
      desc: "The platform doesn't replace the conversation — it supercharges your preparation, guides you in real-time, and captures everything. Suggests follow-ups, flags leading questions, and nudges toward deeper insights.",
      gradient: "linear-gradient(180deg, #0C1220 0%, #1A2744 60%, #2E5090 100%)",
      mockup: <InterviewMockup />,
    },
    {
      num: "05", title: "Insight Synthesis", subtitle: "From conversations to conviction",
      desc: "Every conversation rolls up into a living intelligence dashboard. Themes, contradictions, quotes, and patterns — organized by persona, pain severity, and willingness to pay.",
      gradient: "linear-gradient(180deg, #0C1220 0%, #1A2744 60%, #3B6CB5 100%)",
      mockup: <InsightsMockup />,
    },
  ];

  return (
    <div style={{ background: "#0C1220", fontFamily: SANS, color: "#fff", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <StarField />
      <div style={{ position: "relative", zIndex: 1 }}>
      <NavDark page="product" setPage={setPage} />

      {/* Hero */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 48px 80px", textAlign: "center" }}>
        <h1 style={{ fontFamily: SERIF, fontSize: "clamp(40px,5.5vw,68px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.08, margin: "0 0 24px" }}>
          <em>Five phases.</em> One platform.
        </h1>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, maxWidth: 520, margin: "0 auto", fontWeight: 300 }}>
          From your first hypothesis to validated conviction — every step of customer discovery, orchestrated and accelerated by AI.
        </p>
      </section>

      {/* Phase cards with animated mockups */}
      {phases.map((phase, idx) => (
        <section key={phase.num} id={`phase-${idx}`} ref={(el) => (refs.current[`phase-${idx}`] = el)} style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 48px", ...anim(`phase-${idx}`, idx * 80) }}>
          <div style={{ background: phase.gradient, borderRadius: 24, padding: "48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 16, border: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "monospace", fontWeight: 600, marginBottom: 12 }}>{phase.num}</div>
              <h2 style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.02em", margin: "0 0 8px" }}>{phase.title}</h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", margin: "0 0 20px", fontWeight: 300 }}>{phase.subtitle}</p>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{phase.desc}</p>
            </div>
            <div>
              {phase.mockup}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 48px 100px", textAlign: "center" }}>
        <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px,4vw,48px)", fontWeight: 400, letterSpacing: "-0.02em", margin: "0 0 16px" }}><em>Ready</em> to discover?</h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", maxWidth: 400, margin: "0 auto 36px", fontWeight: 300 }}>Join the waitlist and start building with conviction.</p>
        <button onClick={() => setPage("login")} style={{ padding: "16px 40px", borderRadius: 10, border: "none", background: "#fff", color: "#0C1220", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: SANS }}>
          Get started →
        </button>
      </section>
      <FooterDark setPage={setPage} />
      </div>
    </div>
  );
}

// ─── PRICING PAGE ───────────────────────────────────────

function PricingPage({ setPage }) {
  const [annual, setAnnual] = useState(true);
  const plans = [
    {
      name: "Starter",
      desc: "For solo founders testing their first idea.",
      price: annual ? 0 : 0,
      priceLabel: "Free",
      period: "",
      cta: "Get started free",
      features: ["1 active discovery project", "25 contacts per month", "AI interview guide generation", "Basic synthesis dashboard", "Email outreach only", "Community support"],
      gradient: "linear-gradient(180deg, #0C1220 0%, #1A2744 100%)",
      highlight: false,
    },
    {
      name: "Pro",
      desc: "For founders and PMs running serious discovery.",
      price: annual ? 49 : 59,
      priceLabel: null,
      period: "/month",
      cta: "Start free trial",
      features: ["Unlimited discovery projects", "500 contacts per month", "Multi-channel outreach (email, LinkedIn, phone)", "Real-time interview copilot", "Advanced synthesis with theme clustering", "Hypothesis scorecard", "Contact intelligence & AI recommendations", "Priority support"],
      gradient: "linear-gradient(180deg, #0C1220 0%, #1A2744 50%, #2E5090 100%)",
      highlight: true,
    },
    {
      name: "Team",
      desc: "For product teams and agencies at scale.",
      price: annual ? 99 : 119,
      priceLabel: null,
      period: "/seat/month",
      cta: "Contact sales",
      features: ["Everything in Pro", "Unlimited contacts", "Team collaboration & shared projects", "CRM integrations (HubSpot, Salesforce)", "Custom interview frameworks", "Advanced analytics & reporting", "API access", "Dedicated account manager"],
      gradient: "linear-gradient(180deg, #0C1220 0%, #1A2744 50%, #3B6CB5 100%)",
      highlight: false,
    },
  ];

  return (
    <div style={{ background: "#0C1220", fontFamily: SANS, color: "#fff", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <StarField />
      <div style={{ position: "relative", zIndex: 1 }}>
      <NavDark page="pricing" setPage={setPage} />

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 48px 60px", textAlign: "center" }}>
        <h1 style={{ fontFamily: SERIF, fontSize: "clamp(40px,5.5vw,68px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.08, margin: "0 0 20px" }}>
          <em>Simple,</em> transparent pricing
        </h1>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, maxWidth: 440, margin: "0 auto 40px", fontWeight: 300 }}>
          Start free. Scale when you're ready. No surprises.
        </p>

        {/* Toggle */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 16, padding: "6px 8px", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 60 }}>
          <button onClick={() => setAnnual(false)} style={{ padding: "10px 24px", borderRadius: 8, border: "none", background: !annual ? "rgba(255,255,255,0.12)" : "transparent", color: !annual ? "#fff" : "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: SANS, transition: "all 0.2s" }}>Monthly</button>
          <button onClick={() => setAnnual(true)} style={{ padding: "10px 24px", borderRadius: 8, border: "none", background: annual ? "rgba(255,255,255,0.12)" : "transparent", color: annual ? "#fff" : "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: SANS, transition: "all 0.2s" }}>
            Annual <span style={{ fontSize: 11, color: "#4ADE80", marginLeft: 6, fontWeight: 400 }}>Save 17%</span>
          </button>
        </div>
      </section>

      {/* Plan cards */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "start" }}>
          {plans.map((plan, i) => (
            <div key={i} style={{ background: plan.gradient, borderRadius: 24, padding: "40px 32px", border: plan.highlight ? "1px solid rgba(74,222,128,0.3)" : "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
              {plan.highlight && (
                <div style={{ position: "absolute", top: 16, right: 16, padding: "4px 12px", borderRadius: 6, background: "rgba(74,222,128,0.15)", fontSize: 11, color: "#4ADE80", fontWeight: 500 }}>Most popular</div>
              )}
              <h3 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 6px", color: "#fff" }}>{plan.name}</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: "0 0 24px", fontWeight: 300 }}>{plan.desc}</p>
              <div style={{ marginBottom: 28 }}>
                <span style={{ fontFamily: SERIF, fontSize: 48, fontWeight: 400, color: "#fff" }}>
                  {plan.priceLabel || `$${plan.price}`}
                </span>
                {plan.period && <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontWeight: 300 }}>{plan.period}</span>}
              </div>
              <button onClick={() => setPage("login")} style={{ width: "100%", padding: "14px", borderRadius: 10, border: plan.highlight ? "none" : "1px solid rgba(255,255,255,0.15)", background: plan.highlight ? "#fff" : "transparent", color: plan.highlight ? "#0C1220" : "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: SANS, marginBottom: 28 }}>
                {plan.cta}
              </button>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "rgba(255,255,255,0.65)", fontWeight: 300 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ADE80", flexShrink: 0 }} />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ hint */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px 100px", textAlign: "center" }}>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>
          Questions? Reach us at <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 400 }}>hello@meridian.so</span>
        </p>
      </section>
      <FooterDark setPage={setPage} />
      </div>
    </div>
  );
}

// ─── LOGIN PAGE ─────────────────────────────────────────

function LoginPage({ setPage }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div style={{ background: "linear-gradient(180deg, #0C1220 0%, #1A2744 100%)", fontFamily: SANS, color: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Minimal nav */}
      <div style={{ padding: "22px 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("home")}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: SERIF, fontStyle: "italic" }}>M</div>
          <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.03em" }}>Meridian</span>
        </div>
      </div>

      {/* Centered card */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
        <div style={{ width: "100%", maxWidth: 420, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "48px 40px" }}>
          <h1 style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 400, letterSpacing: "-0.02em", margin: "0 0 8px", textAlign: "center" }}>
            {mode === "login" ? <><em>Welcome</em> back</> : <><em>Get</em> started</>}
          </h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", textAlign: "center", margin: "0 0 36px", fontWeight: 300 }}>
            {mode === "login" ? "Sign in to your Meridian account." : "Create your Meridian account — free during beta."}
          </p>

          {/* Google button */}
          <button style={{ width: "100%", padding: "14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: SANS, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 24 }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>or</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          </div>

          {/* Form fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {mode === "signup" && (
              <div>
                <label style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 400, marginBottom: 6, display: "block" }}>Full name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith"
                  style={{ width: "100%", padding: "13px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: 14, outline: "none", fontFamily: SANS, fontWeight: 300, boxSizing: "border-box" }} />
              </div>
            )}
            <div>
              <label style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 400, marginBottom: 6, display: "block" }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com"
                style={{ width: "100%", padding: "13px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: 14, outline: "none", fontFamily: SANS, fontWeight: 300, boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 400, marginBottom: 6, display: "block" }}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                style={{ width: "100%", padding: "13px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: 14, outline: "none", fontFamily: SANS, fontWeight: 300, boxSizing: "border-box" }} />
            </div>
          </div>

          <button style={{ width: "100%", padding: "14px", borderRadius: 10, border: "none", background: "#fff", color: "#0C1220", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: SANS, marginTop: 24 }}>
            {mode === "login" ? "Sign in" : "Create account"} →
          </button>

          {mode === "login" && (
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textAlign: "right", margin: "12px 0 0", fontWeight: 300, cursor: "pointer" }}>
              Forgot password?
            </p>
          )}

          <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0, fontWeight: 300 }}>
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <span onClick={() => setMode(mode === "login" ? "signup" : "login")} style={{ color: "#fff", fontWeight: 500, cursor: "pointer" }}>
                {mode === "login" ? "Sign up" : "Sign in"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: "24px 48px", textAlign: "center" }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontWeight: 300 }}>© 2026 Meridian</span>
      </div>
    </div>
  );
}

// ─── APP ROUTER ─────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <>
      <link href={FONTS_LINK} rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { -webkit-font-smoothing: antialiased; }
        input::placeholder { color: rgba(255,255,255,0.25); }
        input:focus { border-color: rgba(255,255,255,0.25) !important; }
        button:hover { opacity: 0.9; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes twinkle { 0%,100% { opacity: var(--tw-base, 0.3); transform: scale(1); } 50% { opacity: 1; transform: scale(1.3); } }
      `}</style>
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "product" && <ProductPage setPage={setPage} />}
      {page === "pricing" && <PricingPage setPage={setPage} />}
      {page === "login" && <LoginPage setPage={setPage} />}
    </>
  );
}
