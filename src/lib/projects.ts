import type { Project } from "../content";

export const ALL = "All";

/** Newest first; projects from the same year keep their order. */
export function sortNewestFirst(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => b.year - a.year);
}

/** Every tag used, most used first, then alphabetical. */
export function allTags(projects: Project[]): string[] {
  const counts = new Map<string, number>();
  for (const project of projects) {
    for (const tag of project.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.keys()].sort(
    (a, b) => counts.get(b)! - counts.get(a)! || a.localeCompare(b),
  );
}

/** The projects with this tag, or all of them for ALL. */
export function filterProjects(projects: Project[], tag: string): Project[] {
  if (tag === ALL) return projects;
  return projects.filter((project) => project.tags.includes(tag));
}

/** What the count line says, for example "Showing 2 projects tagged Web". */
export function countLabel(count: number, tag: string): string {
  const noun = count === 1 ? "project" : "projects";
  const suffix = tag === ALL ? "" : ` tagged ${tag}`;
  return `Showing ${count} ${noun}${suffix}`;
}
