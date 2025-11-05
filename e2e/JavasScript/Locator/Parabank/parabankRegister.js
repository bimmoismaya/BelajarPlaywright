// import { expect } from "playwright/test";

// export class RegisterLoginPage {
//     constructor(page) {
//         this.page = page;
//         this.url = 'https://parabank.parasoft.com';
//         this.urlRegist = 'https://parabank.parasoft.com/parabank/register.htm';
//         this.parabankLogo = page.locator('.logo');
//         this.signUpWord = page.getByText('Signing up is easy!');
//         this.registerWord = page.locator('a:has-text("Register")');
//         this.firstName = page.locator('[name="customer.firstName"]');
//         this.lastName = page.locator('[name="customer.lastName"]');
//         this.address = page.locator('[name="customer.address.street"]');
//         this.city = page.locator('[name="customer.address.city"]');
//         this.state = page.locator('[name="customer.address.state"]');
//         this.zipCode = page.locator('[name="customer.address.zipCode"]');
//         this.phoneNum = page.locator('[name="customer.phoneNumber"]');
//         this.ssn = page.locator('[name="customer.ssn"]');
//         this.username = page.locator('[name="customer.username"]');
//         this.password = page.locator('[name="customer.password"]');
//         this.confirmPass = page.locator('[name="repeatedPassword"]');
//         this.buttonRegister = page.locator("input[value='Register']");
//         this.successCA = page.getByText('Your account was created successfully. You are now logged in.');
//     }

//     async goto() {
//         await this.page.goto(this.url);
//         await this.registerWord.click();
//     }

//     async expectLoadSuccess() {
//         await expect(this.page).toHaveURL(this.urlRegist);
//         await expect(this.signUpWord).toBeVisible();
//     }

//     async inputAll(
//         FirstName,
//         LastName,
//         Address,
//         City,
//         State,
//         ZipCode,
//         Phone,
//         SSN,
//         Username,
//         Password,
//         accPassword
//     ) {


//         await this.firstName.fill(FirstName);
//         await this.lastName.fill(LastName);
//         await this.address.fill(Address);
//         await this.city.fill(City);
//         await this.state.fill(State);
//         await this.zipCode.fill(ZipCode);
//         await this.phoneNum.fill(Phone);
//         await this.ssn.fill(SSN);
//         await this.username.fill(Username);
//         await this.password.fill(Password);
//         await this.confirmPass.fill(accPassword);

        
//     }

//     async hitButtonRegister(){
//         await this.buttonRegister.click();
//     }

//     async successRegisterAccount() {
//        await expect(this.successCA).toBeVisible();
//     }
// }
