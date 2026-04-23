/**
 * BoardReady — Ghost CHRO Test Data Seeder
 * Simulates 15 CHROs from the Fortune 500 top 20 filling out the profile
 * intake form and answering all 20 assessment questions in-character.
 *
 * Run: node scripts/seed-test-data.mjs
 *
 * Questions (dim 0-4, Q1-Q20, scored 1-4):
 *  Dim 0 – Governance & Fiduciary (Q1-Q4)
 *  Dim 1 – Financial Oversight & Audit (Q5-Q8)
 *  Dim 2 – Strategy, Risk & Performance (Q9-Q12)
 *  Dim 3 – Human Capital & ESG (Q13-Q16)
 *  Dim 4 – Board Dynamics & Executive Readiness (Q17-Q20)
 *
 * Max per dim = 16 (4 questions × 4 pts).  Total max = 80.
 */

const BASE_URL = "http://localhost:3000";

// ── Score Helper ──────────────────────────────────────────────────────────────
// answers: 20-element array indexed 0-19 (Q1→index 0, Q20→index 19)
function computeScores(answers) {
  const dims = [
    answers.slice(0, 4),   // Governance (Q1-Q4)
    answers.slice(4, 8),   // Financial  (Q5-Q8)
    answers.slice(8, 12),  // Strategy   (Q9-Q12)
    answers.slice(12, 16), // Human Cap  (Q13-Q16)
    answers.slice(16, 20), // Board Dyn  (Q17-Q20)
  ];
  const dimScores = dims.map(d => d.reduce((a, b) => a + b, 0));
  return { dimScores, totalScore: dimScores.reduce((a, b) => a + b, 0) };
}

// ── Participants WITH completed assessments ────────────────────────────────────
// answers[i] = answer to Q(i+1), values 1-4
// Personality notes are stored in admin Notes field via update-participant

