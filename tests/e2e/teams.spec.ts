import { test, expect } from '@playwright/test';
import { mockLeagues } from './mocks/leagues';
import { mockTeams } from './mocks/teams';
import { mockArsenal } from './mocks/team';

test('browse leagues, select premier league, and view arsenal details', async ({ page }) => {
  await page.route('**/all_leagues.php', (route) => route.fulfill({ json: mockLeagues }));
  await page.route('**/search_all_teams.php**', (route) => route.fulfill({ json: mockTeams }));
  await page.route('**/lookupteam.php**', (route) => route.fulfill({ json: mockArsenal }));

  await page.goto('/');

  await page.getByPlaceholder('Search leagues...').fill('premier league');
  await expect(page.getByRole('link', { name: /English Premier League/i })).toBeVisible();

  await page.getByRole('link', { name: /English Premier League/i }).click();
  await expect(page.getByRole('heading', { name: 'English Premier League' })).toBeVisible();

  await page.getByRole('link', { name: /Arsenal/i }).click();
  await expect(page.getByRole('heading', { name: 'Arsenal' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Stadium' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Links' })).toBeVisible();
});
