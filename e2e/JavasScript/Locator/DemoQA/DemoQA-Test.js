import { expect, test } from '@playwright/test';;

/**
 * Demo untuk web demoqa.com
 * Flow dari masuk web, pilih box element lalu mulai flownya 1 per 1
 */

export class GoToElementPageDemo {
    constructor(page) {
        this.page = page;
        this.url = 'https://demoqa.com/';
        this.elementButton = page.getByText('Elements', { exact: true });
    }

    async gotoElementPage() {
        await this.page.goto(this.url);
        await this.elementButton.click();
    }
}

/** masuk ke page elements
 * 
 */

export class TextBoxElementDemo {
    constructor(page) {
        this.page = page;
        this.urlElements = 'https://demoqa.com/elements';
        this.buttonTextBox = page.locator('li:has-text("Text Box")');
        this.UserName = page.getByRole('textbox', { name: 'Full Name' })
        this.UserEmail = page.locator('#userEmail');
        this.currentAddress = page.locator('#currentAddress');
        this.permanentAddress = page.locator('#permanentAddress');
        this.submitButtoon = page.locator("#submit");
        this.logoTextBox = page.locator('h1').filter({ hasText: 'Text Box' });
        this.resultName = page.locator('#name');
        this.resultEmail = page.locator('#email');
        this.resultCurrentAddress = page.locator("//p[@id='currentAddress']");
        this.resultPermanentAddress = page.locator("//p[@id='permanentAddress']");
    }

    

    async expectSuccessGoToElementsPage(){
        await expect(this.page).toHaveURL(this.urlElements);
        // await expect(this.logoTextBox).toContainText('Text Box');
    }

    async toTextBoxPage(){
        await this.buttonTextBox.click();
    }

    async inputDataInfo(username, email, current, permanent){
        await this.UserName.fill(username);
        await this.UserEmail.fill(email);
        await this.currentAddress.fill(current);
        await this.permanentAddress.fill(permanent);
    }

    async hitButtonSubmit(){
        await this.submitButtoon.click();
    }
/**
 * penggunaan toContainText dibawah ini adalah untuk mengambil semua data yang ada dilocator
 * bisa menggunakan toHaveText, namun harus menambahkan sedikit kode menjadi seperti ini
 * toHaveText(`Name:${username}`);
 * toHaveText(`Email:${email}`);
 * toHaveText(`Current Address :${current}`);
 * toHaveText(`Permananet Address :${permanent}`);
 * 
 * jika mau menggunakan toHaveText, diluar itu bisa gunakan toContainText()
 */

    async expectedResultSubmit(username, email, current, permanent){
        await expect(this.resultName).toContainText(username);
        await expect(this.resultEmail).toContainText(email);
        await expect(this.resultCurrentAddress).toContainText(current);
        await expect(this.resultPermanentAddress).toContainText(permanent);
    }
}