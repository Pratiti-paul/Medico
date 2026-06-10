import { test, expect } from './fixtures/customFixtures';

test.describe('Feedback Tests', () => {
  const patientEmail = `patient_feed_${Math.floor(Math.random() * 10000)}@gmail.com`;
  const password = 'Password123!';

  test.beforeEach(async ({ signupPage, loginPage, page }) => {
    await signupPage.goto();
    await signupPage.register('Patient Feedback', patientEmail, password, 'user');
    await loginPage.goto();
    await loginPage.login(patientEmail, password, 'user');
    await expect(page).toHaveURL(/\/home/);
  });

  test('G1. Submit feedback from About page and check success status', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveURL(/\/about/);

    const feedbackName = page.getByTestId('feedback-name');
    const feedbackEmail = page.getByTestId('feedback-email');
    const feedbackMessage = page.getByTestId('feedback-message');
    const feedbackSubmit = page.getByTestId('feedback-submit');
    const feedbackStatus = page.getByTestId('feedback-status');

    await feedbackName.fill('Test User Feedback');
    await feedbackEmail.fill('tester@example.com');
    await feedbackMessage.fill('This is an E2E test feedback message. The platform looks fantastic!');

    await feedbackSubmit.click();

    // Verify confirmation message
    await expect(feedbackStatus).toBeVisible();
    await expect(feedbackStatus).toContainText(/thank you for your feedback/i);
  });
});
