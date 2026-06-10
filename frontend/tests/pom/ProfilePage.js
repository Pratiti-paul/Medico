export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.editBtn = page.getByTestId('edit-profile-btn');
    this.nameInput = page.getByTestId('profile-name-input');
    this.phoneInput = page.getByTestId('profile-phone-input');
    this.addressInput = page.getByTestId('profile-address-input');
    this.saveBtn = page.getByTestId('save-profile-btn');

    this.displayName = page.getByTestId('profile-name');
    this.displayEmail = page.getByTestId('profile-email');
    this.displayPhone = page.getByTestId('profile-phone');
    this.displayAddress = page.getByTestId('profile-address');
  }

  async editProfile({ name, phone, address }) {
    await this.editBtn.click();
    if (name !== undefined) await this.nameInput.fill(name);
    if (phone !== undefined) await this.phoneInput.fill(phone);
    if (address !== undefined) await this.addressInput.fill(address);
    await this.saveBtn.click();
  }
}
