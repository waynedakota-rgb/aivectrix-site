/**
 * AIVectrix website content.
 *
 * Edit the words on the site here. Layout and animation code live in
 * src/components and src/scripts, so you can change copy without touching them.
 *
 * Factual boundaries (keep these when editing):
 * - Experience entries are from the founder's employment history. They are NOT
 *   AIVectrix client projects. Never call these employers clients or partners.
 * - The founder's current employer stays anonymous everywhere.
 * - No invented metrics, testimonials, or guaranteed outcomes.
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
  "A business challenge for AIVectrix",
  "Here’s the challenge we’re facing:\n\n\nWhat we’ve tried:\n\n\nWhat a successful outcome would look like:\n\n",
);

export const AI_MAIL = mailto("AI strategy conversation");

export const seo = {
  title: "AIVectrix | Business Consulting, Operational Excellence & AI Strategy",
  description:
    "AIVectrix connects people, processes, technology, and data through business strategy, operational excellence, leadership development, and practical AI solutions.",
  ogImage: "/og-image.png",
  ogImageAlt:
    "AIVectrix logo on deep charcoal with the line: Complex challenges. Meaningful results.",
};

export const nav = {
  links: [
    { href: "#approach", label: "Approach" },
    { href: "#capabilities", label: "Capabilities" },
    { href: "#experience", label: "Experience" },
    { href: "#founder", label: "Founder" },
  ],
  cta: "Tell us your challenge",
};

export const hero = {
  eyebrow: "Business consulting. Built for real-world execution.",
  headline: ["Complex challenges.", "Meaningful results."],
  body: "We connect people, processes, technology, and data to help businesses solve persistent problems, strengthen leadership, and turn strategy into action.",
  cta: "Tell us your biggest challenge",
  secondary: { href: "#approach", label: "Explore our approach" },
  note: "Practical experience. Clear thinking. Sustainable improvement.",
};

export const invitation = {
  headline:
    "What’s the one problem your team hasn’t been able to solve that you know is possible?",
  body: "Bring us the challenge that keeps resurfacing, the strategy that hasn’t translated into action, or the opportunity you haven’t found a way to unlock.",
  closing:
    "We’ll help you work toward a solution or recommend someone better suited to help.",
};

export const approach = {
  label: "Our approach",
  headline: ["Connect the parts.", "Strengthen the whole."],
  body: "Lasting improvement requires more than a new tool or a better process. It requires people who can lead, processes that support the work, technology that serves a purpose, and data that informs decisions.",
  pillars: [
    { name: "People", text: "Build leadership, capability, and ownership." },
    { name: "Processes", text: "Reduce waste and variation. Make good work repeatable." },
    { name: "Technology", text: "Apply tools and AI where they solve real problems." },
    { name: "Data", text: "Create visibility and guide better decisions." },
  ],
  statement: "Technology alone doesn’t transform organizations. Great people do.",
  statementBody:
    "The strongest opportunities emerge when leadership, operational excellence, and emerging technologies work together.",
};

export const capabilities = {
  label: "How we help",
  headline: "From defining the problem to making progress.",
  items: [
    {
      title: "Strategy & Execution",
      text: "Clarify direction, align priorities, and translate strategy into practical plans, operating rhythms, and accountability.",
    },
    {
      title: "Operational Excellence",
      text: "Use Lean principles, structured problem solving, variation reduction, and Six Sigma to strengthen how work gets done.",
    },
    {
      title: "Leadership & Team Development",
      text: "Develop leaders who coach effectively, build ownership, and create the conditions for strong team performance.",
    },
    {
      title: "Training & Curriculum",
      text: "Turn complex knowledge into practical courses, playbooks, training materials, and repeatable learning systems.",
    },
    {
      title: "AI Strategy & Solutions",
      text: "Identify useful AI opportunities, establish a practical direction, and develop solutions around real business needs.",
    },
  ],
};

export const ai = {
  label: "Practical AI",
  headline: ["You know AI matters.", "Where do you start?"],
  body: "Start with the business problem. We help you identify where AI can support your people, improve workflows, and create meaningful value, then shape a practical path forward.",
  steps: ["Understand the work.", "Identify the opportunity.", "Build a practical path."],
  cta: "Let’s talk about AI",
};

export const experience = {
  label: "Experience behind the approach",
  headline: ["Built through", "hands-on leadership."],
  intro:
    "AIVectrix draws on Dakota Wayne’s experience across manufacturing operations, engineering, operational excellence, leadership development, and enterprise transformation.",
  note: "Selected work from the founder’s professional career.",
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
  role: "Founder, AIVectrix",
  headline: ["Practical experience.", "People at the center."],
  bio: [
    "Dakota Wayne brings 15+ years of experience across manufacturing operations, engineering, operational excellence, and enterprise transformation.",
    "His work spans strategy, leadership development, training architecture, AI, Industry 4.0, industrial automation, robotics, and digital manufacturing technologies.",
    "He focuses on developing high-performing teams, challenging conventional thinking, and turning complex challenges into sustainable results.",
    "Beyond his professional work, Dakota is passionate about entrepreneurship, leadership development, and building sustainable economic opportunities in developing regions around the world.",
  ],
  credentials: [
    { kind: "Degree", text: "MBA, Operational Excellence" },
    { kind: "Certification", text: "Lean Six Sigma Black Belt" },
  ],
  expertise: [{ kind: "Expertise", text: "Leadership Development & Training Architecture" }],
  statement: "Lead yourself. Lead your team. Transform the organization. Change the world!",
  /**
   * Headshot: save the photo as public/images/dakota-wayne.webp
   * (square or 4:5 portrait, at least 800px wide), then set `headshot` to
   * "/images/dakota-wayne.webp". Leave it null to show the monogram panel.
   */
  headshot: null as string | null,
  headshotAlt: "Portrait of Dakota Wayne, founder of AIVectrix",
};

export const contact = {
  headline: "Bring us the problem.",
  body: "Tell us what your team is facing, what you’ve already tried, and what a better outcome would look like.",
  cta: "Tell us your challenge",
  fit: "If we’re not the right fit, we’ll recommend someone better suited to help.",
};

export const footer = {
  tagline: "People. Processes. Technology. Data.",
};
