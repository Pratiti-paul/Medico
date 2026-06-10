export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByTestId('login-email');
    this.passwordInput = page.getByTestId('login-password');
    this.patientRoleBtn = page.getByTestId('login-role-user');
    this.adminRoleBtn = page.getByTestId('login-role-admin');
    this.submitBtn = page.getByTestId('login-submit');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email, password, role = 'user') {
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
