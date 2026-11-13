// Single source of truth for the home page. Swap text, links and images here.
import portrait from "../../../assets/img/Hooded Graphite Portrait Sketch.png";
import markdown from "../../../assets/img/markdown.png";
import moviehub from "../../../assets/img/projects/moviehub-home.webp";
import movieNotifier from "../../../assets/img/movieupdatenotifier.png";
import onlycss from "../../../assets/img/onlycss.png";
import calculator from "../../../assets/img/projects/calculator-expr.webp";
import dice from "../../../assets/img/projects/dice-game.webp";
import guess from "../../../assets/img/projects/guess-game.webp";
import interest from "../../../assets/img/projects/interest-result.webp";
import pwdStrength from "../../../assets/img/projects/password-strong.webp";
import techtips from "../../../assets/img/projects/techtips-tip.webp";
import tictactoe from "../../../assets/img/projects/tictactoe-play.webp";
import quickbite from "../../../assets/img/quickbite.png";
import bloodmate from "../../../assets/img/projects/bloodmate-home.webp";

export interface ProjectItem {
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

export const site = {
  brand: "CHARAN",
  name: "Naga Charan Kumar Reddy",
  role: "Senior Full Stack Developer",
  email: "nagacharankumarreddy@gmail.com",
  cv: `${import.meta.env.BASE_URL}Naga_Charan_Full_Stack_Dev.pdf`,
  year: new Date().getFullYear(),
};

// `id` scrolls to a section on this page, `to` navigates to another route.
export const navLinks: { label: string; id?: string; to?: string }[] = [
  { label: "Home", id: "home" },
  { label: "About Me", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "works" },
  { label: "Landing Pages", id: "landing-pages" },
  { label: "Services", id: "services" },
  { label: "Learning Hub", to: "/learning-hub" },
];

export type SocialKey = "instagram" | "x" | "linkedin" | "github";

// TODO: the Instagram and X URLs are placeholders, replace them with your profiles.
export const socials: { key: SocialKey; label: string; href: string }[] = [
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/" },
  { key: "x", label: "Twitter", href: "https://x.com/" },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/naga-charan-kumar-reddy-11378616a/",
  },
  { key: "github", label: "GitHub", href: "https://github.com/nagacharankumarreddy/" },
];

export const hero = {
  lineOne: "EXPLORE MY",
  lineTwo: "PORTFOLIO",
  // Any image works; a transparent cut-out PNG gives the strongest overlap effect.
  portrait,
  portraitAlt: "Portrait of Naga Charan",
  label: ["Senior Full Stack Developer", "Portfolio — Vol. 26"],
  introTitle: "I am passionate about…",
  intro:
    "Building user-focused products end to end. Driven by curiosity, a design mindset and close attention to detail.",
  scrollHint: "Scroll to explore",
};

export const about = {
  wordLeft: "ABOUT",
  wordRight: "ME",
  headline: "Turning visionary ideas into fast, distinctive digital experiences",
  location: "Hyderabad, India • Worldwide",
  craftLabel: "Discipline & Craft",
  craft: "React • TypeScript • Python • Node.js",
  // Each entry is revealed as its own line.
  lines: [
    "Senior full-stack developer with 5+ years of building enterprise web apps.",
    "Shipped products across healthcare, financial services and banking.",
    "From interface to infrastructure, refined until it feels effortless.",
  ],
  primaryLabel: "Get in touch",
  secondaryLabel: "Services",
};

export const experience = {
  marquee: "WIPRO 2020 BERKADIA 2023 HCA HEALTHCARE 2025 PRESENT",
  intro: {
    eyebrow: "Origin & Foundations",
    tag: "5+ Years",
    heading: "WHERE I'VE BEEN",
    text: "Three companies across banking, financial services and healthcare.",
  },
  // One panel per company, oldest first.
  roles: [
    {
      date: "2020 — 2023",
      company: "Wipro",
      heading: "FRONT END DEVELOPER",
      text: "Built the interface of a payments application for a banking client.",
      columns: [
        { label: "Interfaces", text: "React dashboards for tracking payment activity in real time." },
        { label: "Integration", text: "REST APIs wired to dynamic UI, with no page reloads." },
        { label: "Quality", text: "Refactored UI code, form validation and accessibility." },
      ],
    },
    {
      date: "2023 — 2025",
      company: "Berkadia",
      heading: "FULL STACK DEVELOPER",
      text: "Built loan-servicing and cash-movement applications for financial services.",
      columns: [
        { label: "Frontend", text: "Reusable React components, lazy loading and memoization." },
        { label: "Backend", text: "Node.js microservices with CQRS and MySQL." },
        { label: "Search", text: "Elasticsearch for fast, real-time record search." },
      ],
    },
    {
      date: "2025 — PRESENT",
      company: "HCA Healthcare",
      heading: "SENIOR FULL STACK DEVELOPER",
      text: "Building a healthcare data platform that brings patient information together behind one secure interface.",
      columns: [
        { label: "Frontend", text: "React, TypeScript and Vite, with reusable components." },
        { label: "Backend", text: "Python and FastAPI services on PostgreSQL." },
        { label: "Security", text: "Microsoft Entra ID, OAuth 2.0 and API gateways." },
      ],
    },
  ],
  tags: ["Healthcare", "Finance", "Banking"],
};

