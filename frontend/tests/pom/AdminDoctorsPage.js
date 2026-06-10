export class AdminDoctorsPage {
  constructor(page) {
    this.page = page;
    this.doctorRows = page.getByTestId('admin-doctor-row');
  }

  async goto() {
    await this.page.goto('/admin/doctors');
  }

  async toggleAvailability(doctorIndex = 0) {
    const row = this.doctorRows.nth(doctorIndex);
    const toggle = row.getByTestId('doctor-availability-toggle');
    await toggle.click();
    await this.page.waitForTimeout(600);
  }

  async toggleAvailabilityByName(name) {
    const row = this.doctorRows.filter({ hasText: name }).first();
    const toggle = row.getByTestId('doctor-availability-toggle');
    await toggle.click();
    await this.page.waitForTimeout(600);
  }
}
