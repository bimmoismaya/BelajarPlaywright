import { test, expect } from '@playwright/test';

import {
    GoToElementPageDemo,
    TextBoxDemo,
    CheckBoxPage,
    RadioButtonPage,
    webTablePage
} from '../../Locator/DemoQA/DemoQA-Test'

test.describe('DemoQA go to Text Box', { tag: '@demoQA' }, () => {
    let webPage;
    let TexBoxPage;
    test.beforeEach(async ({ page }) => {
        webPage = new GoToElementPageDemo(page);
        TexBoxPage = new TextBoxDemo(page);
        await webPage.gotoElementPage();
        await webPage.expectSuccessGoToElementsPage();

    });

    test('input all text box lalu submit', async () => {
        await TexBoxPage.gotoTextBoxPage();
        await TexBoxPage.expectSuccessGoToTextBoxPage();
        await TexBoxPage.inputDataInfo('John Doe', 'admin@admin.com', 'Earth', 'Mars');
        await TexBoxPage.hitButtonSubmit();
        await TexBoxPage.expectedResultSubmit('John Doe', 'admin@admin.com', 'Earth', 'Mars');
    });
});

test.describe('DemoQA go to CheckboxPage', { tag: '@demoQA' }, () => {
    let webPage;
    let checkBoxPage;
    test.beforeEach(async ({ page }) => {
        webPage = new GoToElementPageDemo(page);
        checkBoxPage = new CheckBoxPage(page);
        await webPage.gotoElementPage();
        await webPage.expectSuccessGoToElementsPage();
    });

    test('Testing Expand isi checkbox', async () => {
        await checkBoxPage.gotoCheckBoxPage();
        await checkBoxPage.expectSuccessGoToCheckBoxPage();
        await checkBoxPage.hitButtonExpand();
        await checkBoxPage.expectExpand();
    });

    test('Testing Collapse Button', async () => {
        await checkBoxPage.gotoCheckBoxPage();
        await checkBoxPage.hitButtonExpand();
        await checkBoxPage.hitButtonCollapse();
        await checkBoxPage.CollapseAllView();
        await checkBoxPage.CollapseNotView();
    });

    test('Home Label Checked', async () => {
        await checkBoxPage.gotoCheckBoxPage();
        await checkBoxPage.clickHomeLabel();
        await checkBoxPage.expectHomeLabelChecked();
    });

    test('All checkbox will be checked by clicked home box', async () => {
        await checkBoxPage.gotoCheckBoxPage();
        await checkBoxPage.hitButtonExpand();
        await checkBoxPage.expectExpand();
        await checkBoxPage.clickHomeLabel();
        await checkBoxPage.expectAllBoxChecked();
    })
});

test.describe(' Radio Button Test', { tag: '@demoQA'}, () =>{
    let webPage;
    let RBPage;
    test.beforeEach(async ({ page })=>{
        webPage = new GoToElementPageDemo(page);
        RBPage = new RadioButtonPage(page);
        await webPage.gotoElementPage();
        await webPage.expectSuccessGoToElementsPage();
    });

    test(' Go to Radio Button Page', async () =>{
        await RBPage.clickRadioButton();
        await RBPage.expectRadioButtonPage();
    });

    test('hit Yes radio button', async() =>{
        await RBPage.clickRadioButton();
        await RBPage.expectRadioButtonPage();
        await RBPage.hitYesButton();
    });

    test('hit button impressive', async() =>{
        await RBPage.clickRadioButton();
        await RBPage.expectRadioButtonPage();
        await RBPage.hitImpressiveButton();
    });

    test('hit button No', async() =>{
        await RBPage.clickRadioButton();
        await RBPage.expectRadioButtonPage();
        await RBPage.expectNoButton();
    });
});

test.describe(' Go to Web Table Page', {tag: 'demoQA'}, () =>{
    let webPage;
    let webTbl;
    test.beforeEach(async({ page })=>{
        webPage= new GoToElementPageDemo(page);
        webTbl= new webTablePage(page);
        await webPage.gotoElementPage();
        await webPage.expectSuccessGoToElementsPage();
    });
    test(' go to web table page', async()=>{
        await webTbl.clickWebTable();
        await webTbl.expectwebTablePage();
    });
});