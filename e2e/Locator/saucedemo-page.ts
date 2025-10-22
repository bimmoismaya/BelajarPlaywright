import { Locator, Page, expect } from '@playwright/test';

/**
 * SauceDemo Login Page Object
 * Website: https://www.saucedemo.com
 */
export class SauceDemoLoginPage {
    readonly page: Page;
    readonly url: string = 'https://www.saucedemo.com';
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectErrorMessage(expectedMessage: string) {
        await expect(this.errorMessage).toContainText(expectedMessage);
    }

    async expectErrorVisible() {
        await expect(this.errorMessage).toBeVisible();
    }
}

/**
 * SauceDemo Inventory/Dashboard Page Object
 * Displayed after successful login
 */
export class SauceDemoInventoryPage {
    readonly page: Page;
    readonly inventoryUrl: string = 'https://www.saucedemo.com/inventory.html';
    readonly appLogo: Locator;
    readonly productList: Locator;
    readonly cartIcon: Locator;
    readonly cartBadge: Locator;
    readonly sortDropdown: Locator;
    readonly logoutButton: Locator;
    readonly menuButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.appLogo = page.locator('.app_logo');
        this.productList = page.locator('[data-test="inventory-list"]');
        this.cartIcon = page.locator('a.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.locator('#logout_sidebar_link');
    }

    async expectLoginSuccess() {
        await expect(this.page).toHaveURL(this.inventoryUrl);
        await expect(this.productList).toBeVisible();
        await expect(this.appLogo).toContainText('Swag Labs');
    }

    async getProductByName(productName: string): Promise<Locator> {
        return this.page.locator(`text="${productName}"`).locator('xpath=ancestor::div[@data-test="inventory-item"]');
    }

    async addProductToCart(productName: string) {
        const productItem = await this.getProductByName(productName);
        const addButton = productItem.locator('button:has-text("Add to cart")');
        await addButton.click();
    }

    async removeProductFromCart(productName: string) {
        const productItem = await this.getProductByName(productName);
        const removeButton = productItem.locator('button:has-text("Remove")');
        await removeButton.click();
    }

    async getCartItemCount(): Promise<number> {
          try {
            const badge = await this.cartBadge.textContent();
            return parseInt(badge || '0', 10);
        } catch {
            return 0;
        }
    }

    async sortBy(sortOption: string) {
        await this.sortDropdown.selectOption(sortOption);
    }

    async openCart() {
        await this.cartIcon.click();
    }

    async openMenu() {
        await this.menuButton.click();
    }

    async logout() {
        await this.menuButton.click();
        await this.logoutButton.click();
    }
}

/**
 * SauceDemo Cart Page Object
 */
export class SauceDemoCartPage {
    readonly page: Page;
    readonly cartUrl: string = 'https://www.saucedemo.com/cart.html';
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('[data-test="cart-list"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }

    async expectCartPage() {
        await expect(this.page).toHaveURL(this.cartUrl);
    }

    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async checkout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }
}

/**
 * SauceDemo Checkout Page Object
 */
export class SauceDemoCheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly orderConfirmation: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.orderConfirmation = page.locator('[data-test="complete-header"]');
    }

    async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueCheckout() {
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async expectOrderConfirmation() {
        await expect(this.orderConfirmation).toContainText('Thank you for your order');
    }
}
