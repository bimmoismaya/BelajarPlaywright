import { Locator, Page, expect } from '@playwright/test';

export class BasicAuth {
    readonly page: Page;
    readonly url: string = 'https://the-internet.herokuapp.com';
    readonly basic_auth: Locator;
    readonly urlAppear: string = 'https://the-internet.herokuapp.com/basic_auth';

    constructor(page: Page) {
        this.page = page;
        this.basic_auth = page.getByRole('link', { name: 'Basic Auth' });
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async clickBasicAuth() {
        await this.basic_auth.click();
    }

    async expectWebToAppear() {
        await expect(this.page).toHaveURL(this.urlAppear);
    }
}
