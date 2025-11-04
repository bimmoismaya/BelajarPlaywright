// import { test, expect } from "@playwright/test";

// import {
//     RegisterLoginPage
// } from '../../Locator/Parabank/parabankRegister';

// test.describe('Parabank Register new Account', { tag: '@register' }, () => {
//     let registerPage;

//     test.beforeEach(async ({ page }) => {
//         registerPage = new RegisterLoginPage(page);
//         await registerPage.goto();
//     });

//     test('Complete Register', async ({ page }) => {
//         const FirstName = process.env.PARABANK_FIRSTNAME || 'John';
//         const LastName = process.env.PARABANK_LASTNAME || 'Doe';
//         const Address = process.env.PARABANK_ADDRESS || 'Jalan Dulu';
//         const City = process.env.PARABANK_CITY || 'Kripton';
//         const State = process.env.PARABANK_STATE || 'KrypKryp';
//         const ZipCode = process.env.PARABANK_ZIPCODE || '14045';
//         const Phone = process.env.PARABANK_PHONE || '00000';
//         const SSN = process.env.PARABANK_SSN || '3828321';
//         const Username = process.env.PARABANK_USERNAME || 'admin123123';
//         const Password = process.env.PARABANK_PASSWORD || '123123';
//         const accPassword = process.env.PARABANK_CONFIRMPASSWORD || '123123';

//         await registerPage.inputAll(
//             FirstName,
//             LastName,
//             Address,
//             City,
//             State,
//             ZipCode,
//             Phone,
//             SSN,
//             Username,
//             Password,
//             accPassword
//         );

//         await registerPage.hitButtonRegister();

//         //await page.waitForTimeout(10000);
//         //>>>>>>>>>>>>>> this comment in below still bugged, need fixing
//     });

// });