import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  
  readonly productCards: Locator;
  readonly searchInput: Locator;
  readonly searchBtn: Locator;
  readonly sortSelect: Locator;
  readonly priceSlider: Locator;
  readonly priceHandles: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productCards = page.locator(
      'a[data-test^="product-"], a.card[href*="/product/"], a[href^="/product/"], .card a[href*="/product/"]'
    );

    this.searchInput = page
      .locator('input[type="search"], input[placeholder*="Search" i], input[name="search"]')
      .first();

    this.searchBtn = page.getByRole('button', { name: /^search$/i }).first();

    this.sortSelect = page.locator('[data-test="sort"], #sort, select[name*="sort" i], select').first();

    this.priceSlider = page.locator('ngx-slider, .ngx-slider, [class*="ngx-slider"]').first();
    this.priceHandles = this.priceSlider.locator('.ngx-slider-pointer');
  }

  async gotoProducts() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
    await this.waitForProductsLoaded();
  }

  private async waitForProductsLoaded() {
    await expect(this.productCards.first()).toBeVisible({ timeout: 25000 });
  }

  async countProducts() {
    await this.waitForProductsLoaded();
    return this.productCards.count();
  }

  async openFirstProduct() {
    await this.waitForProductsLoaded();
    await this.productCards.first().click({ timeout: 15000 });
    await expect(this.page).toHaveURL(/\/product\//i, { timeout: 15000 });
  }

  async search(term: string) {
    await this.gotoProducts();
    await expect(this.searchInput).toBeVisible({ timeout: 15000 });

    await this.searchInput.fill(term);
    await this.searchBtn.click();

    await this.page.waitForTimeout(700);
    await this.waitForProductsLoaded();
  }

  async sortBy(label: string) {
    await this.gotoProducts();
    await expect(this.sortSelect).toBeVisible({ timeout: 15000 });

    await this.sortSelect.selectOption({ label });

    await this.page.waitForTimeout(700);
    await this.waitForProductsLoaded();
  }

  
  async filterByPriceRange(min: number, max: number) {
    await this.gotoProducts();

    await expect(this.priceSlider).toBeVisible({ timeout: 15000 });
    await expect(this.priceHandles).toHaveCount(2, { timeout: 15000 });

    const box = await this.priceSlider.boundingBox();
    if (!box) throw new Error('Price slider not measurable');

    const rangeMin = 1, rangeMax = 200;
    const toX = (v: number) => {
      const c = Math.max(rangeMin, Math.min(rangeMax, v));
      return box.x + ((c - rangeMin) / (rangeMax - rangeMin)) * box.width;
    };
    const y = box.y + box.height / 2;

    const left = this.priceHandles.nth(0);
    const right = this.priceHandles.nth(1);

    await left.hover(); await this.page.mouse.down();
    await this.page.mouse.move(toX(min), y, { steps: 10 });
    await this.page.mouse.up();

    await right.hover(); await this.page.mouse.down();
    await this.page.mouse.move(toX(max), y, { steps: 10 });
    await this.page.mouse.up();

    await this.page.waitForTimeout(700);
    await this.waitForProductsLoaded();
  }

  async filterByCategory(labelText: string) {
    await this.gotoProducts();
    await this.checkByLabel(labelText);
  }

  async filterByBrand(labelText: string) {
    await this.gotoProducts();
    await this.checkByLabel(labelText);
  }

  private async checkByLabel(labelText: string) {
    const cb = this.page.locator('label', { hasText: labelText }).locator('input[type="checkbox"]').first();
    await expect(cb).toBeVisible({ timeout: 15000 });
    if (!(await cb.isChecked())) await cb.check({ force: true });
    await this.page.waitForTimeout(700);
    await this.waitForProductsLoaded();
  }
}
