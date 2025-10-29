// import { expect } from "playwright/test";

// export class DemoBlazeLoginPage {
//     constructor(page) {
//         this.page = page;
//         this.url = 'https://www.demoblaze.com/';
//         this.wordLogin = page.locator('.nav-link:has-text("Log in")');
//         this.usernameInput = page.locator('#loginusername"]');
//         this.passwordInput = page.locator('#loginpassword');
//         this.LoginButton = page.locator('button:text("Log in")');
//     }

//     async goto() {
//         await this.page.goto(this.url);
//         await this.page.waitForLoadState('networkidle')
//     }

//     async ClickWordingLogin() {
//         await this.wordLogin.click({force: true});
//         await expect(this.usernameInput).toBeVisible();
//     }

//     async login(username, password) {
//         await this.usernameInput.fill(username);
//         await this.passwordInput.fill(password);
//         await this.LoginButton.click();
//     }
// }