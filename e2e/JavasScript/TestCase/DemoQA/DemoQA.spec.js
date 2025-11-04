import { test, expect } from '@playwright/test';

import {
    GoToElementPageDemo,
    TextBoxElementDemo,
    CheckBoxPage
} from '../../Locator/DemoQA/DemoQA-Test'

test.describe('DemoQA go to Text Box', { tag: '@demoQA' }, () => {
    let webPage;
    let elementPage;
    test.beforeEach(async ({ page }) => {
        webPage = new GoToElementPageDemo(page);
        elementPage = new TextBoxElementDemo(page);
        await webPage.gotoElementPage();

    });

    test('input all text box lalu submit', async () => {
        await elementPage.expectSuccessGoToElementsPage();
        await elementPage.gotoTextBoxPage();
        await elementPage.expectSuccessGoToTextBoxPage();
        await elementPage.inputDataInfo('John Doe', 'admin@admin.com', 'Earth', 'Mars');
        await elementPage.hitButtonSubmit();
        await elementPage.expectedResultSubmit('John Doe', 'admin@admin.com', 'Earth', 'Mars');
    });
});

test.describe('DemoQA go to CheckboxPage', { tag: '@demoQA' }, () => {
    let webPage;
    let checkBoxPage;
    test.beforeEach(async ({ page }) => {
        webPage = new GoToElementPageDemo(page);
        checkBoxPage = new CheckBoxPage(page);
        await webPage.gotoElementPage();
    });

    test('Testing Collapse Button', async () => {

        await checkBoxPage.expectSuccessGoToElementsPage();
        await checkBoxPage.gotoCheckBoxPage();
        await checkBoxPage.expectSuccessGoToCheckBoxPage();
        await checkBoxPage.hitButtonCollapse();
        await checkBoxPage.CollapseAllView();
        await checkBoxPage.CollapseNotView();
    });

    test('Home Label Checked', async () => {
        await checkBoxPage.clickHomeLabel();
        await checkBoxPage.expectHomeLabelChecked();
    })


});