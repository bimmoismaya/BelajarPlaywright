import { expect } from "playwright/test";

export class ParabankDemoLoginPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://parabank.parasoft.com';
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.buttonLogin = page.locator('input[type="submit"]');
        this.errorMessage = page.locator('[class="error"]');
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.buttonLogin.click();
    }

    async expectErrorMessage(expectedMessage) {
        await expect(this.errorMessage).toContainText(expectedMessage);
    }

    async expectErrorVisible() {
        await expect(this.errorMessage).toBeVisible();
    }

}

export class UserAccountPage {
    constructor(page) {
        this.page = page;
        this.overviewUrl = 'https://parabank.parasoft.com/parabank/overview.htm';
        this.overviewBalance = page.getByText('Balance*');
        this.parabankLogo = page.getByRole('img', { name: 'ParaBank' })
    }

    async expectLoginSuccess(){
        await expect(this.page).toHaveURL(this.overviewUrl);
        await expect(this.overviewBalance).toBeVisible()
        await expect(this.parabankLogo).toBeVisible();
    }
}


// NA >> NewAccount
export class OpenNewAccountFlow{
    constructor(page){
        this.page = page;
        this.OpenNAButton = page.getByRole('link', { name: 'Open New Account' })
        this.openAccountUrl='https://parabank.parasoft.com/parabank/openaccount.htm';
        this.typeCombox = page.locator("//select[@id='type']");
        this.accCombox = page.locator("//select[@id='fromAccountId']");
        this.submitNAButton = page.locator('input[type="button"]');
        this.successCreateNA = page.getByText('Congratulations, your account is now open.')
    }

    async openNAPage(){
        await this.OpenNAButton.click();
        await expect(this.page).toHaveURL(this.openAccountUrl);
    }

    async createNAFlow(){
        await this.typeCombox.selectOption({ label : 'SAVINGS'});
        await this.accCombox.selectOption({label : '16119'});
        await this.submitNAButton.click();
    }

    async SuccessCreateNewAccount(expectedMessage){
        await expect (this.successCreateNA).toContainText(expectedMessage);
    }

}

