export class AdminMedicinesPage {
  constructor(page) {
    this.page = page;
    this.medicineRows = page.getByTestId('admin-med-row');
    this.priceInput = page.getByTestId('med-form-price');
    this.stockInput = page.getByTestId('med-form-stock');
    this.submitBtn = page.getByTestId('med-form-submit');
  }

  async goto() {
    await this.page.goto('/admin/medicines');
  }

  async editMedicineInventory(index = 0, { price, stock }) {
    const row = this.medicineRows.nth(index);
    await row.getByTestId('edit-med-btn').click();
    await this.page.waitForTimeout(500);
    if (price !== undefined) await this.priceInput.fill(price.toString());
    if (stock !== undefined) await this.stockInput.fill(stock.toString());
    await this.submitBtn.click();
    await this.page.waitForTimeout(800);
  }

  async editMedicineInventoryByName(name, { price, stock }) {
    const row = this.medicineRows.filter({ hasText: name }).first();
    await row.getByTestId('edit-med-btn').click();
    await this.page.waitForTimeout(500);
    if (price !== undefined) await this.priceInput.fill(price.toString());
    if (stock !== undefined) await this.stockInput.fill(stock.toString());
    await this.submitBtn.click();
    await this.page.waitForTimeout(800);
  }
}