export const carousel = {
  heading: "FEATURED PROJECT",
  label: "Landing Pages",
  visitLabel: "Visit site",
  items: [
    {
      title: "BloodMate",
      subtitle: "Find Blood Donors Near You",
      image: bloodmate,
      href: "https://nagacharankumarreddy.github.io/blood-mate/",
    },
    {
      title: "Quick Bite",
      subtitle: "Online Food Ordering Experience",
      image: quickbite,
      href: "https://nagacharankumarreddy.github.io/quick-bite/",
    },
    {
      title: "Movie Hub",
      subtitle: "Effortless Movie Filtering",
      image: moviehub,
      href: "https://nagacharankumarreddy.github.io/movie-hub/",
    },
    {
      title: "Tech Tips",
      subtitle: "Make Your Tech Life Easy",
      image: techtips,
      href: "https://nagacharankumarreddy.github.io/tech-tips/",
    },
    {
      title: "Only CSS",
      subtitle: "Responsive Site, Zero JavaScript",
      image: onlycss,
      href: "https://nagacharankumarreddy.github.io/Only-CSS/",
    },
    {
      title: "Markdown Editor",
      subtitle: "Live Text Formatting Studio",
      image: markdown,
      href: "https://nagacharankumarreddy.github.io/mark-down-editor/",
    },
    {
      title: "Calculator",
      subtitle: "A Tool for Quick Calculation",
      image: calculator,
      href: "https://nagacharankumarreddy.github.io/calculator/",
    },
  ] satisfies ProjectItem[],
};

export const works = {
  title: "WORKS '26",
  items: [
    {
      title: "Movie Notifier",
      subtitle: "Backend service",
      image: movieNotifier,
      href: "https://movie-update-notifier.onrender.com/movies/",
    },
    {
      title: "Tic-Tac-Toe",
      subtitle: "Two-player game",
      image: tictactoe,
      href: "https://nagacharankumarreddy.github.io/tictactoe/",
    },
    {
      title: "Guess the Number",
      subtitle: "Number guessing game",
      image: guess,
      href: "https://nagacharankumarreddy.github.io/Guess-The-Number/",
    },
    {
      title: "Interest Calculator",
      subtitle: "Finance tool",
      image: interest,
      href: "https://nagacharankumarreddy.github.io/interest-calculator/",
    },
    {
      title: "Dice Game",
      subtitle: "Casual game",
      image: dice,
      href: "https://nagacharankumarreddy.github.io/dice-game/",
    },
    {
      title: "Password Check",
      subtitle: "Security utility",
      image: pwdStrength,
      href: "https://nagacharankumarreddy.github.io/password-strength-checker/",
    },
  ] satisfies ProjectItem[],
};

export const services = {
  heading: "SERVICES",
  subtitle: "Design and engineering, from first sketch to production",
  inquireLabel: "Inquire",
  items: [
    {
      title: "UI/UX",
      text: "Research-led interface design: flows, wireframes and polished screens that make complex products feel obvious.",
      deliverables: "User flows, wireframes, hi-fi screens, prototype",
    },
    {
      title: "Web Design",
      text: "Distinctive, responsive websites with a clear visual system and typography that carries the brand.",
      deliverables: "Art direction, responsive layouts, design system",
    },
    {
      title: "Landing Page Design",
      text: "Focused, conversion-minded pages with cinematic motion that tell one story and tell it well.",
      deliverables: "Page concept, copy structure, motion spec, build",
    },
    {
      title: "Development",
      text: "Full-stack builds with React, TypeScript, Python, Node.js and cloud infrastructure. Fast, secure and easy to maintain.",
      deliverables: "Frontend, APIs, microservices, database, CI/CD",
    },
  ],
};

export const contact = {
  heading: "LET'S TALK",
  cta: "Contact Me",
};
