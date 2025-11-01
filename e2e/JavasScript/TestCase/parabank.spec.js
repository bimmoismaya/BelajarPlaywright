import { test, expect } from '@playwright/test';

import {
    RegisterLoginPage,
    ParabankDemoLoginPage,
    UserAccountPage,
    OpenNewAccountFlow
} from '../Locator/parabank-demo';


test.describe('Parabank Register new Account', { tag: '@parabankdemo' }, () => {
    let registerPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterLoginPage(page);
        await registerPage.goto();
    });

    test('Complete Register', async () => {
        const FirstName = process.env.PARABANK_FIRSTNAME || 'John';
        const LastName = process.env.PARABANK_LASTNAME || 'Doe';
        const Address = process.env.PARABANK_ADDRESS || 'Jalan Dulu';
        const City = process.env.PARABANK_CITY || 'Kripton';
        const State = process.env.PARABANK_STATE || 'KrypKryp';
        const ZipCode = process.env.PARABANK_ZIPCODE || '14045';
        const Phone = process.env.PARABANK_PHONE || '00000';
        const SSN = process.env.PARABANK_SSN || '3828321';
        const Username = process.env.PARABANK_USERNAME || 'admin024';
        const Password = process.env.PARABANK_PASSWORD || 'Lalalolo21';
        const accPassword = process.env.PARABANK_CONFIRMPASSWORD || 'Lalalolo21';
            
        await registerPage.inputAll(
            FirstName,
            LastName,
            Address,
            City,
            State,
            ZipCode,
            Phone,
            SSN,
            Username,
            Password,
            accPassword
        );
//>>>>>>>>>>>>>> this comment in below still bugged, need fixing
//        await registerPage.SuccessCA('Your account was created successfully. You are now logged in.');
    });

});

test.describe(' Parabank Login', { tag: '@parabankdemo' }, () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new ParabankDemoLoginPage(page);
        await loginPage.goto();
    });

    test('Complete Login', async ({ page }) => {
        const username = process.env.PARABANK_USERNAME || 'admin021';
        const password = process.env.PARABANK_PASSWORD || 'Lalalolo21';

        await loginPage.login(username, password);

        const AccountPage = new UserAccountPage(page);
        await AccountPage.expectLoginSuccess();
    })

    test('Negative Case', async () => {
        await loginPage.login('admin021', 'minmin');
        await loginPage.expectErrorVisible();
        await loginPage.expectErrorMessage('The username and password could not be verified.');
    });
});

test.describe('Open New Account Flow', { tag: '@parabankdemo' }, () => {
    let loginPage;
    let AccountPage;
    let CreateNAPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new ParabankDemoLoginPage(page);
        AccountPage = new UserAccountPage(page);
        CreateNAPage = new OpenNewAccountFlow(page);

        //login first
        await loginPage.goto();
        const username = process.env.PARABANK_USERNAME || 'admin021';
        const password = process.env.PARABANK_PASSWORD || 'Lalalolo21';
        await loginPage.login(username, password);
        await AccountPage.expectLoginSuccess();
    });
    // NA its mean New Account
    test('Go to open NA and continue flow', async ({ page }) => {
        await CreateNAPage.openNAPage();
        await CreateNAPage.createNAFlow();
        await CreateNAPage.SuccessCreateNewAccount('Congratulations, your account is now open.');

    });
});