const WITH_ASSESSMENT = [

  {
    profile: {
      name: "Donna Morris",
      title: "Chief People Officer",
      email: "donna.morris@walmart-test.boardready",
      company: "Walmart",
      industry: "Retail / Consumer Goods",
      company_size: "10,000+",
      years_chro: "7",
      board_exp: "Advisory boards only",
      goal_timeline: "12–18 months",
    },
    // Q1-Q4  Governance: concepts known, limited formal governance engagement
    // Q5-Q8  Financial: high-level literacy; capital allocation outside her lane
    // Q9-Q12 Strategy: strong—enterprise strategy voice, CEO succession contributor
    // Q13-Q16 Human Capital: exceptional—recognized FoW thought leader at scale
    // Q17-Q20 Board Dynamics: early stage—board peer dynamic is new territory
    answers: [
      2, 2, 1, 3,   // Gov: 8
      2, 2, 1, 2,   // Fin: 7
      3, 2, 3, 2,   // Strat: 10
      4, 3, 3, 4,   // HC: 14
      2, 2, 2, 2,   // BD: 8
    ],
    lastActive: "2026-04-08",
    cohort: "Cohort 1 — Spring 2026",
    adminNotes: "Flagship Fortune #1 participant. Manages 1.6M employees — human capital narrative is unmatched. Weakest on boardroom decorum and audit-level financial fluency. Highly motivated; vocal about wanting a consumer or retail-sector board seat. Top priority for Korn Ferry intro.",
  },

  {
    profile: {
      name: "Beth Galetti",
      title: "SVP People Experience & Technology",
      email: "beth.galetti@amazon-test.boardready",
      company: "Amazon",
      industry: "E-Commerce / Cloud Computing",
      company_size: "10,000+",
      years_chro: "8",
      board_exp: "None",
      goal_timeline: "12–18 months",
    },
    // Q1-Q4  Governance: general familiarity, tech culture less governance-formal
    // Q5-Q8  Financial: stronger than average CHRO—Amazon's data culture bleeds in
    // Q9-Q12 Strategy: co-owns enterprise strategy; data-driven risk assessment
    // Q13-Q16 Human Capital: world-class people science and workforce transformation
    // Q17-Q20 Board Dynamics: early; hasn't built board brand yet
    answers: [
      2, 2, 2, 2,   // Gov: 8
      3, 2, 2, 3,   // Fin: 10
      4, 3, 2, 2,   // Strat: 11
      4, 3, 3, 4,   // HC: 14
      2, 2, 2, 1,   // BD: 7
    ],
    lastActive: "2026-04-07",
    cohort: "Cohort 1 — Spring 2026",
    adminNotes: "Highly data-driven and systems-thinker. Comfortable in tech paradigms but new to public-company board expectations. Passionate about AI governance as a differentiator. Very interested in tech/AI-sector boards. Strong ask on networking intros to Heidrick & Struggles.",
  },

  {
    profile: {
      name: "Amy Coleman",
      title: "Chief People Officer",
      email: "amy.coleman@microsoft-test.boardready",
      company: "Microsoft",
      industry: "Enterprise Software / AI",
      company_size: "10,000+",
      years_chro: "3",
      board_exp: "Non-profit board member",
      goal_timeline: "18–24 months",
    },
    // Q1-Q4  Governance: more aware than average—Microsoft governance-forward culture
    // Q5-Q8  Financial: developing; newer in CPO role, still building finance fluency
    // Q9-Q12 Strategy: strong—growth mindset culture; involved in CEO succession post-Hogan
    // Q13-Q16 Human Capital: very strong; culture transformation / hybrid work leader
    // Q17-Q20 Board Dynamics: has non-profit board; board peer dynamic developing
    answers: [
      2, 3, 2, 3,   // Gov: 10
      2, 2, 2, 2,   // Fin: 8
      3, 2, 3, 2,   // Strat: 10
      4, 3, 3, 3,   // HC: 13
      2, 2, 2, 2,   // BD: 8
    ],
    lastActive: "2026-04-06",
    cohort: "Cohort 1 — Spring 2026",
    adminNotes: "Recently elevated from VP to CPO after Kathleen Hogan moved to EVP Strategy. Brings Microsoft's growth mindset culture credentials. Wants healthcare or enterprise tech board. Needs financial acumen and audit committee coaching. Thoughtful and self-aware — strong program participant.",
  },

  {
    profile: {
      name: "Fiona Cicconi",
      title: "Chief People Officer",
      email: "fiona.cicconi@alphabet-test.boardready",
      company: "Alphabet / Google",
      industry: "Search / AI / Cloud",
      company_size: "10,000+",
      years_chro: "4",
      board_exp: "None",
      goal_timeline: "12–18 months",
    },
    // Q1-Q4  Governance: below average—Google culture historically governance-light
    // Q5-Q8  Financial: moderate; strategy-brained but not deeply financial
    // Q9-Q12 Strategy: co-owns enterprise strategy; AI transformation lens
    // Q13-Q16 Human Capital: exceptional—navigated 2023 workforce restructuring + AI era
    // Q17-Q20 Board Dynamics: developing; no formal board exposure yet
    answers: [
      2, 2, 1, 2,   // Gov: 7
      2, 2, 2, 2,   // Fin: 8
      4, 3, 3, 2,   // Strat: 12
      4, 3, 4, 4,   // HC: 15
      2, 2, 2, 2,   // BD: 8
    ],
    lastActive: "2026-04-05",
    cohort: "Cohort 1 — Spring 2026",
    adminNotes: "High potential—arguably the deepest people strategy mind in cohort. Navigated Google's 2023 layoffs + AI transition. Exceptional at translating HC into business value. Governance fundamentals need work; unfamiliar with public board fiduciary norms. Top candidate for an AI-sector or tech board.",
  },

  {
    profile: {
      name: "Robin Leopold",
      title: "Head of Human Resources",
      email: "robin.leopold@jpmorgan-test.boardready",
      company: "JPMorgan Chase",
      industry: "Financial Services / Banking",
      company_size: "10,000+",
      years_chro: "9",
      board_exp: "1 non-profit board (3 years)",
      goal_timeline: "6–12 months",
    },
    // Q1-Q4  Governance: strong—financial services = governance-intensive environment
    // Q5-Q8  Financial: strong—worked alongside CFO at one of world's largest banks
    // Q9-Q12 Strategy: solid; regular presence in enterprise strategy discussions
    // Q13-Q16 Human Capital: very strong—272,000-employee talent machine
    // Q17-Q20 Board Dynamics: most developed in cohort; non-profit board gave her reps
    answers: [
      3, 4, 3, 3,   // Gov: 13
      3, 3, 3, 3,   // Fin: 12
      3, 3, 3, 2,   // Strat: 11
      4, 4, 3, 3,   // HC: 14
      3, 3, 3, 2,   // BD: 11
    ],
    lastActive: "2026-04-08",
    cohort: "Cohort 1 — Spring 2026",
    adminNotes: "Most board-ready participant in Cohort 1. Financial services background gives natural governance and financial fluency. Already on a non-profit board. Actively seeking a Fortune 500 board seat. High urgency — 6–12 month timeline. First priority for Spencer Stuart and Heidrick introductions.",
  },

  {
    profile: {
      name: "Kiersten Robinson",
      title: "Chief People & Places Officer",
      email: "kiersten.robinson@ford-test.boardready",
      company: "Ford Motor Company",
      industry: "Automotive",
      company_size: "10,000+",
      years_chro: "5",
      board_exp: "Advisory boards — 2 organizations",
      goal_timeline: "12–18 months",
    },
    // Q1-Q4  Governance: building—advisory boards gave exposure, not formal governance
    // Q5-Q8  Financial: developing; M&A talent diligence gave some financial exposure
    // Q9-Q12 Strategy: strong—led Ford's Blueprint for Tomorrow EV workforce transformation
    // Q13-Q16 Human Capital: exceptional—skills-based hiring pioneer, EV reskilling at scale
    // Q17-Q20 Board Dynamics: developing; well-known externally but no board reps yet
    answers: [
      2, 2, 2, 3,   // Gov: 9
      2, 2, 1, 2,   // Fin: 7
      3, 3, 3, 2,   // Strat: 11
      4, 3, 3, 4,   // HC: 14
      2, 2, 2, 2,   // BD: 8
    ],
    lastActive: "2026-04-04",
    cohort: "Cohort 1 — Spring 2026",
    adminNotes: "Led Ford's Blueprint for Tomorrow — a landmark workforce transformation. Passionate keynote speaker on skills-based hiring and EV workforce transition. Strong external personal brand but board-facing narrative is underdeveloped. Wants industrial or clean energy board. Financial fluency is the biggest gap.",
  },

  {
    profile: {
      name: "Sandra Chen",
      title: "EVP & Chief Human Resources Officer",
      email: "sandra.chen@unitedhealth-test.boardready",
      company: "UnitedHealth Group",
      industry: "Healthcare / Health Insurance",
      company_size: "10,000+",
      years_chro: "6",
      board_exp: "Healthcare system advisory board",
      goal_timeline: "12–18 months",
    },
    // Q1-Q4  Governance: strong—healthcare regulation creates governance fluency
    // Q5-Q8  Financial: strong—healthcare a heavily financially scrutinized sector
    // Q9-Q12 Strategy: solid; contributes to enterprise strategy but not lead voice
    // Q13-Q16 Human Capital: strong—400,000 employees, benefits/workforce depth
    // Q17-Q20 Board Dynamics: early stages—healthcare advisory board gives some exposure
    answers: [
      3, 3, 2, 3,   // Gov: 11
      3, 3, 2, 2,   // Fin: 10
      3, 2, 3, 2,   // Strat: 10
      4, 3, 3, 3,   // HC: 13
      2, 2, 2, 2,   // BD: 8
    ],
    lastActive: "2026-04-03",
    cohort: "Cohort 1 — Spring 2026",
    adminNotes: "Healthcare CHRO with strong regulatory/compliance instincts. Quiet but analytically sharp. Wants a healthcare or benefits-sector board. Articulating strategic impact beyond HR is a development area — needs narrative coaching. Second-tier priority for Korn Ferry healthcare practice intro.",
  },

  {
    profile: {
      name: "Patricia Holt",
      title: "Managing Director & Chief HR Officer",
      email: "patricia.holt@citigroup-test.boardready",
      company: "Citigroup",
      industry: "Financial Services / Global Banking",
      company_size: "10,000+",
      years_chro: "8",
      board_exp: "Community bank board — compensation committee member (2 years)",
      goal_timeline: "6–12 months",
    },
    // Q1-Q4  Governance: strong—financial services + existing board seat
    // Q5-Q8  Financial: strong—presented to Citi's board compensation committee
    // Q9-Q12 Strategy: solid contributor; regulatory strategy exposure is unique
    // Q13-Q16 Human Capital: strong—225,000+ workforce globally
    // Q17-Q20 Board Dynamics: second most developed—bank board gave real board reps
    answers: [
      3, 4, 3, 3,   // Gov: 13
      3, 3, 3, 3,   // Fin: 12
      3, 2, 3, 2,   // Strat: 10
      4, 4, 3, 3,   // HC: 14
      3, 3, 3, 2,   // BD: 11
    ],
    lastActive: "2026-04-07",
    cohort: "Cohort 1 — Spring 2026",
    adminNotes: "Second-strongest candidate in the cohort after Robin Leopold. Community bank board service gave her real compensation committee experience. Has already briefed proxy advisory firms. Very high urgency for placement. Top priority for Spencer Stuart financial services board practice. Advocate for other program participants — potential cohort mentor.",
  },

  {
    profile: {
      name: "Diane Forsythe",
      title: "VP Human Resources & Corporate Services",
      email: "diane.forsythe@chevron-test.boardready",
      company: "Chevron",
      industry: "Energy / Oil & Gas",
      company_size: "10,000+",
      years_chro: "5",
      board_exp: "Non-profit board — 1 organization",
      goal_timeline: "18–24 months",
    },
    // Q1-Q4  Governance: solid—energy sector = risk governance intensive
    // Q5-Q8  Financial: solid—oil & gas has complex financial reporting requirements
    // Q9-Q12 Strategy: moderate; risk assessment strength but less strategic voice
    // Q13-Q16 Human Capital: solid but not people-first culture company
    // Q17-Q20 Board Dynamics: early stage; introverted, needs presence coaching
    answers: [
      3, 3, 2, 2,   // Gov: 10
      3, 2, 3, 2,   // Fin: 10
      2, 3, 2, 2,   // Strat: 9
      3, 3, 3, 3,   // HC: 12
      2, 2, 2, 2,   // BD: 8
    ],
    lastActive: "2026-04-02",
    cohort: "Cohort 1 — Spring 2026",
    adminNotes: "Strong risk governance instincts from energy sector. Interested in energy transition and ESG-focused boards — compelling narrative given Chevron's context. Thoughtful but introverted; needs boardroom presence and confidence coaching. Would benefit from a board shadowing or advisory role first.",
  },

  {
    profile: {
      name: "Renee Alvarez",
      title: "SVP Human Resources",
      email: "renee.alvarez@costco-test.boardready",
      company: "Costco Wholesale",
      industry: "Retail / Wholesale Club",
      company_size: "10,000+",
      years_chro: "4",
      board_exp: "None",
      goal_timeline: "18–24 months",
    },
    // Q1-Q4  Governance: early stage—retail culture, no formal governance engagement
    // Q5-Q8  Financial: early stage—limited capital allocation or audit exposure
    // Q9-Q12 Strategy: developing—contributes but not a strategic driver
    // Q13-Q16 Human Capital: strong—Costco's employee-first culture is her superpower
    // Q17-Q20 Board Dynamics: needs foundational work—hasn't started board brand yet
    answers: [
      2, 1, 1, 2,   // Gov: 6
      2, 1, 1, 1,   // Fin: 5
      2, 2, 2, 1,   // Strat: 7
      4, 3, 2, 3,   // HC: 12
      2, 1, 1, 1,   // BD: 5
    ],
    lastActive: "2026-03-31",  // 9 days ago → stalled alert territory
    cohort: "Cohort 1 — Spring 2026",
    adminNotes: "Lowest overall score in cohort but high motivation. Costco's legendary employee-first culture is a compelling board narrative for human capital-focused companies. Needs the most foundational governance and financial education. Has not responded to last 2 follow-up outreaches — flag for re-engagement call. Consider pairing with Robin Leopold as peer mentor.",
  },

  {
    profile: {
      name: "Marcus Okafor",
      title: "EVP Human Resources",
      email: "marcus.okafor@exxonmobil-test.boardready",
      company: "ExxonMobil",
      industry: "Energy / Integrated Oil & Gas",
      company_size: "10,000+",
      years_chro: "6",
      board_exp: "University advisory board",
      goal_timeline: "12–18 months",
    },
    // Q1-Q4  Governance: solid—energy sector regulatory and governance exposure
    // Q5-Q8  Financial: solid—ExxonMobil is capital allocation intensive
    // Q9-Q12 Strategy: moderate—strong on risk, less on shareholder engagement
    // Q13-Q16 Human Capital: solid but energy sector less people-forward
    // Q17-Q20 Board Dynamics: developing—university board gave limited governance reps
    answers: [
      3, 3, 2, 3,   // Gov: 11
      3, 2, 3, 2,   // Fin: 10
      2, 3, 2, 1,   // Strat: 8
      3, 3, 3, 3,   // HC: 12
      2, 2, 2, 1,   // BD: 7
    ],
    lastActive: "2026-03-28",  // 12 days ago → stalled alert
    cohort: "Cohort 2 — Fall 2026",
    adminNotes: "ExxonMobil CHRO with deep global workforce compliance and risk expertise. Stalled since completing Module 1 — energy industry travel schedule making engagement difficult. Flagged for follow-up call from Chad. Governance and financial acumen are stronger than peers; strategy and board dynamics are development areas. Would be compelling on an energy transition or ESG-focused board.",
  },

];

