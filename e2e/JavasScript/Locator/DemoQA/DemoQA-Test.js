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
        this.urlElementPage = 'https://demoqa.com/elements';

    }

    async gotoElementPage() {
        const maxAttempts = 2;
        let attempt = 0;
        while (attempt < maxAttempts) {
            try {
                await this.page.goto(this.url, { timeout: 60000, waitUntil: 'domcontentloaded' });//updated
                await this.elementButton.waitFor({ state: 'visible', timeout: 10000 });
                await this.elementButton.click();
                return;
            } catch (err) {
                attempt++;
                if (attempt >= maxAttempts) throw err;
                await this.page.waitForTimeout(1000 * attempt);
            }
        }

    }

    async expectSuccessGoToElementsPage() {
        await expect(this.page).toHaveURL(this.urlElementPage);
    }
}

/** masuk ke page Text
 * 
 */

export class TextBoxDemo {
    constructor(page) {
        this.page = page;
        this.buttonTextBox = page.locator('li:has-text("Text Box")');
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
        await this.page.waitForURL(this.urlTextBox, { timeout: 15000 });
        await this.logoTextBox.waitFor({ state: 'visible', timeout: 15000 });
    }



    async expectSuccessGoToTextBoxPage() {
        await expect(this.page).toHaveURL(this.urlTextBox);
    }


    async inputDataInfo(username, email, current, permanent) {
        await this.UserName.waitFor({ state: 'visible', timeout: 10000 });
        await this.UserName.fill(username);

        await this.UserEmail.waitFor({ state: 'visible', timeout: 10000 });
        await this.UserEmail.fill(email);

        await this.currentAddress.waitFor({ state: 'visible', timeout: 10000 });
        await this.currentAddress.fill(current);

        await this.permanentAddress.waitFor({ state: 'visible', timeout: 10000 });
        await this.permanentAddress.fill(permanent);
    }

