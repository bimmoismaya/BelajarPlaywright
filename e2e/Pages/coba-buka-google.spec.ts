import { test, expect } from '@playwright/test';


//test buka google dan mencari mobil subaru impreza wrx, enter, lalu pilih gambar
test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('combobox', { name: 'Cari' }).click();
  await page.getByRole('combobox', { name: 'Cari' }).fill('mobil subaru impreza wrx');
  await page.keyboard.press('Enter'); 
  
  //waitForLoadState untuk nunggu navigasi selesai
  await page.waitForLoadState('domcontentloaded');

  //langsung menuju button yang memiliki text gambar, kelemahan jika ada 2 text akan nabrak
  await page.getByRole('link', { name: 'Gambar' }).click();  // << masih error karena limit waktu

  await expect(page).toHaveURL(/images/);
});