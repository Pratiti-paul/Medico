import { test, expect } from './fixtures/customFixtures';

test.describe('Order & Payment Tests', () => {
  const patientEmail = `patient_ord_${Math.floor(Math.random() * 10000)}@gmail.com`;
  const password = 'Password123!';

  test.beforeEach(async ({ signupPage, loginPage, page }) => {
    await signupPage.goto();
    await signupPage.register('Patient Orders', patientEmail, password, 'user');
    await loginPage.goto();
    await loginPage.login(patientEmail, password, 'user');
    await expect(page).toHaveURL(/\/home/);
  });

  test('E1. Check out with COD payment, place order, verify history, and check cart is empty', async ({ medicinesPage, cartPage, checkoutPage, ordersPage, page }) => {
    // Add item to cart
    await medicinesPage.goto();
    await medicinesPage.addFirstAvailableToCart();
    await expect(page.locator('.Toastify__toast-body')).toContainText(/added to cart/i);

    // Go to cart
    await cartPage.goto();
    await expect(cartPage.cartItems).toHaveCount(1);
    await cartPage.checkout();

    // Verify checkout URL
    await expect(page).toHaveURL(/\/checkout/);

    // Select COD payment method
    await checkoutPage.selectPaymentMethod('COD');

    // Place order
    await checkoutPage.placeOrder();

    // Verify success toast
    await expect(page.locator('.Toastify__toast-body')).toContainText(/order placed/i);

    // Redirected to order history page
    await expect(page).toHaveURL(/\/my-orders/);

    // Verify order shows in history
    const details = await ordersPage.getLatestOrderDetails();
    expect(details.orderId).toBeTruthy();
    expect(details.paymentMethod).toBe('COD');
    expect(details.paymentStatus.toLowerCase()).toContain('pending');

    // Check cart is now empty
    await cartPage.goto();
    await expect(page.locator('.cart-empty-state')).toBeVisible();
  });
});
