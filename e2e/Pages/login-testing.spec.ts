import { test, expect } from '@playwright/test';
import { LoginPage } from '../Locator/login-page-locator';

test(' Login normal Flow', async ({ page }) => {
    const LoginFlow = new LoginPage(page);
    const username = 'tomsmith';
    const password = 'SuperSecretPassword!';

    await LoginFlow.goto();
    await LoginFlow.inputLogin('tomsmith', 'SuperSecretPassword!');
    await LoginFlow.clickButtonLogin();

    // await LoginFlow.clickButtonLogout();

});