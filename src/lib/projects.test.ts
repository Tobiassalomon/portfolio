import { describe, expect, it } from "vitest";
import type { Project } from "../content";
import {
  ALL,
  allTags,
  countLabel,
  filterProjects,
  sortNewestFirst,
} from "./projects";

const make = (title: string, year: number, tags: string[]): Project => ({
  title,
  year,
  description: "",
  tags,
});

const projects = [
  make("Old", 2024, ["Web"]),
  make("New", 2026, ["Cloud", "Web"]),
  make("Middle", 2025, ["CI/CD", "Web"]),
  make("Also new", 2026, ["CI/CD"]),
];

describe("sortNewestFirst", () => {
  it("puts the newest projects first and keeps ties in order", () => {
    expect(sortNewestFirst(projects).map((p) => p.title)).toEqual([
      "New",
      "Also new",
      "Middle",
      "Old",
    ]);
  });

  it("does not change the list it was given", () => {
    sortNewestFirst(projects);
    expect(projects[0].title).toBe("Old");
  });
});

describe("allTags", () => {
  it("lists the most used tags first, then alphabetically", () => {
    expect(allTags(projects)).toEqual(["Web", "CI/CD", "Cloud"]);
  });

  it("is empty when there are no projects", () => {
    expect(allTags([])).toEqual([]);
  });
});

describe("filterProjects", () => {
  it("shows every project for All", () => {
    expect(filterProjects(projects, ALL)).toHaveLength(4);
  });

  it("shows only the projects with the tag", () => {
    expect(filterProjects(projects, "CI/CD").map((p) => p.title)).toEqual([
      "Middle",
      "Also new",
    ]);
  });

  it("shows nothing for a tag no project has", () => {
    expect(filterProjects(projects, "Games")).toEqual([]);
  });
});

describe("countLabel", () => {
  it("counts all projects", () => {
    expect(countLabel(3, ALL)).toBe("Showing 3 projects");
  });

  it("uses the singular for one project and names the tag", () => {
    expect(countLabel(1, "Cloud")).toBe("Showing 1 project tagged Cloud");
  });
});
