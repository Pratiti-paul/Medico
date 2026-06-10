import { test, expect } from './fixtures/customFixtures';

test.describe.serial('Admin Dashboard Tests', () => {
  const patientEmail = `patient_admin_test_${Math.floor(Math.random() * 10000)}@gmail.com`;
  const adminEmail = `admin_test_${Math.floor(Math.random() * 10000)}@gmail.com`;
  const password = 'Password123!';

  test('H1. Admin can toggle doctor availability', async ({ signupPage, loginPage, adminDoctorsPage, page }) => {
    // Register & Login Admin
    await signupPage.goto();
    await signupPage.register('Admin Doctors', adminEmail, password, 'admin');
    await loginPage.goto();
    await loginPage.login(adminEmail, password, 'admin');

    await adminDoctorsPage.goto();
    await expect(page).toHaveURL(/\/admin\/doctors/);

    const firstRow = adminDoctorsPage.doctorRows.first();
    const toggle = firstRow.getByTestId('doctor-availability-toggle');
    const checkedBefore = await toggle.isChecked();

    // Toggle
    await adminDoctorsPage.toggleAvailability(0);
    await expect(page.locator('.Toastify__toast-body')).toContainText(/availability updated/i);

    // Verify checked state changed
    const checkedAfter = await toggle.isChecked();
    expect(checkedAfter).toBe(!checkedBefore);
  });

  test('H2. Admin can edit medicine price and stock inventory', async ({ adminMedicinesPage, loginPage, page }) => {
    // Admin session is shared or we can login. Let's make sure we are logged in.
    await page.goto('/login');
    await loginPage.login(adminEmail, password, 'admin');

    await adminMedicinesPage.goto();
    await expect(page).toHaveURL(/\/admin\/medicines/);

    const newPrice = 250;
    const newStock = 45;

    await adminMedicinesPage.editMedicineInventory(0, { price: newPrice, stock: newStock });
    await expect(page.locator('.Toastify__toast-body')).toContainText(/updated successfully/i);

    // Verify values updated in table
    const firstRow = adminMedicinesPage.medicineRows.first();
    await expect(firstRow.locator('td').nth(2)).toContainText(`₹${newPrice}`);
    await expect(firstRow.locator('td').nth(3)).toContainText(`${newStock} pcs`);
  });

  test('H3. Admin can update order status (payment & delivery)', async ({ signupPage, loginPage, medicinesPage, cartPage, checkoutPage, adminOrdersPage, navbar, page }) => {
    // 1. Log in as patient and place a COD order
    await signupPage.goto();
    await signupPage.register('Patient For Admin', patientEmail, password, 'user');
    await loginPage.goto();
    await loginPage.login(patientEmail, password, 'user');

    await medicinesPage.goto();
    await medicinesPage.addFirstAvailableToCart();
    await cartPage.goto();
    await cartPage.checkout();
    await checkoutPage.selectPaymentMethod('COD');
    await checkoutPage.placeOrder();
    await expect(page.locator('.Toastify__toast-body')).toContainText(/order placed/i);

    // Log out patient
    await navbar.logout();

    // 2. Log in as admin
    await loginPage.goto();
    await loginPage.login(adminEmail, password, 'admin');

    // 3. Go to admin orders list
    await adminOrdersPage.goto();
    await expect(page).toHaveURL(/\/admin\/orders/);

    const targetRow = adminOrdersPage.orderRows.first();
    // Verify first row contains the new order (which is placed and pending payment)
    await expect(targetRow.locator('td').nth(1)).toContainText('Patient For Admin');
    await expect(targetRow.locator('td').nth(3)).toContainText('pending');

    // Mark as paid
    await adminOrdersPage.markAsPaid(0);
    await expect(page.locator('.Toastify__toast-body')).toContainText(/payment status updated/i);
    await expect(targetRow.locator('td').nth(3)).toContainText('paid');

    // Deliver order
    await adminOrdersPage.deliverOrder(0);
    await expect(page.locator('.Toastify__toast-body')).toContainText(/marked as delivered/i);
    await expect(targetRow.locator('td').nth(4)).toContainText('delivered');
  });

  // Skip blocks for features not implemented in this application codebase
  test.skip('H4. Add Doctor (Feature not implemented in backend/frontend UI)', async () => {});
  test.skip('H5. Edit Doctor Profile (Feature not implemented in backend/frontend UI)', async () => {});
  test.skip('H6. Delete Doctor (Feature not implemented in backend/frontend UI)', async () => {});
  test.skip('H7. Add Medicine (Feature not implemented in backend/frontend UI)', async () => {});
  test.skip('H8. Delete Medicine (Feature not implemented in backend/frontend UI)', async () => {});
  test.skip('H9. View Feedback (Feature not implemented in backend/frontend UI)', async () => {});
});
