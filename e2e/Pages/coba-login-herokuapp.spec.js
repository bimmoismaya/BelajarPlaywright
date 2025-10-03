import{test, expect} from '@playwright/test';

test.describe ('all links', {tag: '@allgroup'}, ()  =>{
    test.describe ('Positive Case', {tag:'@PositiveCase'}, () =>{
        //test buka website
        test('Buka Website', async ({ page }) => {
        // page.goto untuk navigasi ke url yang dituju
        await page.goto('https://the-internet.herokuapp.com');

        //toHaveTitle untuk mengecek locatornya sama atau tidak
        //expect ada ekspektasi dari elemen yang dituju, dalam case ini page
        await expect(page).toHaveTitle('The Internet');

        //toHaveURL untuk memastikan url yang dicek benar atau tidak
        await expect(page).toHaveURL('https://the-internet.herokuapp.com')
        });
            
//test buka website
    test.describe('Negative Case', {tag: '@NegativeCase'}, () =>{
        test('Buka Website', async ({ page }) => {
            let navigationError;
            try {
                // Coba navigasi ke URL yang salah
                await page.goto('https://the-internet.herokuapp.commmm/');
            } catch (error) {
                // Tangkap error yang dilempar oleh page.goto()
                navigationError = error;
            }
            
            // Ekspektasi: Verifikasi bahwa exception (error) telah terjadi
            await expect(navigationError).not.toBeUndefined();
            
            // Opsional: Pastikan error message sesuai
            await expect(navigationError.message).toContain('ERR_NAME_NOT_RESOLVED');
        });
    });
});
});