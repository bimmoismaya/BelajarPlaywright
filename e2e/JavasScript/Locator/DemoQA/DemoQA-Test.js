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
        await this.page.goto(this.url, {timeout: 45000});
        await this.elementButton.click();
    }
}

/** masuk ke page Text
 * 
 */

export class TextBoxTextDemo {
    constructor(page) {
        this.page = page;
        this.buttonTextBox = page.locator('li:has-text("Text Box")');
        this.urlElementPage = 'https://demoqa.com/elements';
        this.urlTextBox = 'https://demoqa.com/text-box';
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

    async gotoTextBoxPage() {
        await this.buttonTextBox.click();
    }

    async expectSuccessGoToElementsPage() {
        await expect(this.page).toHaveURL(this.urlElementPage);
    }

    async expectSuccessGoToTextBoxPage() {
        await expect(this.page).toHaveURL(this.urlTextBox);
    }


    async inputDataInfo(username, email, current, permanent) {
        await this.UserName.fill(username);
        await this.UserEmail.fill(email);
        await this.currentAddress.fill(current);
        await this.permanentAddress.fill(permanent);
    }

    async hitButtonSubmit() {
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

    async expectedResultSubmit(username, email, current, permanent) {
        await expect(this.resultName).toContainText(username);
        await expect(this.resultEmail).toContainText(email);
        await expect(this.resultCurrentAddress).toContainText(current);
        await expect(this.resultPermanentAddress).toContainText(permanent);
    }
}

export class CheckBoxPage {
    constructor(page) {
        this.page = page;
        this.urlElementPage = 'https://demoqa.com/elements';
        this.checkboxButton = page.locator('li:has-text("Check Box")');
        this.urlCheckBox = 'https://demoqa.com/checkbox';
        this.HomeLabel = page.getByLabel('Home');
        this.DesktopLabel = page.getByLabel('Desktop');
        this.NotesLabel = page.getByLabel('Notes');
        this.CommandsLabel = page.getByLabel('Commands');
        this.DocumentsLabel = page.getByLabel('Documents');
        this.WorkspaceLabel = page.getByLabel('WorkSpace');
        this.ReactLabel = page.getByLabel('React');
        this.AngularLabel = page.getByLabel('React');
        this.VeuLabel = page.getByLabel('React');
        this.OfficeLabel = page.getByLabel('React');
        this.PublicLabel = page.getByLabel('Public');
        this.PrivateLabel = page.getByLabel('Private');
        this.ClassifiedLabel = page.getByLabel('Classified');
        this.GeneralLabel = page.getByLabel('General');
        this.DownloadsLabel = page.getByLabel('Downloads');
        this.WordFileLabel = page.getByLabel('Word File.doc');
        this.ExcelFileLabel = page.getByLabel('Excel File.doc');
        this.buttonExpandCheckBox = page.locator("//button[@title='Expand all']//*[name()='svg']//*[name()='path' and contains(@d,'M19 3H5c-1')]");
        this.buttonCollapseCheckBox = page.locator("//button[@title='Collapse all']//*[name()='svg']//*[name()='path' and contains(@d,'M19 3H5c-1')]");
    }

    async gotoCheckBoxPage() {
        await this.checkboxButton.click();
    }

    async expectSuccessGoToCheckBoxPage() {
        await expect(this.page).toHaveURL(this.urlCheckBox);
    }

    async hitButtonCollapse() {
        await this.buttonCollapseCheckBox.click();
    }

    async CollapseAllView() {
        await expect(this.HomeLabel).toBeVisible();
    }

    async CollapseNotView() {
        await expect(this.DesktopLabel).not.toBeVisible();
    }

    async clickHomeLabel(){
        await this.HomeLabel.click();
    }

    async expectHomeLabelChecked(){
        await expect(this.HomeLabel).toBeChecked();
    }

}