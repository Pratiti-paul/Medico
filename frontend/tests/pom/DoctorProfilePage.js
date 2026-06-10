export class DoctorProfilePage {
  constructor(page) {
    this.page = page;
    this.dateTabs = page.getByTestId('date-tab');
    this.timeSlots = page.getByTestId('time-slot');
    this.bookBtn = page.getByTestId('book-appointment-btn');
  }

  async selectDateTab(index = 0) {
    await this.dateTabs.nth(index).click();
    await this.page.waitForTimeout(500);
  }

  async selectFirstAvailableTimeSlot() {
    const slots = this.timeSlots;
    const count = await slots.count();
    for (let i = 0; i < count; i++) {
      const slot = slots.nth(i);
      const isBooked = await slot.evaluate(node => node.classList.contains('booked'));
      if (!isBooked) {
        await slot.click();
        return;
      }
    }
    throw new Error('No available time slots found for this date.');
  }

  async bookAppointment() {
    await this.bookBtn.click();
  }
}
