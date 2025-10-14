import { Locator, Page, expect } from "@playwright/test";

export class dropDownPage {
    readonly page: Page;
    readonly urlDropdown: string = 'https://the-internet.herokuapp.com/dropdown';
    readonly dropdown: Locator;
    // readonly option1: Locator;
    // readonly option2: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dropdown = page.locator('#dropdown');
        // this.option1 = page.locator("(//option[@type='dropdown'][1])");
        // this.option2 = page.locator("(//option[@type='dropdown'][2])");
    }


    async GoTo() {
        await this.page.goto(this.urlDropdown);
    }

    async selectOptionByLabel(label:string){
        await this.dropdown.selectOption({label: label});
    }

    async selectOptionByValue(value:string){
        await this.dropdown.selectOption({value: value});
    }

    async expectSelectedValue(expectedValue: string){
        await expect(this.dropdown).toHaveValue(expectedValue);
    }

    async expecNoOptionSelected(){
        await expect(this.dropdown).toHaveValue('');
    }
}
///html/body/div[2]/div/div/select/option[2]