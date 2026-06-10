export class Navbar {
  constructor(page) {
    this.page = page;
    this.logo = page.getByTestId('nav-logo');
    this.homeLink = page.getByTestId('nav-home');
    this.medicinesLink = page.getByTestId('nav-medicines');
    this.appointmentsLink = page.getByTestId('nav-appointments');
    this.aboutLink = page.getByTestId('nav-about');
    this.cartLink = page.getByTestId('nav-cart');
    this.accountTrigger = page.getByTestId('account-trigger');
    this.profileLink = page.getByTestId('nav-profile');
    this.ordersLink = page.getByTestId('nav-orders');
    this.logoutLink = page.getByTestId('nav-logout');
  }

  async logout() {
    await this.accountTrigger.click();
    await this.logoutLink.click();
  }

  async navigateToProfile() {
    await this.accountTrigger.click();
    await this.profileLink.click();
  }

  async navigateToOrders() {
    await this.accountTrigger.click();
    await this.ordersLink.click();
  }
}
