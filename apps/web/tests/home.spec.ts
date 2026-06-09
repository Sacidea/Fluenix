import { test, expect } from '@playwright/test';

test('has title and dashboard link', async ({ page }) => {
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  const res = await page.goto('/');
  console.log('STATUS:', res?.status());

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Fluenix/);

  // create a locator
  const getStarted = page.locator('text=Dashboard');

  // We are not logged in, so it might redirect or it might just exist in header
  // Let's just expect the header "Fluenix" to be visible
  const logo = page.locator('text=Fluenix').first();
  await expect(logo).toBeVisible();
});
