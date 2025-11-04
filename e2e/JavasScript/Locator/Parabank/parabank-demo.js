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

        //--melakukan opsi pemilihan random pada dropdown, in case ini 2 pilihan
        const optionLocatorType = this.typeCombox.locator('CHECKING', 'SAVINGS');
        const totalOptionType = await optionLocatorType.count();

        if (totalOptionType > 1) {
            const minIndex = 1;
            const maxIndex = totalOptionType - 1;

            const randomIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;

            await this.typeCombox.selectOption({ index: randomIndex });

            const selectedOptionTextType = await this.typeCombox.evaluate((selectElement, index) => {
                return selectElement.option[index].text;
            }, randomIndex);

            await expect(this.typeCombox).toHaveValue(await this.typeCombox.inputValue());
            console.log(`✅ Berhasil memilih opsi acak dengan indeks: ${randomIndex}`);
            console.log(`Teks opsi yang dipilih: ${selectedOptionTextType}`);
        } else {
            console.log("❌ Dropdown tidak memiliki opsi yang cukup untuk dipilih secara acak.");
        }


        //niatnya process atas dan bawah adalah pemilihan opsi dropdown secara acak namun masih error
        //dimana errornya terdapat console.log karena opsi dropdownya hanya 1
        //const allAccounts = this.accCombox();
        const totalAccounts = await this.accCombox.count();
        console.log(`Ditemukan total ${totalAccounts} elemen`);

        if (totalAccounts > 0) {
            const randomDropdownIndex = Math.floor(Math.random() * totalAccounts);
            const targetDropdown = this.accCombox.nth(randomDropdownIndex);
            console.log(`Memilih dropdown ke- ${randomDropdownIndex + 1} secara acak`);

            const optionLocatorAccount = targetDropdown.locator('option');
            const totalOptionAccount = optionLocatorAccount.count();

            if (totalOptionAccount > 1) {
                const minIndeks = 1;
                const maxIndeks = totalOptionAccount - 1;
                const randomIndexAccount = Math.floor(Math.random() * (maxIndeks - minIndeks + 1)) + minIndeks;

                await targetDropdown.selectOption({ index: randomIndexAccount });
                const selectedOptionAccount = await targetDropdown.inputValue();
                console.log(`✅ Dropdown acak berhasil dipilih. Nilai yang terpilih: ${selectedOptionAccount}`);

                await expect(targetDropdown).not.toBeEmpty();
            } else {
                console.log("❌ Dropdown yang dipilih tidak memiliki opsi yang cukup untuk dipilih.");
            }
        } else {
            console.log("❌ Tidak ada elemen <select> (dropdown standar) yang ditemukan di halaman.");
        }
       // await this.accCombox.selectOption({ label: '24666' });
        await this.submitNAButton.click();
    }

    async SuccessCreateNewAccount(expectedMessage) {
        await expect(this.successCreateNA).toContainText(expectedMessage);
    }

}

