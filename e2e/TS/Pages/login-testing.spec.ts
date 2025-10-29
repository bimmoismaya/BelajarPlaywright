import { test, expect } from '@playwright/test';
import { LoginPage } from '../Locator/login-page-locator';

test.describe('Login', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('should login successfully with valid credentials', async () => {
        const username = process.env.TEST_USERNAME || 'tomsmith';
        const password = process.env.TEST_PASSWORD || 'SuperSecretPassword!';

        await loginPage.inputLogin(username, password);
        await loginPage.clickButtonLogin();
        await loginPage.expectLoginSuccess();
    });

    test('should show error with invalid username', async () => {
        await loginPage.inputLogin('invalid_user', 'SuperSecretPassword!');
        await loginPage.clickButtonLogin();
        await loginPage.expectLoginError('Your username is invalid!');
    });

    test('should show error with invalid password', async () => {
        const username = process.env.TEST_USERNAME || 'tomsmith';

        await loginPage.inputLogin(username, 'invalid_password');
        await loginPage.clickButtonLogin();
        await loginPage.expectLoginError('Your password is invalid!');
    });

    test('should logout successfully', async () => {
        const username = process.env.TEST_USERNAME || 'tomsmith';
        const password = process.env.TEST_PASSWORD || 'SuperSecretPassword!';

        await loginPage.inputLogin(username, password);
        await loginPage.clickButtonLogin();
        await loginPage.expectLoginSuccess();

        await loginPage.clickButtonLogout();
    });
});