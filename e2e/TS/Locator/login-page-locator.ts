import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly url: string = 'https://the-internet.herokuapp.com/login';
    readonly buttonLogin: Locator;
    readonly buttonLogout: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly flashMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.buttonLogin = page.getByRole('button', { name: 'Login' });
        this.buttonLogout = page.locator('.button.secondary.radius');
        this.flashMessage = page.locator('#flash');
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async inputLogin(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    async clickButtonLogin() {
        await this.buttonLogin.click();
    }

    async expectLoginSuccess() {
        await expect(this.page).toHaveURL(/secure/);
        await expect(this.flashMessage).toContainText('You logged into a secure area!');
        await expect(this.buttonLogout).toBeVisible();
    }

    async expectLoginError(expectedMessage: string) {
        await expect(this.flashMessage).toContainText(expectedMessage);
    }

    async clickButtonLogout() {
        await this.buttonLogout.click();
        await expect(this.page).toHaveURL(/login/);
    }
}