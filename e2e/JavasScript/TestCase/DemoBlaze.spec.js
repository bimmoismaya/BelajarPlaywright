// import { test, expect } from '@playwright/test';
// import {
//     DemoBlazeLoginPage,
//     DemoBlazePhonePage
// } from '../Locator/Demo-Blaze';

// test.describe('DemoBlaze Login', { tag: '@demoblaze' }, () => {
//     let loginPage;

//     test.beforeEach(async ({ page }) => {
//         loginPage = new DemoBlazeLoginPage(page);
//         await loginPage.goto();
//         await loginPage.ClickWordingLogin();
//     });

//     test(' input lanjut click button login', async ({ page }) => {
//         const username = process.env.DEMOBLAZE_USERNAME || 'admin021';
//         const password = process.env.DEMOBLAZE_PASSWORD || '123123';
//         await loginPage.login(username, password);
//         await page.waitForSelector('#logInModal', { state: 'hidden' });
//     });

//     test(' choose phone > add to cart > open cart', async ({ page }) =>{
//         const phonePage = new DemoBlazePhonePage(page);

//         await phonePage.clickButtonPhone();
//         await phonePage.choosePhoneAddCartOpenCart();
//     })
// });