// ── Enrolled only — no assessment yet ─────────────────────────────────────────

const ENROLLED_ONLY = [
  {
    name: "Laurie Havanec",
    title: "EVP & Chief People Officer",
    email: "laurie.havanec@cvs-test.boardready",
    company: "CVS Health",
    industry: "Healthcare / Pharmacy Retail",
    company_size: "10,000+",
    sfdc_id: "001CVS2026A",
    cohort: "Cohort 1 — Spring 2026",
    makeStalled: false,
  },
  {
    name: "Deirdre O'Brien",
    title: "SVP People & Retail",
    email: "deirdre.obrien@apple-test.boardready",
    company: "Apple",
    industry: "Consumer Electronics / Software",
    company_size: "10,000+",
    sfdc_id: "001APL2026B",
    cohort: "Cohort 2 — Fall 2026",
    makeStalled: false,
  },
  {
    name: "Angela Santone",
    title: "SVP Human Resources & CHRO",
    email: "angela.santone@att-test.boardready",
    company: "AT&T",
    industry: "Telecommunications",
    company_size: "10,000+",
    sfdc_id: "001ATT2026C",
    cohort: "Cohort 1 — Spring 2026",
    makeStalled: true,  // In Progress + 10-day-old Last Active → triggers alert
  },
  {
    name: "James Watkins",
    title: "EVP People & Culture",
    email: "james.watkins@gm-test.boardready",
    company: "General Motors",
    industry: "Automotive",
    company_size: "10,000+",
    sfdc_id: "001GM2026D",
    cohort: "Cohort 2 — Fall 2026",
    makeStalled: true,
  },
];