    async hitButtonSubmit() {
        await this.submitButtoon.waitFor({ state: 'visible', timeout: 15000 });
        await this.submitButtoon.scrollIntoViewIfNeeded();
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
        this.HomeLabel = page.locator('.rct-title:has-text("Home")');// << gunakan model ini untuk toBeVisible "katanya"
        this.LabelHome = page.getByLabel('Home', { exact: true });
        this.DesktopLabel = page.locator('.rct-title:has-text("Desktop")');
        this.LabelDesktop = page.getByLabel('Desktop');
        this.NotesLabel = page.locator('.rct-title:has-text("Notes")');
        this.LabelNotes = page.getByLabel('Notes');
        this.CommandsLabel = page.locator('.rct-title:has-text("Commands")');
        this.LabelCommands = page.getByLabel('Commands');
        this.DocumentsLabel = page.locator('.rct-title:has-text("Documents")');
        this.LabelDocuments = page.getByLabel('Documents');
        this.WorkspaceLabel = page.locator('.rct-title:has-text("WorkSpace")');
        this.LabelWorkspace = page.getByLabel('WorkSpace');
        this.ReactLabel = page.locator('.rct-title:has-text("React")');
        this.LabelReact = page.getByLabel('React');
        this.AngularLabel = page.locator('.rct-title:has-text("Angular")');
        this.LabelAngular = page.getByLabel('Angular');
        this.VeuLabel = page.locator('.rct-title:has-text("Veu")');
        this.LabelVeu = page.getByLabel('Veu');
        this.OfficeLabel = page.locator('.rct-title:has-text("Office")');
        this.LabelOffice = page.getByLabel('Office');
        this.PublicLabel = page.locator('.rct-title:has-text("Public")');
        this.LabelPublic = page.getByLabel('Public');
        this.PrivateLabel = page.locator('.rct-title:has-text("Private")');
        this.LabelPrivate = page.getByLabel('Private');
        this.ClassifiedLabel = page.locator('.rct-title:has-text("Classified")');
        this.LabelClassified = page.getByLabel('Classified');
        this.GeneralLabel = page.locator('.rct-title:has-text("General")');
        this.LabelGeneral = page.getByLabel('General');
        this.DownloadsLabel = page.locator('.rct-title:has-text("Downloads")');
        this.LabelDownloads = page.getByLabel('Downloads');
        this.WordFileLabel = page.locator('.rct-title:has-text("Word File.doc")');
        this.LabelWordFile = page.getByLabel('Word File.doc');
        this.ExcelFileLabel = page.locator('.rct-title:has-text("Excel File.doc")');
        this.LabelExcelFile = page.getByLabel('Excel File.doc');
        this.buttonExpandCheckBox = page.locator("//button[@title='Expand all']");
        this.buttonCollapseCheckBox = page.locator("//button[@title='Collapse all']");
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

    async clickHomeLabel() {
        await this.HomeLabel.waitFor({ state: 'visible', timeout: 10000 });
        await this.HomeLabel.click();
    }

    async expectHomeLabelChecked() {
        await expect(this.HomeLabel).toBeChecked();
    }

    async hitButtonExpand() {
        const btn = this.buttonExpandCheckBox;

        await btn.waitFor({ state: 'visible', timeout: 15000 })//updated
        await btn.scrollIntoViewIfNeeded();
        await btn.click();
    }

    async expectExpand() {
        await expect(this.HomeLabel).toBeVisible();
        await expect(this.DesktopLabel).toBeVisible();
        await expect(this.NotesLabel).toBeVisible();
        await expect(this.DocumentsLabel).toBeVisible();
        await expect(this.WorkspaceLabel).toBeVisible();
        await expect(this.ReactLabel).toBeVisible();
        await expect(this.OfficeLabel).toBeVisible();
        await expect(this.GeneralLabel).toBeVisible();
        await expect(this.DownloadsLabel).toBeVisible();
        await expect(this.WordFileLabel).toBeVisible();
    }

    async expectAllBoxChecked() {
        await expect(this.HomeLabel).toBeChecked();
        await expect(this.DesktopLabel).toBeChecked();
        await expect(this.NotesLabel).toBeChecked();
        await expect(this.CommandsLabel).toBeChecked();
        await expect(this.DocumentsLabel).toBeChecked();
        await expect(this.WorkspaceLabel).toBeChecked();
        await expect(this.ReactLabel).toBeChecked();
        await expect(this.AngularLabel).toBeChecked();
        await expect(this.VeuLabel).toBeChecked();
        await expect(this.OfficeLabel).toBeChecked();
        await expect(this.PublicLabel).toBeChecked();
        await expect(this.PrivateLabel).toBeChecked();
        await expect(this.ClassifiedLabel).toBeChecked();
        await expect(this.GeneralLabel).toBeChecked();
        await expect(this.DownloadsLabel).toBeChecked();
        await expect(this.WordFileLabel).toBeChecked();
        await expect(this.ExcelFileLabel).toBeChecked();
    }

}

export class RadioButtonPage {
    constructor(page) {
        this.page = page;
        this.RadioButtonSideButton = page.locator('li:has-text("Radio Button")');
        this.urlRadioButton = 'https://demoqa.com/radio-button';
        this.headerRadioButton = page.locator('li:has-text("Check Box")');
        this.TestRadioButton = page.getByText('Do you like the site?');
        this.yesRadioButton = page.locator('label:has-text("Yes")');
        this.impressiveRadioButton = page.locator('label:has-text("Impressive")');
        this.noRadioButton = page.locator('label:has-text("No")');
        this.yesLabel = page.locator('label:has-text("Yes")');
        this.impressiveLabel = page.locator('label:has-text("Impressive")');
        this.feedbackRadioButton = page.locator('p.mt-3');
    }

    async clickRadioButton() {
        await this.RadioButtonSideButton.click();
    }

    async expectRadioButtonPage() {
        await expect(this.page).toHaveURL(this.urlRadioButton);
        await expect(this.headerRadioButton).toBeVisible();
        await expect(this.TestRadioButton).toBeVisible();
    }

    async hitYesButton() {
        await this.yesRadioButton.click();
    }

    async hitImpressiveButton() {
        await this.impressiveRadioButton.click();
    }

