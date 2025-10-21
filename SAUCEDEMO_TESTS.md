# SauceDemo Test Suite

## Overview

This document describes the SauceDemo test suite added to the BelajarPlaywright project. SauceDemo (https://www.saucedemo.com) is a popular demo e-commerce website designed specifically for practicing test automation.

## Test Structure

### Files Created

#### Locators (`e2e/Locator/saucedemo-page.ts`)

Four page object classes for different flows:

1. **SauceDemoLoginPage**
   - Handles login functionality
   - Methods:
     - `goto()` - Navigate to SauceDemo site
     - `login(username, password)` - Enter credentials and submit
     - `expectErrorMessage(message)` - Verify error messages
     - `expectErrorVisible()` - Check if error is displayed

2. **SauceDemoInventoryPage**
   - Manages product listing and shopping cart interactions
   - Methods:
     - `expectLoginSuccess()` - Verify successful login
     - `getProductByName(name)` - Find product by name
     - `addProductToCart(name)` - Add product to cart
     - `removeProductFromCart(name)` - Remove product from cart
     - `getCartItemCount()` - Get number of items in cart
     - `sortBy(option)` - Sort products
     - `openCart()` - Navigate to cart page
     - `openMenu()` - Open hamburger menu
     - `logout()` - Log out from application

3. **SauceDemoCartPage**
   - Handles shopping cart operations
   - Methods:
     - `expectCartPage()` - Verify on cart page
     - `getCartItemCount()` - Count items in cart
     - `checkout()` - Proceed to checkout
     - `continueShopping()` - Return to inventory

4. **SauceDemoCheckoutPage**
   - Manages checkout process
   - Methods:
     - `fillCheckoutInfo(firstName, lastName, postalCode)` - Enter shipping info
     - `continueCheckout()` - Proceed to review
     - `finishCheckout()` - Complete order
     - `expectOrderConfirmation()` - Verify order success

#### Tests (`e2e/Pages/saucedemo.spec.ts`)

Four test suites with 15+ test cases:

### 1. SauceDemo Login (@saucedemo tag)

Tests login functionality with valid/invalid credentials:
- ✅ Login with valid credentials
- ✅ Error on invalid username
- ✅ Error on invalid password
- ✅ Error on empty username
- ✅ Error on empty password

### 2. SauceDemo Inventory (@saucedemo tag)

Tests product listing and cart operations:
- ✅ Display product list
- ✅ Add single product to cart
- ✅ Add multiple products to cart
- ✅ Remove product from cart
- ✅ Sort products by price
- ✅ Logout functionality

### 3. SauceDemo Shopping Cart & Checkout (@saucedemo tag)

Tests complete e-commerce flows:
- ✅ View cart with products
- ✅ Complete full checkout flow
- ✅ Continue shopping from cart

### 4. SauceDemo Problem User (@saucedemo tag)

Tests special user accounts:
- ✅ Login with problem_user (UI issues)
- ✅ Login with performance_glitch_user (slow responses)

## Available Test Users

SauceDemo provides special test accounts:

| Username | Password | Description |
|----------|----------|-------------|
| `standard_user` | `secret_sauce` | Normal user with standard behavior |
| `locked_out_user` | `secret_sauce` | Account that cannot login |
| `problem_user` | `secret_sauce` | User with visual rendering issues |
| `performance_glitch_user` | `secret_sauce` | User with slower page load times |

## Environment Configuration

Add credentials to `.env` file (copy from `.env.example`):

```env
SAUCEDEMO_USERNAME=standard_user
SAUCEDEMO_PASSWORD=secret_sauce
SAUCEDEMO_URL=https://www.saucedemo.com
```

## Running Tests

### Run all SauceDemo tests:
```bash
npm test -- --grep "@saucedemo"
```

### Run specific test suite:
```bash
npm test saucedemo.spec.ts
```

### Run with specific tag:
```bash
npm test -- --grep "Login"
```

### Run in UI mode:
```bash
npm run test:ui
```

### Debug tests:
```bash
npm run test:debug
```

## Test Coverage

- **Login Flows**: 5 tests
- **Inventory Management**: 6 tests
- **Cart & Checkout**: 3 tests
- **Special Accounts**: 2 tests
- **Total**: 16+ test cases

## Key Features Tested

✅ User authentication (login/logout)
✅ Form validation
✅ Product browsing
✅ Shopping cart operations (add/remove)
✅ Product sorting
✅ Checkout process
✅ Error handling
✅ Different user scenarios

## Best Practices Demonstrated

1. **Page Object Model (POM)**: Separate page objects for different areas
2. **Environment Variables**: Credentials from `.env` file
3. **Descriptive Test Names**: Clear test descriptions
4. **Test Grouping**: `test.describe()` with tags
5. **Reusable Methods**: Helper methods for common operations
6. **Assertions**: Proper validation of results
7. **Setup/Teardown**: `test.beforeEach()` for consistent state

## Extending the Tests

To add more tests:

1. **Add methods to page objects** in `e2e/Locator/saucedemo-page.ts`
2. **Create new test cases** in `e2e/Pages/saucedemo.spec.ts`
3. **Use test.describe()** for logical grouping
4. **Add @saucedemo tag** for easy filtering

### Example: Add wishlist test
```typescript
test('should add product to wishlist', async ({ page }) => {
    // Test code here
});
```

## Common Issues & Solutions

### Issue: Login fails
- Verify `.env` file has correct credentials
- Check SauceDemo website is accessible
- Ensure correct selectors with `[data-test]` attributes

### Issue: Tests timeout
- SauceDemo may have performance delays
- Use `performance_glitch_user` to test slow scenarios
- Increase timeout in `playwright.config.ts` if needed

### Issue: Element not found
- Verify selectors haven't changed on SauceDemo
- Use Playwright Inspector: `npm run test:debug`
- Check `[data-test]` attributes exist

## CI/CD Integration

SauceDemo tests are automatically included in CI/CD pipeline via GitHub Actions:

```yaml
- name: Run Playwright tests
  run: npm test
```

All tests run in parallel across Chrome, Firefox, and Safari browsers.

## Related Files

- Locators: `e2e/Locator/saucedemo-page.ts`
- Tests: `e2e/Pages/saucedemo.spec.ts`
- Config: `playwright.config.ts`
- Environment: `.env.example`

## Resources

- [SauceDemo Website](https://www.saucedemo.com)
- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

---

**Document Version**: 1.0
**Last Updated**: 2025-10-21
