export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.getByTestId('cart-item');
    this.checkoutBtn = page.getByTestId('checkout-btn');
  }

  async goto() {
    await this.page.goto('/cart');
  }

  async increaseQuantity(itemIndex = 0) {
    const item = this.cartItems.nth(itemIndex);
    const incBtn = item.getByTestId('increase-qty-btn');
    await incBtn.click();
    await this.page.waitForTimeout(500);
  }

  async decreaseQuantity(itemIndex = 0) {
    const item = this.cartItems.nth(itemIndex);
    const decBtn = item.getByTestId('decrease-qty-btn');
    await decBtn.click();
    await this.page.waitForTimeout(500);
  }

  async removeItem(itemIndex = 0) {
    const item = this.cartItems.nth(itemIndex);
    const removeBtn = item.getByTestId('remove-item-btn');
    await removeBtn.click();
    await this.page.waitForTimeout(500);
  }

  async getQuantityValue(itemIndex = 0) {
    const item = this.cartItems.nth(itemIndex);
    return await item.getByTestId('qty-val').innerText();
  }

  async checkout() {
    await this.checkoutBtn.click();
  }
}
