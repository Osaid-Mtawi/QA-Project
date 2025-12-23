import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;
  readonly addToCartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartBtn = page.locator('#btn-add-to-cart, [data-test="add-to-cart"]');
  }

  async addToCart() {
    await expect(this.addToCartBtn).toBeVisible();
    await this.addToCartBtn.click();
  }
}
