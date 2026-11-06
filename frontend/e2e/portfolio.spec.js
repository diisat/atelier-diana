import { test, expect } from "@playwright/test";

test("language navigation preserves a project and the French PDF is available", async ({
  page,
  request,
}) => {
  await page.goto("/en/work/mio-predictive-models");
  await page.getByRole("link", { name: "FR", exact: true }).click();
  await expect(page).toHaveURL(/\/fr\/work\/mio-predictive-models$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Comprendre le mouvement",
  );
  await page.goto("/fr/about");
  await expect(
    page.getByRole("link", { name: "Télécharger mon CV" }),
  ).toHaveAttribute("href", "/files/diana-torres-cv-fr.pdf");
  const pdf = await request.get("/files/diana-torres-cv-fr.pdf");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
});

test("filters work and the garden can be completed with a keyboard", async ({
  page,
}) => {
  await page.goto("/en/work");
  await page
    .getByRole("button", { name: "AI experiments", exact: true })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(
    page.getByRole("heading", { name: "A thoughtful marketing assistant" }),
  ).toBeVisible();
  await page.goto("/en/playground");
  const garden = page.getByRole("group", { name: "Interactive hobby garden" });
  await garden.focus();
  for (let i = 0; i < 3; i++) await garden.press("ArrowRight");
  await expect(page.getByText("4 / 4 islands explored")).toBeVisible();
  await page.getByRole("button", { name: "Start again" }).click();
  await expect(page.getByText("1 / 4 islands explored")).toBeVisible();
});

test("mobile navigation and pages fit the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/es");
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await page.getByRole("link", { name: "Conoce a Diana", exact: true }).click();
  await expect(page).toHaveURL(/\/es\/about$/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
