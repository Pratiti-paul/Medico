import { test, expect } from './fixtures/customFixtures';

test.describe('Profile Tests', () => {
  const patientEmail = `patient_prof_${Math.floor(Math.random() * 10000)}@gmail.com`;
  const password = 'Password123!';

  test.beforeEach(async ({ signupPage, loginPage, page }) => {
    await signupPage.goto();
    await signupPage.register('Patient Profile', patientEmail, password, 'user');
    await loginPage.goto();
    await loginPage.login(patientEmail, password, 'user');
    await expect(page).toHaveURL(/\/home/);
  });

  test('F1. View and edit profile details, check persistence on reload', async ({ profilePage, page }) => {
    await page.goto('/profile');
    await expect(page).toHaveURL(/\/profile/);

    // Check initial values
    await expect(profilePage.displayName).toHaveText('Patient Profile');
    await expect(profilePage.displayEmail).toHaveText(patientEmail);

    const updatedName = 'Patient Profile Updated';
    const updatedPhone = '9876543210';
    const updatedAddress = '123 Test Street, New York, NY';

    // Edit profile details
    await profilePage.editProfile({
      name: updatedName,
      phone: updatedPhone,
      address: updatedAddress
    });

    // Success toast notification
    await expect(page.locator('.Toastify__toast-body')).toContainText(/updated successfully/i);

    // Verify text displays updated
    await expect(profilePage.displayName).toHaveText(updatedName);
    await expect(profilePage.displayPhone).toHaveText(updatedPhone);
    await expect(profilePage.displayAddress).toHaveText(updatedAddress);

    // Reload the page
    await page.reload();

    // Verify text displays are still correct after reload
    await expect(profilePage.displayName).toHaveText(updatedName);
    await expect(profilePage.displayPhone).toHaveText(updatedPhone);
    await expect(profilePage.displayAddress).toHaveText(updatedAddress);
  });
});
