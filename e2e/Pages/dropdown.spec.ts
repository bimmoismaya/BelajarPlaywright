import { test, expect } from "@playwright/test";
import { dropDownPage } from "../Locator/dropdown";


test.describe(' all test', { tag: '@allgroup' }, () => {
    //
    test.describe('Negative Case', { tag: '@Negative' }, () => {
        test(' Expected No Selected Option ', async ({page}) => {
            const dropDown = new dropDownPage(page);
            await dropDown.GoTo();
            await dropDown.expecNoOptionSelected();
        });
    });

    test.describe('Positive Case', { tag: '@Positive' }, () => {
        test('Expected Bisa Pilih Dropdown', async ({page}) => {
            const dropDown = new dropDownPage(page);
            await dropDown.GoTo();
            await dropDown.selectOptionByLabel('Option 1');
            await dropDown.expectSelectedValue('1');

            await dropDown.selectOptionByLabel('Option 2');
            await dropDown.expectSelectedValue('2');
        });
    })
});