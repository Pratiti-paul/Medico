export class AdminDashboardPage {
  constructor(page) {
    this.page = page;
    this.feedbackItems = page.getByTestId('admin-feedback-item');
  }

  async goto() {
    await this.page.goto('/admin/dashboard');
  }
}
