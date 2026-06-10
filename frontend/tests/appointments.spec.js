import { test, expect } from './fixtures/customFixtures';

test.describe('Doctor Appointment Booking Tests', () => {
  const patientEmail = `patient_app_${Math.floor(Math.random() * 10000)}@gmail.com`;
  const password = 'Password123!';

  test.beforeEach(async ({ signupPage, loginPage, page }) => {
    await signupPage.goto();
    await signupPage.register('Patient Appointment', patientEmail, password, 'user');
    await loginPage.goto();
    await loginPage.login(patientEmail, password, 'user');
    await expect(page).toHaveURL(/\/home/);
  });

  test('C1. Patient can browse, filter specializations, and book an appointment', async ({ appointmentsPage, doctorProfilePage, page }) => {
    await appointmentsPage.goto();
    await expect(page).toHaveURL(/\/appointments/);

    // Verify doctors are present
    await expect(appointmentsPage.doctorCards.first()).toBeVisible();

    // Filter by specialization
    await appointmentsPage.filterSpecialization('Dermatologist');

    // Select the first visible doctor
    await appointmentsPage.selectFirstAvailableDoctor();
    await expect(page).toHaveURL(/\/appointments\//);

    // Select slot & book
    await doctorProfilePage.selectDateTab(1); // Pick next day to be safe
    await doctorProfilePage.selectFirstAvailableTimeSlot();
    await doctorProfilePage.bookAppointment();

    // Verification
    await expect(page.locator('.Toastify__toast-body')).toContainText(/booked successfully/i);

    // Verify it appears in profile history
    await page.goto('/profile');
    await expect(page.locator('.modern-app-card').first()).toBeVisible();
  });
});
