# Spec: Portfolio

The site is a one-page personal portfolio. Its text lives in `src/content.ts`.

1. The page shows the owner's name, a short introduction, an about section and a way to get in touch (email and
   GitHub).
2. The page lists projects, newest first. Each project shows its title, year, a description and its tags. A project
   with a link has its title as the link.
3. A visitor can filter the projects by tag. "All" shows every project. The pressed filter is marked with
   `aria-pressed`, and a line says how many projects are showing; screen readers hear it when it changes.
4. The page lists the CI checks that guard it, and that list matches the workflows in `.github/workflows/`.
5. All text from `src/content.ts` is escaped before it goes into the page.
6. The page works with a keyboard and a screen reader, meets WCAG 2 AA in light and dark mode, and respects reduced
   motion.
7. The page sends no personal data anywhere and loads nothing from other sites. Fonts are self-hosted.
8. The JavaScript the site ships stays under 10 kB gzipped.
