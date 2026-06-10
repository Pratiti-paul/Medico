import { test, expect } from './fixtures/customFixtures';

test.describe('Role-Based Access Control (RBAC) Tests', () => {
  const patientEmail = `patient_rbac_${Math.floor(Math.random() * 10000)}@gmail.com`;
  const adminEmail = `admin_rbac_${Math.floor(Math.random() * 10000)}@gmail.com`;
  const password = 'Password123!';

  test('B1. Patient cannot access admin dashboard & redirects to login', async ({ signupPage, loginPage, page }) => {
    // Register & Login as Patient
    await signupPage.goto();
    await signupPage.register('Patient RBAC', patientEmail, password, 'user');
    
    await loginPage.goto();
    await loginPage.login(patientEmail, password, 'user');
    await expect(page).toHaveURL(/\/home/);

    // Attempt to navigate to admin routes
    await page.goto('/admin/dashboard');
    // AdminRoute redirects to /login if token role is not admin
    await expect(page).toHaveURL(/\/login/);
  });

  test('B2. Admin can access admin dashboard and manage lists', async ({ signupPage, loginPage, page }) => {
    // Register & Login as Admin
    await signupPage.goto();
    await signupPage.register('Admin RBAC', adminEmail, password, 'admin');
    
    await loginPage.goto();
    await loginPage.login(adminEmail, password, 'admin');
    await expect(page).toHaveURL(/\/admin\/dashboard/);

    // Verify access to admin doctor management page
    await page.goto('/admin/doctors');
    await expect(page).toHaveURL(/\/admin\/doctors/);

    // Verify access to admin medicine management page
    await page.goto('/admin/medicines');
    await expect(page).toHaveURL(/\/admin\/medicines/);
  });
});