    async expectNoButton() {
        await expect(this.noRadioButton).not.toBeChecked();
    }

}

const NEW_EMPLOYEE_DATA = {
    firstName: 'JSNova', // Diubah sedikit untuk membedakan
    lastName: 'TesterJS',
    email: 'js.tester@playwright.dev',
    age: '32',
    salary: '85000',
    department: 'JavaScript QA'
};

export class webTablePage {
    constructor(page) {
        this.page = page;
        this.webTableSideButton = page.locator('li:has-text("Web Tables")');
        this.urlWebTable = 'https://demoqa.com/webtables';
        this.headerWebTable = page.locator('h1:has-text("Web Tables")');
        this.buttonAdd = page.locator('button:has-text("Add")');
        this.inputFirstName = page.locator('#firstName');
        this.inputLastName = page.locator('#lastName');
        this.inputEmail = page.locator('#userEmail');
        this.inputAge = page.locator('#userEmail');
        this.inputSalary = page.locator('#salary');
        this.inputDepartement = page.locator('#department');
        this.submitRegist = page.locator('#submit');
        this.row0 = page.locator('div').nth(0);
        this.row1 = page.locator('div').nth(1);
        this.row2 = page.locator('div').nth(2);
        this.row3 = page.locator('div').nth(3);
        this.row4 = page.locator('div').nth(4);
        this.row5 = page.locator('div').nth(5);
    }



    async clickWebTable() {
        await this.webTableSideButton.click();
    }

    async expectwebTablePage() {
        await expect(this.page).toHaveURL(this.urlWebTable);
        await expect(this.headerWebTable).toBeVisible();
    }

    async RegistNewPerson(first, last, email, age, salary, depart) {
        await this.inputFirstName.waitFor({ state: 'visible', timeout: 10000 });
        await this.inputFirstName.fill(first);

        await this.inputLastName.waitFor({ state: 'visible', timeout: 10000 });
        await this.inputLastName.fill(last);

        await this.inputEmail.waitFor({ state: 'visible', timeout: 10000 });
        await this.inputEmail.fill(email);

        await this.inputAge.waitFor({ state: 'visible', timeout: 10000 });
        await this.inputAge.fill(age);

        await this.inputSalary.waitFor({ state: 'visible', timeout: 10000 });
        await this.inputSalary.fill(salary);

        await this.inputDepartement.waitFor({ state: 'visible', timeout: 10000 });
        await this.inputDepartement.fill(depart);
    }

    async clickButtonSubmit() {
        await this.submitRegist.click();
    }

    async SuccessRegist(first, last, email, age, salary, depart) {
        await expect(this.row0).toContainText(first);
        await expect(this.row1).toContainText(last);
        await expect(this.row2).toContainText(email);
        await expect(this.row3).toContainText(age);
        await expect(this.row4).toContainText(salary);
        await expect(this.row5).toContainText(depart);
    }

    async clickButtonAdd() {
        await this.buttonAdd.click();
    }

    async inputbyAI() {
        await this.inputFirstName.waitFor({ state: 'visible', timeout: 10000 });
        await this.inputFirstName.fill(firstName);

        await this.inputLastName.waitFor({ state: 'visible', timeout: 10000 });
        await this.inputLastName.fill(lastName);

        await this.inputEmail.waitFor({ state: 'visible', timeout: 10000 });
        await this.inputEmail.fill(email);

        await this.inputAge.waitFor({ state: 'visible', timeout: 10000 });
        await this.inputAge.fill(age);

        await this.inputSalary.waitFor({ state: 'visible', timeout: 10000 });
        await this.inputSalary.fill(salary);

        await this.inputDepartement.waitFor({ state: 'visible', timeout: 10000 });
        await this.inputDepartement.fill(department);
        // await page.locator('#firstName').fill(NEW_EMPLOYEE_DATA.firstName);
        // await page.locator('#lastName').fill(NEW_EMPLOYEE_DATA.lastName);
        // await page.locator('#userEmail').fill(NEW_EMPLOYEE_DATA.email);
        // await page.locator('#age').fill(NEW_EMPLOYEE_DATA.age);
        // await page.locator('#salary').fill(NEW_EMPLOYEE_DATA.salary);
        // await page.locator('#department').fill(NEW_EMPLOYEE_DATA.department);
    }

    async expectbyAI() {
        const newRowLocator = page.locator(`.rt-tr-group:has-text("${NEW_EMPLOYEE_DATA.firstName}")`);
        await expect(newRowLocator).toBeVisible();
        await expect(newRowLocator).toContainText(NEW_EMPLOYEE_DATA.lastName);
        await expect(newRowLocator).toContainText(NEW_EMPLOYEE_DATA.age);
        await expect(newRowLocator).toContainText(NEW_EMPLOYEE_DATA.email);
        await expect(newRowLocator).toContainText(NEW_EMPLOYEE_DATA.salary);
        await expect(newRowLocator).toContainText(NEW_EMPLOYEE_DATA.department);
    }
}