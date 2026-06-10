export class MedicinesPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByTestId('medicine-search-input');
    this.searchBtn = page.getByTestId('medicine-search-btn');
    this.cards = page.getByTestId('medicine-card');
    this.prevPageBtn = page.getByTestId('prev-page-btn');
    this.nextPageBtn = page.getByTestId('next-page-btn');
  }

  async goto() {
    await this.page.goto('/medicines');
  }

  async search(query) {
    await this.searchInput.fill(query);
    await this.searchBtn.click();
    // Wait for network idle or debounce timeout (500ms)
    await this.page.waitForTimeout(800);
  }

  async selectCategory(categoryName) {
    // categoryName is e.g. "FEVER & COLD", "SUPPLEMENTS", "ALL"
    const catBtn = this.page.getByTestId(`medicine-category-btn-${categoryName.replace(/\s+/g, '-')}`);
    await catBtn.click();
    await this.page.waitForTimeout(800);
  }

  async addFirstAvailableToCart() {
    const card = this.cards.first();
    const addBtn = card.getByTestId('add-to-cart-btn');
    await addBtn.click();
  }
}
