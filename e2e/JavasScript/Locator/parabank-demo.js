import { expect } from "playwright/test";

export class RegisterLoginPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://parabank.parasoft.com';
        this.urlRegist = 'https://parabank.parasoft.com/parabank/register.htm';
        this.signUpWord = page.getByText('Signing up is easy!');
        this.registerWord = page.locator('a:has-text("Register")');
        this.firstName = page.locator('[name="customer.firstName"]');
        this.lastName = page.locator('[name="customer.lastName"]');
        this.address = page.locator('[name="customer.address.street"]');
        this.city = page.locator('[name="customer.address.city"]');
        this.state = page.locator('[name="customer.address.state"]');
        this.zipCode = page.locator('[name="customer.address.zipCode"]');
        this.phoneNum = page.locator('[name="customer.phoneNumber"]');
        this.ssn = page.locator('[name="customer.ssn"]');
        this.username = page.locator('[name="customer.username"]');
        this.password = page.locator('[name="customer.password"]');
        this.confirmPass = page.locator('[name="repeatedPassword"]');
        this.buttonRegister = page.locator("input[value='Register']");
        this.successCA = page.getByText('Your account was created successfully. You are now logged in.')
    }

    async goto() {
        await this.page.goto(this.url);
        await this.registerWord.click();
    }

    async expectLoadSuccess() {
        await expect(this.page).toHaveURL(this.urlRegist);
        await expect(this.signUpWord).toBeVisible();
    }

    async inputAll(
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
    ) {


        await this.firstName.fill(FirstName);
        await this.lastName.fill(LastName);
        await this.address.fill(Address);
        await this.city.fill(City);
        await this.state.fill(State);
        await this.zipCode.fill(ZipCode);
        await this.phoneNum.fill(Phone);
        await this.ssn.fill(SSN);
        await this.username.fill(Username);
        await this.password.fill(Password);
        await this.confirmPass.fill(accPassword);

        await this.buttonRegister.click();
    }

    async SuccessCA(expectedMessage) {
        await expect(this.successCA).toContainText(expectedMessage);
    }
}

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

    async expectLoginSuccess() {
        await expect(this.page).toHaveURL(this.overviewUrl);
        await expect(this.overviewBalance).toBeVisible()
        await expect(this.parabankLogo).toBeVisible();
    }
}


// NA >> NewAccount
export class OpenNewAccountFlow {
    constructor(page) {
        this.page = page;
        this.OpenNAButton = page.getByRole('link', { name: 'Open New Account' })
        this.openAccountUrl = 'https://parabank.parasoft.com/parabank/openaccount.htm';
        this.typeCombox = page.locator("//select[@id='type']");
        this.accCombox = page.locator("//select[@id='fromAccountId']");
        this.submitNAButton = page.locator('input[type="button"]');
        this.successCreateNA = page.getByText('Congratulations, your account is now open.')
    }

    async openNAPage() {
        await this.OpenNAButton.click();
        await expect(this.page).toHaveURL(this.openAccountUrl);
    }

    async createNAFlow() {
        await this.typeCombox.selectOption({ label: 'SAVINGS' });
        await this.accCombox.selectOption({ label: '16119' });
        await this.submitNAButton.click();
    }

    async SuccessCreateNewAccount(expectedMessage) {
        await expect(this.successCreateNA).toContainText(expectedMessage);
    }

}

