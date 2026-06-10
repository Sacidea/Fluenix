# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> has title and dashboard link
- Location: tests\home.spec.ts:3:5

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /Fluenix/
Received string:  ""
Timeout: 5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    13 × unexpected value ""

```

```yaml
- text: Internal Server Error
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('has title and dashboard link', async ({ page }) => {
  4  |   page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  5  |   page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  6  |   const res = await page.goto('/');
  7  |   console.log('STATUS:', res?.status());
  8  | 
  9  |   // Expect a title "to contain" a substring.
> 10 |   await expect(page).toHaveTitle(/Fluenix/);
     |                      ^ Error: expect(page).toHaveTitle(expected) failed
  11 | 
  12 |   // create a locator
  13 |   const getStarted = page.locator('text=Dashboard');
  14 | 
  15 |   // We are not logged in, so it might redirect or it might just exist in header
  16 |   // Let's just expect the header "Fluenix" to be visible
  17 |   const logo = page.locator('text=Fluenix').first();
  18 |   await expect(logo).toBeVisible();
  19 | });
  20 | 
```