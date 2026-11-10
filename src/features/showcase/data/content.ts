// Single source of truth for the home page. Swap text, links and images here.
import calculator from "../../../assets/img/calculator.png";
import portrait from "../../../assets/img/charanbw.png";
import dice from "../../../assets/img/dice.png";
import guess from "../../../assets/img/Guess.png";
import interest from "../../../assets/img/interest.png";
import markdown from "../../../assets/img/markdown.png";
import moviehub from "../../../assets/img/moviehub.png";
import movieNotifier from "../../../assets/img/movieupdatenotifier.png";
import onlycss from "../../../assets/img/onlycss.png";
import pwdStrength from "../../../assets/img/pwdstrengthcheck.png";
import quickbite from "../../../assets/img/quickbite.png";
import techtips from "../../../assets/img/techtips.jpg";
import tictactoe from "../../../assets/img/tictactoe.png";

export interface ProjectItem {
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

export const site = {
  brand: "CHARAN",
  name: "Naga Charan Kumar Reddy",
  role: "Full Stack Developer",
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
  label: ["Full Stack Developer", "Portfolio — Vol. 26"],
  introTitle: "I am passionate about…",
  intro:
    "Building user-focused products end to end. Driven by curiosity, a design mindset and close attention to detail.",
  scrollHint: "Scroll to explore",
};

export const about = {
  wordLeft: "ABOUT",
  wordRight: "ME",
  eyebrow: "Who I am",
  manifesto:
    "I'm a full-stack developer driven by curiosity and a relentless desire for growth. I thrive on complex challenges, stay close to modern technologies, and refine every detail until the result feels effortless to use.",
  meta: [
    { label: "Location", value: "India" },
    { label: "Experience", value: "5+ Years" },
    { label: "Focus", value: "Full Stack Web" },
  ],
  cvLabel: "Download CV",
  contactLabel: "Contact",
};

export const experience = {
  marquee: "CREATIVE TECHNOLOGIST 2023 SELF-DIRECTED 2025 PRESENT",
  intro: {
    eyebrow: "Origin & Foundations",
    tag: "Foundation Alignment",
    heading: "WHERE I'VE BEEN",
    text: "My professional journey through different roles and environments.",
  },
  first: {
    date: "2023 — 2025",
    heading: "CREATIVE TECHNOLOGIST",
    eyebrow: "Self-Directed Learning",
    text: "Two years of deliberate practice: shipping small products, studying how great interfaces are built, and turning curiosity into a repeatable craft.",
    milestones: [
      { label: "Milestone 01", text: "Mastered React, Node.js and the modern JavaScript ecosystem." },
      { label: "Milestone 02", text: "Built a portfolio of 15+ production-ready projects." },
    ],
  },
  second: {
    date: "2025 — PRESENT",
    heading: "FULL STACK DEVELOPER",
    text: "Building premium web experiences, interactive frontends, scalable backends and AI-powered applications.",
    columns: [
      { label: "Delivery", text: "Ships features end to end, from interface to database." },
      { label: "Infrastructure", text: "Docker, Kubernetes and CI/CD pipelines on Azure." },
      { label: "Motion System", text: "Scroll-driven, 60fps interfaces built on GSAP." },
    ],
  },
  tags: ["Learning", "Freelance"],
};

export const carousel = {
  heading: "FEATURED PROJECT",
  label: "Landing Pages",
  visitLabel: "Visit site",
  items: [
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
  heading: "THE SERVICES WE PROVIDE",
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
      text: "Full-stack builds with React, Node.js and cloud infrastructure. Fast, accessible and easy to maintain.",
      deliverables: "Frontend, APIs, database, CI/CD, deployment",
    },
  ],
};

export const contact = {
  heading: "LET'S TALK",
  cta: "Contact Me",
};
