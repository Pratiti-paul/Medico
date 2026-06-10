export class AdminOrdersPage {
  constructor(page) {
    this.page = page;
    this.orderRows = page.getByTestId('admin-order-row');
  }

  async goto() {
    await this.page.goto('/admin/orders');
  }

  async markAsPaid(orderIndex = 0) {
    const row = this.orderRows.nth(orderIndex);
    const markBtn = row.getByTestId('mark-paid-btn');
    await markBtn.click();
    await this.page.waitForTimeout(800);
  }

  async deliverOrder(orderIndex = 0) {
    const row = this.orderRows.nth(orderIndex);
    const deliverBtn = row.getByTestId('deliver-order-btn');
    await deliverBtn.click();
    await this.page.waitForTimeout(800);
  }
}
