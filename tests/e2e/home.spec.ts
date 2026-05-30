import { test, expect } from '@playwright/test';

test('homepage loads the app', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#app')).toBeVisible();
});
