import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  readonly cartLink: Locator;
  readonly cartRows: Locator;
  readonly emptyMsg: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartLink = page
      .locator('a[href*="cart"], a[href*="checkout"], a[href*="basket"], a:has-text("Cart"), a:has-text("Checkout")')
      .first();

    this.cartRows = page.locator('tbody tr, .cart-item, [data-test="cart-item"]');

    this.emptyMsg = page.locator('text=/empty|no items|cart is empty/i');
  }

  async openFromHeader() {
    await expect(this.cartLink).toBeVisible({ timeout: 10000 });
    await this.cartLink.click();
  }

  async expectHasItems() {
    await expect(this.cartRows.first()).toBeVisible({ timeout: 10000 });
  }

async removeFirstItem() {
  await this.expectHasItems();

  const row = this.cartRows.first();

const remove = row.locator('td').last().locator('button, a, [role="button"]').first();
const icon = row.locator('td').last().locator('svg, fa-icon').first();
await icon.click({ force: true });

  await expect(remove).toBeVisible({ timeout: 10000 });
  await remove.click({ force: true });
}


  async expectEmpty() {
    await expect(this.cartRows).toHaveCount(0, { timeout: 10000 }).catch(async () => {
      await expect(this.emptyMsg).toBeVisible({ timeout: 10000 });
    });
  }
}
