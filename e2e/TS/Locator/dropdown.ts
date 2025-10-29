import { Locator, Page, expect } from "@playwright/test";

export class DropdownPage {
    readonly page: Page;
    readonly urlDropdown: string = 'https://the-internet.herokuapp.com/dropdown';
    readonly dropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dropdown = page.locator('#dropdown');
    }

    async goto() {
        await this.page.goto(this.urlDropdown);
    }

    async selectOptionByLabel(label: string) {
        await this.dropdown.selectOption({ label: label });
    }

    async selectOptionByValue(value: string) {
        await this.dropdown.selectOption({ value: value });
    }

    async expectSelectedValue(expectedValue: string) {
        await expect(this.dropdown).toHaveValue(expectedValue);
    }

    async expectNoOptionSelected() {
        await expect(this.dropdown).toHaveValue('');
    }
}