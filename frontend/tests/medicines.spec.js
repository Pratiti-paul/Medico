import { test, expect } from './fixtures/customFixtures';

test.describe('Medicine Store Tests', () => {
  const patientEmail = `patient_med_${Math.floor(Math.random() * 10000)}@gmail.com`;
  const password = 'Password123!';

  test.beforeEach(async ({ signupPage, loginPage, page }) => {
    await signupPage.goto();
    await signupPage.register('Patient Medicines', patientEmail, password, 'user');
    await loginPage.goto();
    await loginPage.login(patientEmail, password, 'user');
    await expect(page).toHaveURL(/\/home/);
  });

  test('D1. Browse, search, filter, and edit cart item states', async ({ medicinesPage, cartPage, page }) => {
    await medicinesPage.goto();
    await expect(page).toHaveURL(/\/medicines/);

    // Verify list items loaded
    await expect(medicinesPage.cards.first()).toBeVisible();

    // Select category filter
    await medicinesPage.selectCategory('FEVER & COLD');

    // Add first item to cart
    await medicinesPage.addFirstAvailableToCart();
    await expect(page.locator('.Toastify__toast-body')).toContainText(/added to cart/i);

    // Go to Cart
    await cartPage.goto();
    await expect(page).toHaveURL(/\/cart/);
    await expect(cartPage.cartItems).toHaveCount(1);

    // Increase item quantity
    await cartPage.increaseQuantity(0);
    let qty = await cartPage.getQuantityValue(0);
    expect(qty).toBe('2');

    // Decrease item quantity
    await cartPage.decreaseQuantity(0);
    qty = await cartPage.getQuantityValue(0);
    expect(qty).toBe('1');

    // Delete item
    await cartPage.removeItem(0);
    await expect(page.locator('.Toastify__toast-body')).toContainText(/removed from cart/i);
    await expect(page.locator('.cart-empty-state')).toBeVisible();
  });
});
