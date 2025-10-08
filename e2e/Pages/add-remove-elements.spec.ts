// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//     await page.goto('https://the-internet.herokuapp.com/');
//     await expect(page).toHaveURL('https://the-internet.herokuapp.com')

//     await page.getByRole('listitem').filter({ hasText: 'Add/Remove Elements' }).click();
//     await page.getByRole('link', { name: 'Add/Remove Elements' }).click();  
//     await expect(page).toHaveURL('https://the-internet.herokuapp.com/add_remove_elements/')
//     await expect(page).toHaveTitle('The Internet')

//     const addElementButton = page.getByRole('button', { name: 'Add Element' });
//     const deleteButton = page.getByRole('button', { name: 'Delete' });

//     await addElementButton.click();
//     // ini manggil button element diatas buat click

//     await expect(deleteButton).toBeVisible();
//     //ekspektasi ketika button add element diklik, button delete muncul (toBeVisible)

//     //++++++++++++++++++++++++++++++++++++
//     //cek remove button delete
//     await deleteButton.click();

//     await expect(deleteButton).not.toBeAttached();
//     // ekspektasi tombol delete hilang, lebih bagus menggunakan not.toBeAttached ketimbang not.toBeVisible
//     //karena element benar-benar terhapus dari DOM
// });



import { test, expect } from '@playwright/test';
// Import class dari folder pages/
import { AddRemovePage } from '../Locator/add-remove-elements-locator'; 

test('Menguji fungsionalitas Add dan Remove Element dengan POM', async ({ page }) => {
    
    // 1. Inisialisasi Page Object
    const addRemovePage = new AddRemovePage(page);
    
    // Aksi: Navigasi
    await addRemovePage.goto();

    // --- Skenario 1: Add Element ---
    
    // Verifikasi awal (negatif)
    await addRemovePage.expectDeleteButtonToDisappear(); 
    
    // Klik Add
    await addRemovePage.clickAddButton();

    // Verifikasi kemunculan
    await addRemovePage.expectDeleteButtonToAppear(); 

    // --- Skenario 2: Remove Element ---

    // Klik Delete
    await addRemovePage.clickDeleteButton();

    // Verifikasi penghilangan
    await addRemovePage.expectDeleteButtonToDisappear();
});
test('test', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await expect(page).toHaveURL('https://the-internet.herokuapp.com')

    await page.getByRole('listitem').filter({ hasText: 'Add/Remove Elements' }).click();
    await page.getByRole('link', { name: 'Add/Remove Elements' }).click();  
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/add_remove_elements/')
    await expect(page).toHaveTitle('The Internet')

    const addElementButton = page.getByRole('button', { name: 'Add Element' });
    const deleteButton = page.getByRole('button', { name: 'Delete' });

    await addElementButton.click();
    // ini manggil button element diatas buat click

    await expect(deleteButton).toBeVisible();
    //ekspektasi ketika button add element diklik, button delete muncul (toBeVisible)

    //++++++++++++++++++++++++++++++++++++
    //cek remove button delete
    await deleteButton.click();

    await expect(deleteButton).not.toBeAttached();
    // ekspektasi tombol delete hilang, lebih bagus menggunakan not.toBeAttached ketimbang not.toBeVisible
    //karena element benar-benar terhapus dari DOM
});

