export const DIMENSIONS = [
  "Governance & Fiduciary Responsibility",
  "Financial Oversight & Audit",
  "Strategy, Risk & Performance",
  "Human Capital & ESG",
  "Board Dynamics & Executive Readiness",
] as const;

export type Dimension = (typeof DIMENSIONS)[number];

export interface Question {
  id: number;
  dim: number;
  text: string;
  options: [number, string][];
}

export const QUESTIONS: Question[] = [
  // ── Dimension 0: Governance & Fiduciary Responsibility ──────────────────────
  {
    id: 1, dim: 0,
    text: "How well do you understand board members' fiduciary duties—duty of care, loyalty, and obedience—and how they apply to day-to-day board decisions?",
    options: [
      [1, "I have a surface-level understanding but haven't studied them formally"],
      [2, "I understand the concepts but have limited experience applying them"],
      [3, "I can articulate and apply these duties in real board scenarios"],
      [4, "I regularly advise on fiduciary matters and have deep governance expertise"],
    ],
  },
  {
    id: 2, dim: 0,
    text: "How familiar are you with how Fortune 1000 boards are structured—including committees (Audit, Compensation, Nominating/Governance, Risk)?",
    options: [
      [1, "I know boards have committees but am unclear on their mandates"],
      [2, "I understand committee roles generally but not their detailed responsibilities"],
      [3, "I can describe each committee's charter, composition, and key deliverables"],
      [4, "I've participated in or advised these committees and know their inner workings"],
    ],
  },
  {
    id: 3, dim: 0,
    text: "How confident are you in your knowledge of SEC disclosure rules, proxy statement requirements, and shareholder voting mechanics?",
    options: [
      [1, "This is largely unfamiliar territory for me"],
      [2, "I've reviewed proxy statements but don't deeply understand the regulatory framework"],
      [3, "I can read and interpret proxies and understand key disclosure requirements"],
      [4, "I've worked directly with securities counsel on disclosures and governance filings"],
    ],
  },
  {
    id: 4, dim: 0,
    text: "What is your experience with board governance best practices—director independence, board evaluations, succession planning for the board itself?",
    options: [
      [1, "I'm aware these exist but haven't engaged with them directly"],
      [2, "I've read about them through governance organizations (NACD, WCD, etc.)"],
      [3, "I've implemented or overseen governance practices that align with these standards"],
      [4, "I'm a recognized practitioner—I've led board evaluations or governance redesigns"],
    ],
  },

  // ── Dimension 1: Financial Oversight & Audit ────────────────────────────────
  {
    id: 5, dim: 1,
    text: "How comfortable are you reading and critically analyzing audited financial statements—income statement, balance sheet, and cash flow statement?",
    options: [
      [1, "I rely on finance teams to interpret financials for me"],
      [2, "I understand high-level financials but struggle with nuanced analysis"],
      [3, "I can read, compare, and identify key trends and anomalies independently"],
      [4, "I have deep financial literacy—I regularly assess financial health and flag risks"],
    ],
  },
  {
    id: 6, dim: 1,
    text: "How well do you understand the role of the Audit Committee—its oversight of the external auditor, internal audit function, and financial reporting integrity?",
    options: [
      [1, "I know audit committees exist but am unclear on their specific mandate"],
      [2, "I have a general sense of their oversight role"],
      [3, "I can describe audit committee responsibilities and the key questions directors ask"],
      [4, "I've collaborated with audit committees or served in an advisory capacity"],
    ],
  },
  {
    id: 7, dim: 1,
    text: "How familiar are you with GAAP/IFRS accounting principles and how changes in accounting standards affect reported results?",
    options: [
      [1, "This is not an area of expertise for me"],
      [2, "I have a working familiarity but wouldn't consider myself financially expert"],
      [3, "I understand accounting principles well enough to ask informed questions"],
      [4, "I have formal accounting/finance training or CPA-level financial acumen"],
    ],
  },
  {
    id: 8, dim: 1,
    text: "How experienced are you with capital allocation decisions—M&A, share buybacks, dividends, debt structure, and investment prioritization?",
    options: [
      [1, "Limited—this has been outside my CHRO scope"],
      [2, "I've had exposure through board presentations or M&A due diligence on talent"],
      [3, "I've contributed to capital allocation discussions at the executive level"],
      [4, "I've been a key voice in capital allocation strategy with CEO and CFO"],
    ],
  },

  // ── Dimension 2: Strategy, Risk & Performance ───────────────────────────────
  {
    id: 9, dim: 2,
    text: "How actively do you participate in setting or stress-testing enterprise strategy at the board or C-suite level (not just executing on it)?",
    options: [
      [1, "I primarily execute strategy others define"],
      [2, "I contribute to strategy as it relates to people and organization"],
      [3, "I'm a regular voice in broader enterprise strategy discussions"],
      [4, "I co-own enterprise strategy—I challenge, shape, and influence beyond HR"],
    ],
  },
  {
    id: 10, dim: 2,
    text: "How well can you assess enterprise risk—including operational, financial, reputational, regulatory, and cybersecurity risks?",
    options: [
      [1, "I manage HR risk but have limited visibility into enterprise-wide risk"],
      [2, "I participate in ERM discussions but don't lead them"],
      [3, "I can identify, assess, and articulate the major risks facing a company"],
      [4, "I've led or co-led enterprise risk frameworks and board risk committee work"],
    ],
  },
  {
    id: 11, dim: 2,
    text: "How comfortable are you evaluating CEO and executive performance—including setting metrics, conducting assessments, and managing CEO succession?",
    options: [
      [1, "CEO evaluation has been led by others; I've had limited involvement"],
      [2, "I've supported CEO evaluation processes but not owned them"],
      [3, "I've designed or significantly contributed to CEO evaluation and succession planning"],
      [4, "I've led CEO succession and own the board's talent agenda independently"],
    ],
  },
  {
    id: 12, dim: 2,
    text: "How familiar are you with shareholder activism, proxy advisory firms (ISS, Glass Lewis), and how boards respond to activist campaigns?",
    options: [
      [1, "This is largely new territory for me"],
      [2, "I've been peripherally aware but haven't been directly involved"],
      [3, "I've been involved in shareholder engagement or activist defense preparation"],
      [4, "I've advised boards on activist situations or led shareholder engagement directly"],
    ],
  },

  // ── Dimension 3: Human Capital & ESG ───────────────────────────────────────
  {
    id: 13, dim: 3,
    text: "How prepared are you to represent human capital strategy at the board level—workforce planning, talent pipeline, culture, and organizational health metrics?",
    options: [
      [1, "I can present HR metrics but haven't positioned them in strategic board terms"],
      [2, "I've presented to boards but am still developing my board-level narrative"],
      [3, "I can translate human capital data into business and shareholder value language"],
      [4, "I've driven human capital as a board-level strategic agenda item"],
    ],
  },
  {
    id: 14, dim: 3,
    text: "How confident are you advising on executive compensation design—including pay philosophy, incentive structures, equity grants, and pay equity?",
    options: [
      [1, "Comp design has been owned by others; I have basic familiarity"],
      [2, "I've been involved in comp design but not at the board/committee level"],
      [3, "I can lead comp committee discussions and defend compensation philosophy"],
      [4, "I've presented exec comp programs to boards and proxy advisory firms"],
    ],
  },
  {
    id: 15, dim: 3,
    text: "How well can you speak to a company's ESG strategy—including climate, DEI, human rights, supply chain responsibility, and ESG reporting frameworks (GRI, SASB, TCFD)?",
    options: [
      [1, "ESG is an emerging area for me—I'm building my knowledge"],
      [2, "I understand the DEI and social dimensions well but less so the E and G"],
      [3, "I can speak to the full ESG agenda and its intersection with HR and governance"],
      [4, "I've led ESG strategy, board reporting, or external ESG communications"],
    ],
  },
  {
    id: 16, dim: 3,
    text: "How experienced are you advising on workforce transformation—AI/automation's impact, reskilling at scale, hybrid work strategy, and future-of-work planning?",
    options: [
      [1, "I'm aware of these trends but haven't led major transformation efforts"],
      [2, "I've been involved in workforce transformation initiatives"],
      [3, "I've led significant workforce transformation and can advise boards on it"],
      [4, "I'm a recognized thought leader in workforce transformation and future of work"],
    ],
  },

  // ── Dimension 4: Board Dynamics & Executive Readiness ──────────────────────
  {
    id: 17, dim: 4,
    text: "How confident are you in your ability to influence without authority in a boardroom setting—asking probing questions, building consensus, and driving outcomes as a peer to other directors?",
    options: [
      [1, "The boardroom dynamic is different from executive roles; I'm still developing this"],
      [2, "I'm effective in senior executive settings but the board peer dynamic is new"],
      [3, "I can hold my own in board discussions and add distinct value to deliberations"],
      [4, "I'm highly effective in board-like settings—I've observed or participated in boards"],
    ],
  },
  {
    id: 18, dim: 4,
    text: "How prepared are you for the time and personal liability expectations of board service—including D&O insurance, personal liability exposure, and time commitment (typically 200–250 hours/year)?",
    options: [
      [1, "I haven't fully researched these implications yet"],
      [2, "I understand the time commitment but haven't fully assessed liability implications"],
      [3, "I've researched both and feel prepared for what board service entails"],
      [4, "I've consulted legal counsel, understand D&O insurance, and am fully prepared"],
    ],
  },
  {
    id: 19, dim: 4,
    text: "How developed is your board-facing personal brand—including a board bio, defined value proposition, and a network of board sponsors and search firms?",
    options: [
      [1, "I haven't yet built a board-specific profile or narrative"],
      [2, "I have a general executive bio but haven't tailored it for board positioning"],
      [3, "I have a board bio and value proposition and have begun outreach to search firms"],
      [4, "I have strong relationships with board recruiters and sponsors actively advocating for me"],
    ],
  },
  {
    id: 20, dim: 4,
    text: "How actively are you engaged with governance organizations (NACD, WCD, YPO, Spencer Stuart Board Index communities) and peer networks of current directors?",
    options: [
      [1, "I haven't yet joined governance organizations or director peer networks"],
      [2, "I'm a member of one organization but haven't been deeply engaged"],
      [3, "I actively participate in governance education programs and director peer networks"],
      [4, "I'm a recognized contributor in governance communities—speaker, committee member, or mentor"],
    ],
  },
];

