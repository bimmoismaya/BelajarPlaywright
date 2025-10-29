import { Locator, Page, expect } from '@playwright/test';

// Mendefinisikan class untuk Page Object Model (POM)
export class AddRemovePage {
    readonly page: Page;
    
    // Definisikan Locators
    readonly url: string = 'https://the-internet.herokuapp.com/add_remove_elements/';
    readonly addButton: Locator;
    readonly deleteButton: Locator; // Locator ini akan menargetkan tombol yang muncul secara dinamis

    // Constructor untuk inisialisasi Page Object
    constructor(page: Page) {
        this.page = page;
        
        // Inisialisasi Locators
        // Menggunakan getByRole untuk button 'Add Element'
        this.addButton = page.getByRole('button', { name: 'Add Element' });
        
        // Menggunakan getByRole untuk button 'Delete'
        this.deleteButton = page.getByRole('button', { name: 'Delete' });
    }

    // --- Fungsi Aksi ---

    async goto() {
        await this.page.goto(this.url);
    }

    async clickAddButton() {
        await this.addButton.click();
    }
    
    async clickDeleteButton() {
        await this.deleteButton.click();
    }

    // --- Fungsi Verifikasi (Opsional) ---
    
    async expectDeleteButtonToAppear() {
        // Playwright akan otomatis menunggu hingga elemen muncul
        await expect(this.deleteButton).toBeVisible();
    }
    
    async expectDeleteButtonToDisappear() {
        // Memverifikasi elemen benar-benar dihapus dari DOM
        await expect(this.deleteButton).not.toBeAttached();
    }
}