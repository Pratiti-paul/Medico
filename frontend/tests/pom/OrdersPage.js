export class OrdersPage {
  constructor(page) {
    this.page = page;
    this.orderCards = page.getByTestId('order-card');
  }

  async goto() {
    await this.page.goto('/my-orders');
  }

  async getLatestOrderDetails() {
    const card = this.orderCards.first();
    const orderId = await card.getByTestId('order-id').innerText();
    const paymentMethod = await card.getByTestId('order-payment-method').innerText();
    const paymentStatus = await card.getByTestId('order-payment-status').innerText();
    return { orderId, paymentMethod, paymentStatus };
  }
}
