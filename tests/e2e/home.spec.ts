import { expect, test } from "@playwright/test";

test("the page shows the owner's name and a way to get in touch", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("#contact a[href^='mailto:']")).toBeVisible();
});

test("filtering by a tag shows only projects with that tag", async ({
  page,
}) => {
  await page.goto("/");
  const projects = page.locator(".project");
  const total = await projects.count();
  expect(total).toBeGreaterThan(0);

  const tag = page.locator(".filters button").nth(1);
  const name = (await tag.textContent())!;
  await tag.click();

  await expect(tag).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".count")).toContainText(`tagged ${name}`);
  for (const tags of await projects.locator(".tags").allTextContents()) {
    expect(tags).toContain(name);
  }

  await page.getByRole("button", { name: "All" }).click();
  await expect(projects).toHaveCount(total);
});

test("the filter works with the keyboard", async ({ page }) => {
  await page.goto("/");
  const tag = page.locator(".filters button").nth(1);
  await tag.focus();
  await page.keyboard.press("Enter");
  await expect(tag).toHaveAttribute("aria-pressed", "true");
});
