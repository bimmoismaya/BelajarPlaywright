import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'A/B Testing' }).click();
  await page.getByText('Also known as split testing.').click();
//  await page.getByRole('heading', { name: 'A/B Test Control' }).click();
  // await page.goto('https://the-internet.herokuapp.com/');
});

//Test ini ditujukan untuk memastikan locator ketika diklik bisa melakukan tindakan klik-tayang