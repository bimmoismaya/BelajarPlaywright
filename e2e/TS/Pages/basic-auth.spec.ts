import { test, expect } from '@playwright/test';

import { BasicAuth } from '../Locator/basic-auth';

test('Test basic auth input username dan password admin', async ({ page }) => {
    const basicAuthPage = new BasicAuth(page);

    await basicAuthPage.goto();
    //masuk web heroku app

    await basicAuthPage.clickBasicAuth();
    //click element Basic Auth

    const username = 'admin';
    const password = 'admin';

    await page.goto(`https://${username}:${password}@the-internet.herokuapp.com/basic_auth`);


    await basicAuthPage.expectWebToAppear();
    //menampilkan tampilan web basic auth


});