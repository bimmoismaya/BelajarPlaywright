import { test, expect} from '@playwright/test';

import{
    GoToElementPageDemo,
    TextBoxElementDemo
} from '../../Locator/DemoQA/DemoQA-Test'

test.describe('DemoQA go to Web', { tag: '@demoQA'}, () => {
    let webPage;
    let elementPage;
    test.beforeEach(async ({ page }) => {
        webPage = new GoToElementPageDemo(page);
        await webPage.gotoElementPage();
            
    });

    test('input all text box lalu submit', async({page}) => {

        elementPage = new TextBoxElementDemo(page);
        await elementPage.expectSuccessGoToElementsPage();

        await elementPage.toTextBoxPage();
        await elementPage.inputDataInfo('John Doe','admin@admin.com','Earth','Mars');
        await elementPage.hitButtonSubmit();
        await elementPage.expectedResultSubmit('John Doe','admin@admin.com','Earth','Mars');
    });
});