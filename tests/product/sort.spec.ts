import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/products/ProductsPage';

test.describe('Sort', () => {
  test('SO1 - sort A-Z', async ({ page }) => {
    const products = new ProductsPage(page);

    await products.sortBy('Name (A - Z)'); 
    const count = await products.countProducts();
    expect(count).toBeGreaterThan(0);
  });

  test('SO2 - sort price high-low', async ({ page }) => {
    const products = new ProductsPage(page);

    await products.sortBy('Price (High - Low)'); 
    const count = await products.countProducts();
    expect(count).toBeGreaterThan(0);
  });
});
