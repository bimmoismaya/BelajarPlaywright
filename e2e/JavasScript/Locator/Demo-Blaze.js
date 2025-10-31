// import { expect } from "playwright/test";

// export class DemoBlazeLoginPage {
//     constructor(page) {
//         this.page = page;
//         this.url = 'https://www.demoblaze.com/';
//         this.wordLogin = page.locator('//*[@id="login2"]');
//         this.usernameInput = page.locator('//*[@id="loginusername"]');
//         this.passwordInput = page.locator('//*[@id="loginpassword"]');
//         this.LoginButton = page.locator('button:text("Log in")');
//         this.urlLogin= 'https://www.demoblaze.com/index.html#';

//     }
//     // 

//     async goto() {
//         await this.page.goto(this.url);
//     }

//     async ClickWordingLogin() {
//         await this.wordLogin.click();
//     }

//     async login(username, password) {
//         await this.usernameInput.fill(username);
//         await this.passwordInput.fill(password);
//         await this.LoginButton.click();
//     }
// }

// export class DemoBlazePhonePage {
//     constructor(page) {
//         this.page = page;
//         this.buttonPhone = page.locator('a:has-text("Phones")')
//         this.choosePhone = page.locator('//*[@id="tbodyid"]/div[3]/div/div/h4/a');
//         this.addToCartButton = page.locator('//*[@id="tbodyid"]/div[2]/div/a');
//         this.cartButton = page.locator('//*[@id="navbarExample"]/ul/li[4]/a');
//     }

//     async clickButtonPhone() {
//         await this.buttonPhone.click();
//     }

//     async choosePhoneAddCartOpenCart() {
//         await this.choosePhone.click();
//         await this.addToCartButton.click();
//         await this.cartButton.click();
//     }
// }
