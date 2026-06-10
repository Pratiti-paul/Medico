export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.upiCard = page.getByTestId('payment-method-upi');
    this.cardCard = page.getByTestId('payment-method-card');
    this.codCard = page.getByTestId('payment-method-cod');
    this.payNowBtn = page.getByTestId('pay-now-btn');
  }

  async selectPaymentMethod(method) {
    // method is 'UPI', 'Card', or 'COD'
    if (method === 'UPI') {
      await this.upiCard.click();
    } else if (method === 'Card') {
      await this.cardCard.click();
    } else if (method === 'COD') {
      await this.codCard.click();
    }
  }

  async placeOrder() {
    await this.payNowBtn.click();
  }
}
