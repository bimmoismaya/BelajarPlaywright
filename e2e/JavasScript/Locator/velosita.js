import { expect } from "playwright/test";

export class VelotiketDemoHomePage {
    constructor(page) {
        this.page = page;
        this.url = 'https://velotiket.com/tiket/';
        this.flightButton = page.getByAltText('flights');
    }

    async goto(){
        await this.page.goto (this.url);
    }

    async testClickFlightButton() {
        await this.page.flightButton.click();
    }
}
