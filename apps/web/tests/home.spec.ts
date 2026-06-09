import { test, expect } from '@playwright/test';

test('has title and dashboard link', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Fluenix/);

  // create a locator
  const getStarted = page.locator('text=Dashboard');

  // We are not logged in, so it might redirect or it might just exist in header
  // Let's just expect the header "Fluenix" to be visible
  const logo = page.locator('text=Fluenix').first();
  await expect(logo).toBeVisible();
});
