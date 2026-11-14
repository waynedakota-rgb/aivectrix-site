/**
 * Vectrix website content.
 *
 * Edit the words on the site here. Layout and animation code live in
 * src/components and src/scripts, so you can change copy without touching them.
 *
 * Factual boundaries (keep these when editing):
 * - Experience entries are from the founder's employment history. They are NOT
 *   Vectrix client projects. Never call these employers clients or partners.
 * - The founder's current employer stays anonymous everywhere.
 * - No invented metrics, testimonials, or guaranteed outcomes.
 * - Vectrix is one person today (Dakota). Write in the first person ("I"),
 *   never "we", until the team actually grows.
 * - Buyer: business owners, entrepreneurs, and leaders driving change,
 *   anywhere in North America.
 *
 * PLACEHOLDER entries are commented out below. Fill them with real facts,
 * then uncomment. Never ship a guess.
 */

export const EMAIL = "customerservice@aivectrix.com";
export const LINKEDIN = "https://www.linkedin.com/in/dakota-wayne-183944b5/";
export const SITE_URL = "https://aivectrix.com/";

/** Builds a properly encoded mailto link. */
export function mailto(subject?: string, body?: string): string {
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${EMAIL}${params.length ? `?${params.join("&")}` : ""}`;
}

export const CHALLENGE_MAIL = mailto(
  "A business challenge for Vectrix",
  "Here’s the challenge we’re facing:\n\n\nWhat we’ve tried:\n\n\nWhat a successful outcome would look like:\n\n",
);

export const AI_MAIL = mailto("AI strategy conversation");

/** One plain sentence that says what Vectrix is. Reused in meta, schema and llms.txt. */
export const DEFINITION =
  "Vectrix is a business consulting practice for owners, entrepreneurs, and leaders across North America who need to drive change. Founder Dakota Wayne brings 15+ years in manufacturing operations, engineering, and operational excellence to strategy, Lean and Six Sigma, leadership development, and practical AI.";

export const AREA_SERVED = "North America";

/**
 * Cloudflare Web Analytics site token (cookieless, no consent banner needed).
 * Find it in Cloudflare dashboard > Analytics & Logs > Web Analytics > your
 * site > "Manage site" (the token value inside the JS snippet).
 * null = analytics off. Setting it also updates the CSP and privacy page.
 */
export const CF_ANALYTICS_TOKEN: string | null = "a8ae1d193e3845cab75981d1de9bd404";

export const seo = {
  title: "Vectrix | Business Consulting for Leaders Driving Change",
  description:
    "Consulting for business owners, entrepreneurs, and leaders across North America: strategy and execution, operational excellence, leadership development, and practical AI.",
  ogImage: "/og-image.png",
  ogImageAlt:
    "Vectrix logo on deep charcoal with the line: Complex challenges. Meaningful results.",
};

export const nav = {
  links: [
    { href: "/#approach", label: "Approach" },
    { href: "/#capabilities", label: "Services" },
    { href: "/#experience", label: "Experience" },
    { href: "/about/", label: "About" },
  ],
  cta: "Tell me your challenge",
};

export const hero = {
  eyebrow: "Business consulting across North America",
  headline: ["Consulting for leaders", "making change stick."],
  body: "I work with business owners, entrepreneurs, and leaders to fix how work gets done, build people who own the results, and put AI to work where it solves a real problem.",
  cta: "Tell me your biggest challenge",
  secondary: { href: "/#capabilities", label: "See how I help" },
  proof: [
    { value: "15+", label: "years in operations and engineering" },
    { value: "MBA", label: "Operational Excellence" },
    { value: "Black Belt", label: "Lean Six Sigma" },
    { value: "10+", label: "facilities in a replication model I created" },
  ],
};

export const invitation = {
  headline:
    "What’s the one problem your team hasn’t been able to solve that you know is possible?",
  body: "Bring me the challenge that keeps resurfacing, the strategy that hasn’t turned into action, or the opportunity you haven’t found a way to reach.",
  closing:
    "I’ll help you work toward a solution, or recommend someone better suited to help.",
};

export const approach = {
  label: "The approach",
  headline: ["Connect the parts.", "Strengthen the whole."],
  body: "Lasting improvement takes more than a new tool or a better process. It takes people who can lead, processes that support the work, technology with a purpose, and data that informs decisions.",
  pillars: [
    { name: "People", text: "Build leadership, capability, and ownership." },
    { name: "Processes", text: "Reduce waste and variation. Make good work repeatable." },
    { name: "Technology", text: "Apply tools and AI where they solve real problems." },
    { name: "Data", text: "Create visibility and guide better decisions." },
  ],
  statement: "Technology alone doesn’t transform organizations. Great people do.",
  statementBody:
    "The strongest opportunities show up when leadership, operational excellence, and new technology work together.",
};

export const capabilities = {
  label: "How I help",
  headline: "From defining the problem to making progress.",
  items: [
    {
      title: "Strategy & Execution",
      text: "Clarify direction, set priorities, and turn strategy into practical plans, operating rhythms, and accountability.",
      href: "/operational-excellence-consulting/",
    },
    {
      title: "Operational Excellence",
      text: "Use Lean, structured problem solving, variation reduction, and Six Sigma to strengthen how work gets done.",
      href: "/operational-excellence-consulting/",
    },
    {
      title: "Leadership & Team Development",
      text: "Develop leaders who coach well, build ownership, and create the conditions for strong team performance.",
      href: "/leadership-development-training/",
    },
    {
      title: "Training & Curriculum",
      text: "Turn complex knowledge into practical courses, playbooks, training materials, and repeatable learning systems.",
      href: "/leadership-development-training/",
    },
    {
      title: "AI Strategy & Solutions",
      text: "Find the AI opportunities worth pursuing, set a practical direction, and build solutions around real business needs.",
      href: "/ai-strategy-consulting/",
    },
  ],
};

export const ai = {
  label: "Practical AI",
  headline: ["You know AI matters.", "Where do you start?"],
  body: "Start with the business problem. I help you find where AI can support your people, improve workflows, and create real value, then shape a practical path forward.",
  steps: ["Understand the work.", "Identify the opportunity.", "Build a practical path."],
  cta: "Let’s talk about AI",
};

export const experience = {
  label: "Experience behind the approach",
  headline: ["Built through", "hands-on leadership."],
  intro:
    "Vectrix draws on Dakota Wayne’s experience across manufacturing operations, engineering, operational excellence, leadership development, and enterprise transformation.",
  note: "Selected work from the founder’s professional career. These are employers, not Vectrix clients.",
  entries: [
    {
      title: "Enterprise transformation and leadership systems",
      org: "North American manufacturer",
      text: "Designed and deployed Industry 4.0 adoption frameworks, developed learning systems and playbooks for automation and operational excellence, and created models for replicating effective systems across 10+ facilities.",
      extra:
        "Experience also includes Lean and Hoshin Kanri training, daily management frameworks, structured coaching, and leadership accountability.",
    },
    {
      title: "Business process excellence and engineering transformation",
      org: "Powin",
      text: "Developed structured problem-solving and throughput improvement methodologies, facilitated improvement workshops, and designed process frameworks and training systems supporting global operations and PLM transformation.",
    },
    {
      title: "Global engineering standards and knowledge transfer",
      org: "Carlisle Fluid Technologies",
      text: "Built global standards, frameworks, and training systems across engineering teams, developed phase-gate processes for new product introduction, and supported adoption through workshops, coaching, and structured knowledge transfer.",
    },
  ],
};

export const founder = {
  name: "Dakota Wayne",
  role: "Founder, Vectrix",
  headline: ["Practical experience.", "People at the center."],
  bio: [
    "Dakota Wayne brings 15+ years of experience across manufacturing operations, engineering, operational excellence, and enterprise transformation.",
    "His work spans strategy, leadership development, training architecture, AI, Industry 4.0, industrial automation, robotics, and digital manufacturing technologies.",
    "His methods apply wherever work repeats and people lead it, not only in manufacturing.",
    "He focuses on developing high-performing teams, challenging conventional thinking, and turning complex challenges into sustainable results.",
    "Beyond his professional work, Dakota is passionate about entrepreneurship, leadership development, and building sustainable economic opportunities in developing regions around the world.",
  ],
  credentials: [
    { kind: "Degree", text: "MBA, Operational Excellence" },
    { kind: "Certification", text: "Lean Six Sigma Black Belt" },
  ],
  expertise: [{ kind: "Expertise", text: "Leadership Development & Training Architecture" }],
  knowsAbout: [
    "Operational excellence",
    "Lean",
    "Six Sigma",
    "Hoshin Kanri",
    "Structured problem solving",
    "Leadership development",
    "Training architecture",
    "Industry 4.0",
    "Industrial automation",
    "Artificial intelligence strategy",
  ],
  statement: "Lead yourself. Lead your team. Transform the organization. Change the world!",
  /**
   * Headshot: save the photo as public/images/dakota-wayne.webp
   * (square or 4:5 portrait, at least 800px wide), then set `headshot` to
   * "/images/dakota-wayne.webp". Leave it null to show the monogram panel.
   */
  headshot: "/images/dakota-wayne.webp" as string | null,
  headshotAlt: "Portrait of Dakota Wayne, founder of Vectrix",
};

export const contact = {
  headline: "Bring me the problem.",
  body: "Tell me what your team is facing, what you’ve already tried, and what a better outcome would look like.",
  cta: "Tell me your challenge",
  fit: "You work directly with me. If I’m not the right fit, I’ll recommend someone better suited to help.",
};

export type Service = {
  slug: string;
  nav: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  answer: string;
  covers: { title: string; text: string }[];
  steps: string[];
  evidence: string[];
  mail: string;
};

/** Service pages. One search intent per page. Facts only. */
export const services: Service[] = [
  {
    slug: "operational-excellence-consulting",
    nav: "Operational excellence",
    title: "Operational Excellence & Lean Six Sigma Consulting | Vectrix",
    description:
      "Operational excellence consulting for business owners and leaders in North America: Lean, Six Sigma, structured problem solving, and strategy turned into daily execution.",
    eyebrow: "Operational excellence consulting",
    h1: "Operational excellence and Lean Six Sigma consulting",
    answer:
      "Vectrix helps business owners and leaders reduce waste and variation, solve problems that keep coming back, and turn strategy into daily execution. The work uses Lean, Six Sigma, structured problem solving, and Hoshin Kanri, led by a Lean Six Sigma Black Belt with an MBA in Operational Excellence.",
    covers: [
      {
        title: "Strategy into execution",
        text: "Clear priorities, practical plans, operating rhythms, and accountability, so the strategy shows up in the work.",
      },
      {
        title: "Lean and waste reduction",
        text: "Find where time and effort leak out of a process, then make the good way the repeatable way.",
      },
      {
        title: "Six Sigma and variation reduction",
        text: "Use data to find why results swing, and fix the cause instead of the symptom.",
      },
      {
        title: "Structured problem solving",
        text: "A shared method your team can use without me, so the next problem doesn’t wait for me.",
      },
      {
        title: "Daily management and Hoshin Kanri",
        text: "Connect long-range goals to the daily work through deployment, daily management, and leader routines.",
      },
    ],
    steps: ["Understand the work as it really runs.", "Find the few causes that matter most.", "Build the routines that keep the gain."],
    evidence: [
      "Developed structured problem-solving and throughput improvement methodologies and facilitated improvement workshops.",
      "Experience includes Lean and Hoshin Kanri training and daily management frameworks.",
      "Created models for replicating effective systems across 10+ facilities.",
    ],
    mail: "Operational excellence conversation",
  },
  {
    slug: "ai-strategy-consulting",
    nav: "AI strategy",
    title: "AI Strategy Consulting for Business Leaders | Vectrix",
    description:
      "Practical AI strategy consulting for business owners and leaders in North America. Start with the business problem, find the AI opportunities worth pursuing, and build a path forward.",
    eyebrow: "AI strategy consulting",
    h1: "Practical AI strategy consulting for business leaders",
    answer:
      "Vectrix helps business owners and leaders figure out where AI is worth using and where it isn’t. The work starts with the business problem, finds the opportunities that support your people and workflows, and shapes a practical path forward, including solutions built around real business needs.",
    covers: [
      {
        title: "Opportunity assessment",
        text: "Map the work, then find where AI can remove effort, improve decisions, or open something new.",
      },
      {
        title: "A practical direction",
        text: "Decide what to try first, what to skip, and what it takes to get there with the people and data you have.",
      },
      {
        title: "Solutions built around real needs",
        text: "Develop AI solutions shaped to the workflow, not workflows bent to fit a tool.",
      },
      {
        title: "People and adoption",
        text: "Training and change support so the people doing the work can use what gets built.",
      },
    ],
    steps: ["Understand the work.", "Identify the opportunity.", "Build a practical path."],
    evidence: [
      "Designed and deployed Industry 4.0 adoption frameworks.",
      "Developed learning systems and playbooks for automation and operational excellence.",
      "Background spans AI, industrial automation, robotics, and digital manufacturing technologies.",
    ],
    mail: "AI strategy conversation",
  },
  {
    slug: "leadership-development-training",
    nav: "Leadership & training",
    title: "Leadership Development & Training Design Consulting | Vectrix",
    description:
      "Leadership development and training curriculum design for business owners and leaders in North America: coaching, ownership, playbooks, and repeatable learning systems.",
    eyebrow: "Leadership development and training",
    h1: "Leadership development and training curriculum design",
    answer:
      "Vectrix helps business owners and leaders build managers who coach, teams that take ownership, and training that turns hard-won knowledge into repeatable learning. The work covers leadership development, structured coaching, and course, playbook, and curriculum design.",
    covers: [
      {
        title: "Leaders who coach",
        text: "Develop leaders who coach well, build ownership, and set the conditions for strong team performance.",
      },
      {
        title: "Accountability without micromanagement",
        text: "Leader routines and structured coaching that keep standards high and decisions close to the work.",
      },
      {
        title: "Training and curriculum design",
        text: "Turn complex knowledge into practical courses, playbooks, and training materials.",
      },
      {
        title: "Repeatable learning systems",
        text: "Build the system that keeps training current as your business and people change.",
      },
    ],
    steps: ["Understand what leaders face today.", "Design the learning around real work.", "Build the routines that make it stick."],
    evidence: [
      "Built global standards, frameworks, and training systems across engineering teams.",
      "Developed learning systems and playbooks for automation and operational excellence.",
      "Experience includes structured coaching, daily management, and leadership accountability.",
    ],
    mail: "Leadership development conversation",
  },
];

export const footer = {
  tagline: "People. Processes. Technology. Data.",
};