export interface Resource {
  title: string;
  type: string;
  description: string;
  focus: string;
}

export const EDUCATION: Record<string, Resource[]> = {
  "Governance & Fiduciary Responsibility": [
    {
      title: "NACD Blue Ribbon Commission Reports",
      type: "Reports",
      description: "The National Association of Corporate Directors publishes authoritative guidance on governance best practices.",
      focus: "Fiduciary duties, board structure, governance frameworks",
    },
    {
      title: "NACD Director Professionalism Course",
      type: "Certification",
      description: "The gold standard in director education. NACD Board Leadership Fellow credential is recognized by board search firms.",
      focus: "Board roles, fiduciary duties, governance mechanics",
    },
    {
      title: "Harvard Law School Forum on Corporate Governance",
      type: "Articles",
      description: "Cutting-edge analysis on governance, securities law, and director obligations.",
      focus: "Legal frameworks, SEC rules, shareholder rights",
    },
    {
      title: "WCD (Women Corporate Directors) Education Programs",
      type: "Network",
      description: "Premier organization for current and aspiring women directors with education and networking.",
      focus: "Director development, boardroom strategy, peer mentorship",
    },
  ],
  "Financial Oversight & Audit": [
    {
      title: "Financial Literacy for Directors (NACD)",
      type: "Course",
      description: "Specifically designed for non-financial directors seeking audit committee readiness.",
      focus: "Reading financials, GAAP, audit committee responsibilities",
    },
    {
      title: "CFO/CHRO Immersion: Financial Acumen for HR Leaders",
      type: "Program",
      description: "Programs at Cornell ILR, Wharton Executive Education, and Kellogg offer targeted financial literacy for senior HR leaders.",
      focus: "P&L, balance sheet, capital allocation, M&A",
    },
    {
      title: "KPMG Audit Committee Institute",
      type: "Resource",
      description: "Free resources, webcasts, and reports specifically for audit committee members and aspiring members.",
      focus: "Audit oversight, financial reporting, internal controls",
    },
    {
      title: "PwC Governance Insights Center",
      type: "Resource",
      description: "Annual director surveys, governance guides, and financial oversight frameworks.",
      focus: "Financial oversight, risk management, audit trends",
    },
  ],
  "Strategy, Risk & Performance": [
    {
      title: "MIT Sloan Director Education Program",
      type: "Course",
      description: "Intensive program covering strategy, innovation, and digital disruption from the board's perspective.",
      focus: "Strategy oversight, technology risk, disruption",
    },
    {
      title: "COSO Enterprise Risk Management Framework",
      type: "Framework",
      description: "The Committee of Sponsoring Organizations framework is the standard for enterprise risk management.",
      focus: "Risk identification, oversight, and reporting to boards",
    },
    {
      title: "Spencer Stuart Board Index (Annual)",
      type: "Research",
      description: "The definitive annual research on S&P 500 board composition, trends, and director qualifications.",
      focus: "Board composition, director skills matrices, search trends",
    },
    {
      title: "CEO Succession Best Practices (NACD / Russell Reynolds)",
      type: "Reports",
      description: "Research and frameworks for boards managing CEO succession—the board's most critical talent decision.",
      focus: "CEO evaluation, succession planning, leadership assessment",
    },
  ],
  "Human Capital & ESG": [
    {
      title: "Human Capital Reporting Frameworks (SASB, ISO 30414)",
      type: "Standards",
      description: "The emerging standards for quantifying and disclosing human capital metrics to investors.",
      focus: "Workforce metrics, disclosure, investor relations",
    },
    {
      title: "GRI / TCFD / ISSB ESG Reporting Standards",
      type: "Frameworks",
      description: "The primary ESG reporting standards boards and CHROs need to understand for investor engagement.",
      focus: "ESG disclosure, climate reporting, social metrics",
    },
    {
      title: "World Economic Forum Human Capital Report",
      type: "Research",
      description: "Annual research on workforce trends, reskilling, and the future of work—critical for board-level conversations.",
      focus: "Future of work, talent strategy, workforce transformation",
    },
    {
      title: "Executive Compensation Governance (FW Cook, Meridian)",
      type: "Reports",
      description: "Leading compensation consultants publish annual benchmarking data and governance best practices.",
      focus: "Pay equity, comp committee, say-on-pay, incentive design",
    },
  ],
  "Board Dynamics & Executive Readiness": [
    {
      title: "Directors Academy / 30% Coalition",
      type: "Network",
      description: "Connects diverse executive talent to board opportunities. Strong placement track record.",
      focus: "Board placement, director development, search firm relationships",
    },
    {
      title: "Board Ready: How to Find, Win, and Succeed in Corporate Board Service",
      type: "Book",
      description: "Practical guide covering board search strategy, interviews, onboarding, and thriving as a director.",
      focus: "Board search, positioning, personal brand, interview prep",
    },
    {
      title: "Private Company & Advisory Board Service (First Boards)",
      type: "Strategy",
      description: "Starting with advisory boards or private/nonprofit boards builds credibility for public company seats.",
      focus: "Building board experience, advisory roles, governance practice",
    },
    {
      title: "Board Search Firms: Spencer Stuart, Heidrick, Egon Zehnder, Korn Ferry",
      type: "Network",
      description: "The four firms handling the majority of Fortune 500 board searches. Relationship-building is essential.",
      focus: "Search firm relationships, board bio, positioning for public boards",
    },
  ],
};

export interface Profile {
  name: string;
  title: string;
  company: string;
  years_chro: string;
  industry: string;
  company_size: string;
  board_exp: string;
  goal_timeline: string;
}

export function computeScores(answers: Record<number, number>) {
  const dimScores = DIMENSIONS.map((_, i) => {
    const qs = QUESTIONS.filter((q) => q.dim === i);
    return qs.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
  });
  const total = dimScores.reduce((a, b) => a + b, 0);
  return { dimScores, total };
}

export function readinessLevel(pct: number) {
  if (pct >= 85) return { label: "Board Ready Distinguished", color: "emerald" };
  if (pct >= 70) return { label: "Board Ready Qualified", color: "indigo" };
  if (pct >= 50) return { label: "Board Ready Developing", color: "amber" };
  return { label: "Board Ready Aspiring", color: "sky" };
}

export function dimLevel(score: number) {
  if (score >= 14) return { label: "Expert", color: "emerald" };
  if (score >= 11) return { label: "Proficient", color: "indigo" };
  if (score >= 8) return { label: "Developing", color: "amber" };
  return { label: "Early Stage", color: "red" };
}
