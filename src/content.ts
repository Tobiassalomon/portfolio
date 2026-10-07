// Everything the portfolio says lives in this file. Edit it, open a pull request, and the CI checks run.

export type Project = {
  title: string;
  year: number;
  description: string;
  tags: string[];
  url?: string;
};

export type Check = {
  name: string;
  description: string;
};

type Site = {
  name: string;
  intro: string;
  about: string[];
  email: string;
  github: string;
};

export const site: Site = {
  name: "Tobias",
  intro:
    "I'm a student at Aalborg University in Copenhagen. I build small web projects and the pipelines that ship them safely.",
  about: [
    "I like the part of software that happens after the code is written: tests, reviews, builds and deploys. A change should be easy to make and hard to break.",
    "Right now I'm learning how CI/CD changes when AI agents write and review code alongside people.",
  ],
  // Replace with your own address before you merge.
  email: "tobias@example.com",
  github: "https://github.com/Tobiassalomon",
};

export const projects: Project[] = [
  {
    title: "This portfolio",
    year: 2026,
    description:
      "A one-page site in TypeScript and Vite, deployed on Vercel. Eight automated checks have to pass before a change can reach the live site.",
    tags: ["CI/CD", "Web"],
    url: "https://github.com/Tobiassalomon/portfolio",
  },
  {
    title: "Launch night",
    year: 2026,
    description:
      "A ticket shop with student and group pricing, built for the workshop CI/CD in the age of AI agents. The repo came with bugs planted in it; I added CI steps that caught them and fixed each one until every check was green.",
    tags: ["CI/CD", "Testing"],
  },
  {
    title: "First deploy",
    year: 2026,
    description:
      "A static site connected from GitHub to Vercel, where every commit to main goes live in under a minute.",
    tags: ["Cloud", "Web"],
  },
];

export const checks: Check[] = [
  {
    name: "Lint and format",
    description: "Catches unused code and keeps the style consistent.",
  },
  { name: "Type check", description: "Stops a wrong type from shipping." },
  {
    name: "Unit tests",
    description: "Tests the project filter and the text escaping.",
  },
  {
    name: "Production build",
    description: "Runs the same build as Vercel, so main always builds.",
  },
  {
    name: "Dependency audit",
    description: "Fails on a known high-severity vulnerability.",
  },
  {
    name: "Secret scan",
    description: "Fails if an API key or password is committed.",
  },
  {
    name: "Bundle budget",
    description: "Keeps the JavaScript under 10 kB gzipped.",
  },
  {
    name: "Accessibility",
    description: "Scans the page in a real browser against WCAG 2 AA.",
  },
];
