import { Locator, Page, expect } from '@playwright/test';

export class CheckboxPage {
    readonly page: Page;
    readonly urlNya: string = 'https://the-internet.herokuapp.com/checkboxes';
    readonly checkboxSatu: Locator;
    readonly checkboxDua: Locator;

    constructor(page: Page){
        this.page = page;

        // penggunaan element checkbox
        this.checkboxSatu = page.locator("(//input[@type='checkbox'])[1]");
        this.checkboxDua = page.locator("(//input[@type='checkbox'])[2]");
    }

    //aksinya
    async goto(){
        await this.page.goto(this.urlNya);
    }

    async clickCheckboxSatu(){
        await this.checkboxSatu.click();
    }

        async clickCheckboxDua(){
        await this.checkboxDua.click();
    }
}