// ── API Helpers ────────────────────────────────────────────────────────────────

async function post(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  try { return JSON.parse(text); } catch { return { error: text }; }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Main ───────────────────────────────────────────────────────────────────────

async function seed() {
  console.log("\n🏛️  BoardReady Ghost CHRO Seeder");
  console.log("   Simulating full intake + assessment form fills\n");

  // ── Phase 1: Assessment completers ─────────────────────────────────────────
  console.log("━━ Phase 1: CHROs who completed the diagnostic assessment ━━\n");

  for (const p of WITH_ASSESSMENT) {
    process.stdout.write(`  Enrolling  ${p.profile.name.padEnd(22)} (${p.profile.company.padEnd(26)}) ... `);

    const { dimScores, totalScore } = computeScores(p.answers);
    const pct = Math.round((totalScore / 80) * 100);

    let result;
    try {
      result = await post("/api/airtable/save", {
        profile: p.profile,
        dimScores,
        totalScore,
      });
    } catch (e) {
      console.log(`✗  Fetch error: ${e.message}`);
      continue;
    }

    const recordId = result?.recordId;
    if (!recordId) {
      console.log(`✗  ${JSON.stringify(result)}`);
      continue;
    }
    console.log(`✓  ${recordId}  [${pct}% — G:${dimScores[0]} F:${dimScores[1]} S:${dimScores[2]} HC:${dimScores[3]} BD:${dimScores[4]}]`);

    // Patch cohort (save hardcodes Cohort 1), Last Active, and admin notes
    await sleep(300);
    await post("/api/airtable/update-participant", {
      recordId,
      fields: {
        "Cohort": p.cohort,
        "Last Active": p.lastActive,
        "Notes": [
          `Company: ${p.profile.company}`,
          `Industry: ${p.profile.industry}`,
          `Company Size: ${p.profile.company_size}`,
          `Years as CHRO: ${p.profile.years_chro}`,
          `Board Experience: ${p.profile.board_exp}`,
          `Goal Timeline: ${p.profile.goal_timeline}`,
          ``,
          `Admin Notes: ${p.adminNotes}`,
        ].join("\n"),
      },
    });

    await sleep(400); // Airtable rate limit buffer
  }

  // ── Phase 2: Enrolled only, no assessment ──────────────────────────────────
  console.log("\n━━ Phase 2: CHROs enrolled but not yet started ━━\n");

  for (const p of ENROLLED_ONLY) {
    process.stdout.write(`  Enrolling  ${p.name.padEnd(22)} (${p.company.padEnd(26)}) ... `);

    let result;
    try {
      result = await post("/api/airtable/enroll", p);
    } catch (e) {
      console.log(`✗  Fetch error: ${e.message}`);
      continue;
    }

    const recordId = result?.id;
    if (!recordId) {
      console.log(`✗  ${JSON.stringify(result)}`);
      continue;
    }
    console.log(`✓  ${recordId}`);

    if (p.makeStalled) {
      await sleep(300);
      await post("/api/airtable/update-participant", {
        recordId,
        fields: {
          "Program Status": "In Progress",
          "Last Active": "2026-03-30",  // 10 days ago → stalled alert
        },
      });
      console.log(`     ↳ Marked as stalled (In Progress, Last Active: 2026-03-30)`);
    }

    await sleep(400);
  }

  // ── Summary ────────────────────────────────────────────────────────────────
  const scores = WITH_ASSESSMENT.map(p => {
    const { totalScore } = computeScores(p.answers);
    return { name: p.profile.name, score: totalScore, pct: Math.round((totalScore/80)*100) };
  }).sort((a, b) => b.score - a.score);

  console.log("\n━━ Score leaderboard ━━\n");
  scores.forEach((s, i) => {
    const bar = "█".repeat(Math.round(s.pct / 5)) + "░".repeat(20 - Math.round(s.pct / 5));
    console.log(`  ${String(i+1).padStart(2)}. ${s.name.padEnd(24)} ${bar} ${s.pct}%  (${s.score}/80)`);
  });

  console.log(`\n✅  Done — ${WITH_ASSESSMENT.length + ENROLLED_ONLY.length} ghost CHROs seeded.`);
  console.log(`   Admin view → http://localhost:3000/admin  (PIN: boardready)\n`);
}

seed().catch(err => {
  console.error("\n✗  Seeder failed:", err.message);
  process.exit(1);
});
