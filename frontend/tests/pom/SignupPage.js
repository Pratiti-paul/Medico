export class SignupPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.getByTestId('signup-name');
    this.emailInput = page.getByTestId('signup-email');
    this.passwordInput = page.getByTestId('signup-password');
    this.patientRoleBtn = page.getByTestId('signup-role-user');
    this.adminRoleBtn = page.getByTestId('signup-role-admin');
    this.submitBtn = page.getByTestId('signup-submit');
  }

  async goto() {
    await this.page.goto('/');
  }

  async register(name, email, password, role = 'user') {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    if (role === 'admin') {
      await this.adminRoleBtn.click();
    } else {
      await this.patientRoleBtn.click();
    }
    await this.submitBtn.click();
  }
}
