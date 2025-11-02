import { test, expect } from '@playwright/test';

import {ParabankDemoLoginPage,UserAccountPage,OpenNewAccountFlow} from '../Locator/parabank-demo';

test.describe(' Parabank Login', { tag: '@parabankdemo' }, () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new ParabankDemoLoginPage(page);
        await loginPage.goto();
    });

    test('Complete Login', async ({ page }) => {
        const username = process.env.PARABANK_USERNAME || '123123';
        const password = process.env.PARABANK_PASSWORD || '123123';

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
        const username = process.env.PARABANK_USERNAME || '123123';
        const password = process.env.PARABANK_PASSWORD || '123123';
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