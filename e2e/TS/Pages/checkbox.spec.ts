import { test, expect } from '@playwright/test';
import { CheckboxPage } from '../Locator/checkbox-locator';


test('masuk ke web dengan ekspektasi checkbox dalam kondisi random', async ({ page }) => {
    const cekBoxPage = new CheckboxPage(page);

    await cekBoxPage.goto();
    await cekBoxPage.checkboxSatu.uncheck();
    await cekBoxPage.checkboxDua.check();


    await cekBoxPage.clickCheckboxSatu();
    await cekBoxPage.clickCheckboxDua();
    //
    await expect(cekBoxPage.checkboxSatu).toBeChecked();
    await expect(cekBoxPage.checkboxDua).not.toBeChecked();

});

