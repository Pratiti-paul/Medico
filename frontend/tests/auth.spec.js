import { test, expect } from './fixtures/customFixtures';

test.describe.serial('Authentication Tests', () => {
  const username = `TestUser_${Math.floor(Math.random() * 10000)}`;
  const email = `testuser_${Math.floor(Math.random() * 10000)}@gmail.com`;
  const password = 'Password123!';

  test('A1. User registration should succeed', async ({ signupPage, page }) => {
    await signupPage.goto();
    await signupPage.register(username, email, password, 'user');
    await expect(page).toHaveURL(/\/login/);
  });

  test('A2. User login with valid credentials should succeed', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(email, password, 'user');
    await expect(page).toHaveURL(/\/home/);
  });

  test('A3. User login with invalid credentials should fail', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(email, 'wrongpassword', 'user');
    await expect(page.locator('.Toastify__toast-body')).toContainText(/invalid/i);
  });

  test('A4. Logout should clear authentication and redirect to login page', async ({ loginPage, navbar, page }) => {
    await loginPage.goto();
    await loginPage.login(email, password, 'user');
    await expect(page).toHaveURL(/\/home/);

    await navbar.logout();
    await expect(page).toHaveURL(/\/login/);
  });

  test('A5. JWT-protected route access without token should redirect to login', async ({ page }) => {
    // Attempting to visit /home without token
    await page.goto('/home');
    await expect(page).toHaveURL(/\/login/);
  });
});
