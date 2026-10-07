import "@fontsource-variable/schibsted-grotesk";
import "./styles.css";
import { checks, projects, site } from "./content";
import { escapeHtml as e } from "./lib/escape";
import {
  ALL,
  allTags,
  countLabel,
  filterProjects,
  sortNewestFirst,
} from "./lib/projects";

const sorted = sortNewestFirst(projects);
const tags = [ALL, ...allTags(sorted)];

const app = document.querySelector<HTMLElement>("#app")!;

app.innerHTML = `
  <a class="skip" href="#projects">Skip to projects</a>
  <header class="hero">
    <nav aria-label="Sections">
      <a href="#projects">Projects</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
    <img class="mark" src="/logo.svg" alt="" width="64" height="64" />
    <h1>${e(site.name)}</h1>
    <p class="intro">${e(site.intro)}</p>
  </header>
  <main>
    <section id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title">Projects</h2>
      <div class="filters" role="group" aria-label="Filter projects by tag">
        ${tags
          .map(
            (tag) =>
              `<button type="button" data-tag="${e(tag)}" aria-pressed="${tag === ALL}">${e(tag)}</button>`,
          )
          .join("")}
      </div>
      <p class="count" aria-live="polite"></p>
      <ul class="projects"></ul>
    </section>
    <section id="about" aria-labelledby="about-title">
      <h2 id="about-title">About</h2>
      ${site.about.map((p) => `<p>${e(p)}</p>`).join("")}
    </section>
    <section id="shipping" aria-labelledby="shipping-title">
      <h2 id="shipping-title">How this site ships</h2>
      <p>Every pull request to this site runs ${checks.length} checks on GitHub Actions. If one fails, the change can't be merged, so it never reaches the live site.</p>
      <ul class="checks">
        ${checks
          .map(
            (check) =>
              `<li><strong>${e(check.name)}</strong> <span>${e(check.description)}</span></li>`,
          )
          .join("")}
      </ul>
    </section>
  </main>
  <footer id="contact" aria-labelledby="contact-title">
    <h2 id="contact-title">Contact</h2>
    <p class="contact-lead"><a href="mailto:${e(site.email)}">${e(site.email)}</a></p>
    <p><a href="${e(site.github)}">GitHub</a></p>
  </footer>
`;

const list = app.querySelector<HTMLUListElement>(".projects")!;
const count = app.querySelector<HTMLParagraphElement>(".count")!;
const buttons = [...app.querySelectorAll<HTMLButtonElement>(".filters button")];

function show(tag: string) {
  const visible = filterProjects(sorted, tag);
  list.innerHTML = visible
    .map((project) => {
      const title = project.url
        ? `<a href="${e(project.url)}">${e(project.title)}</a>`
        : e(project.title);
      return `
        <li class="project">
          <h3>${title}</h3>
          <p class="year">${project.year}</p>
          <p class="description">${e(project.description)}</p>
          <p class="tags"><span class="visually-hidden">Tags: </span>${project.tags.map(e).join(", ")}</p>
        </li>`;
    })
    .join("");
  count.textContent = countLabel(visible.length, tag);
  for (const button of buttons) {
    button.setAttribute("aria-pressed", String(button.dataset.tag === tag));
  }
}

for (const button of buttons) {
  button.addEventListener("click", () => show(button.dataset.tag!));
}
show(ALL);
