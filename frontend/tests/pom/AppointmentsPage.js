export class AppointmentsPage {
  constructor(page) {
    this.page = page;
    this.doctorCards = page.getByTestId('doctor-card');
  }

  async goto() {
    await this.page.goto('/appointments');
  }

  async filterSpecialization(speciality) {
    // speciality is e.g. "General physician", "Gynecologist"
    const specFilter = this.page.getByTestId(`spec-filter-${speciality.replace(/\s+/g, '-')}`);
    await specFilter.click();
    await this.page.waitForTimeout(800);
  }

  async selectDoctorByName(name) {
    const card = this.doctorCards.filter({ hasText: name }).first();
    await card.click();
  }

  async selectFirstAvailableDoctor() {
    const card = this.doctorCards.first();
    await card.click();
  }
}
