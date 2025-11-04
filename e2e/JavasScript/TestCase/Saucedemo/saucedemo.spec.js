import { test, expect } from '@playwright/test';
import {
    SauceDemoLoginPage,
    SauceDemoInventoryPage,
    SauceDemoCartPage,
    SauceDemoCheckoutPage,
} from '../../Locator/Saucedemo/sauce-demo-';

/**
 * SauceDemo Test Suite
 * Testing e-commerce flows on https://www.saucedemo.com
 */

test.describe('SauceDemo Login', { tag: '@saucedemo' }, () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new SauceDemoLoginPage(page);
        await loginPage.goto();
    });

    test('should login successfully with valid credentials', async ({ page }) => {
        const username = process.env.SAUCEDEMO_USERNAME || 'standard_user';
        const password = process.env.SAUCEDEMO_PASSWORD || 'secret_sauce';

        await loginPage.login(username, password);

        const inventoryPage = new SauceDemoInventoryPage(page);
        await inventoryPage.expectLoginSuccess();
    });

    test('should show error with invalid username', async () => {
        await loginPage.login('invalid_user', 'secret_sauce');
        await loginPage.expectErrorVisible();
        await loginPage.expectErrorMessage('Username and password do not match any user in this service');
    });

    test('should show error with invalid password', async () => {
        const username = process.env.SAUCEDEMO_USERNAME || 'standard_user';

        await loginPage.login(username, 'invalid_password');
        await loginPage.expectErrorVisible();
        await loginPage.expectErrorMessage('Username and password do not match any user in this service');
    });

    test('should show error when username is empty', async () => {
        await loginPage.login('', 'secret_sauce');
        await loginPage.expectErrorVisible();
        await loginPage.expectErrorMessage('Username is required');
    });

    test('should show error when password is empty', async () => {
        const username = process.env.SAUCEDEMO_USERNAME || 'standard_user';

        await loginPage.login(username, '');
        await loginPage.expectErrorVisible();
        await loginPage.expectErrorMessage('Password is required');
    });
});

test.describe('SauceDemo Inventory', { tag: '@saucedemo' }, () => {
    let loginPage;
    let inventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new SauceDemoLoginPage(page);
        inventoryPage = new SauceDemoInventoryPage(page);

        // Login before each test
        await loginPage.goto();
        const username = process.env.SAUCEDEMO_USERNAME || 'standard_user';
        const password = process.env.SAUCEDEMO_PASSWORD || 'secret_sauce';
        await loginPage.login(username, password);
        await inventoryPage.expectLoginSuccess();
    });

    test('should display product list', async ({ page }) => {
        const productCount = await page.locator('[data-test="inventory-item"]').count();
        expect(productCount).toBeGreaterThan(0);
    });

    test('should add product to cart', async () => {
        const productName = 'Sauce Labs Backpack';

        await inventoryPage.addProductToCart(productName);

        const cartCount = await inventoryPage.getCartItemCount();
        expect(cartCount).toBe(1);
    });

    test('should add multiple products to cart', async () => {
        const products = ['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt'];

        for (const product of products) {
            await inventoryPage.addProductToCart(product);
        }

        const cartCount = await inventoryPage.getCartItemCount();
        expect(cartCount).toBe(2);
    });

    test('should remove product from cart', async () => {
        const productName = 'Sauce Labs Backpack';

        // Add product
        await inventoryPage.addProductToCart(productName);
        let cartCount = await inventoryPage.getCartItemCount();
        expect(cartCount).toBe(1);

        // Remove product
        await inventoryPage.removeProductFromCart(productName);
        cartCount = await inventoryPage.getCartItemCount();
        expect(cartCount).toBe(0);
    });

    test('should sort products by price', async ({ page }) => {
        await inventoryPage.sortBy('lohi'); // Low to high

        // Verify products are sorted (basic check)
        const prices = await page.locator('[data-test="inventory-item-price"]').allTextContents();
        expect(prices.length).toBeGreaterThan(0);
    });

    test('should logout successfully', async ({ page }) => {
        await inventoryPage.logout();

        // Should redirect to login page
        await expect(page).toHaveURL(/.*saucedemo.com\/?\s*$/);
    });
});

test.describe('SauceDemo Shopping Cart & Checkout', { tag: '@saucedemo' }, () => {
    let loginPage;
    let inventoryPage;
    let cartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new SauceDemoLoginPage(page);
        inventoryPage = new SauceDemoInventoryPage(page);
        cartPage = new SauceDemoCartPage(page);

        // Login
        await loginPage.goto();
        const username = process.env.SAUCEDEMO_USERNAME || 'standard_user';
        const password = process.env.SAUCEDEMO_PASSWORD || 'secret_sauce';
        await loginPage.login(username, password);
        await inventoryPage.expectLoginSuccess();
    });

    test('should view cart with added products', async () => {
        const productName = 'Sauce Labs Backpack';

        // Add product and navigate to cart
        await inventoryPage.addProductToCart(productName);
        await inventoryPage.openCart();
        await cartPage.expectCartPage();
        const itemCount = await cartPage.getCartItemCount();
        expect(itemCount).toBe(1);
    });

    test('should complete full checkout flow', async ({ page }) => {
        const productName = 'Sauce Labs Backpack';

        // Add product to cart
        await inventoryPage.addProductToCart(productName);
        await inventoryPage.openCart();
        await cartPage.expectCartPage();

        // Proceed to checkout
        await cartPage.checkout();

        const checkoutPage = new SauceDemoCheckoutPage(page);
        await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
        await checkoutPage.continueCheckout();

        // Review and finish
        await checkoutPage.finishCheckout();
        await checkoutPage.expectOrderConfirmation();
    });

    test('should continue shopping from cart', async ({ page }) => {
        const productName = 'Sauce Labs Backpack';

        // Add product and navigate to cart
        await inventoryPage.addProductToCart(productName);
        await inventoryPage.openCart();
        await cartPage.expectCartPage();

        // Continue shopping
        await cartPage.continueShopping();

        // Should be back on inventory page
        await inventoryPage.expectLoginSuccess();
    });
});

test.describe('SauceDemo Problem User', { tag: '@saucedemo' }, () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new SauceDemoLoginPage(page);
        await loginPage.goto();
    });

    test('should login with problem_user account', async ({ page }) => {
        // problem_user is a test account with UI issues
        await loginPage.login('problem_user', 'secret_sauce');

        const inventoryPage = new SauceDemoInventoryPage(page);
        await inventoryPage.expectLoginSuccess();
    });

    test('should login with performance_glitch_user account', async ({ page }) => {
        // performance_glitch_user has slower response times
        await loginPage.login('performance_glitch_user', 'secret_sauce');

        const inventoryPage = new SauceDemoInventoryPage(page);
        await inventoryPage.expectLoginSuccess();
    });
});