import { test, expect } from '@playwright/test';

test.describe('Teams browser', () => {
  test('shows Premier League teams list', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: 'Premier League Teams' }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /Arsenal/i })).toBeVisible();
  });

  test('navigates to team detail and back', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /Arsenal/i }).click();

    await expect(page.getByRole('heading', { name: 'Arsenal' })).toBeVisible();
    await expect(page.getByText('English Premier League')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Stadium' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Links' })).toBeVisible();

    await page.getByRole('link', { name: 'Back to teams' }).click();

    await expect(
      page.getByRole('heading', { name: 'Premier League Teams' }),
    ).toBeVisible();
  });

  test('shows team details on direct url navigation', async ({ page }) => {
    await page.goto('/team/133604');

    await expect(page.getByRole('heading', { name: 'Arsenal' })).toBeVisible();
    await expect(page.getByText('English Premier League')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Stadium' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Links' })).toBeVisible();
  });
});
