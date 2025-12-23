import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/products/ProductsPage';

test('S01 - search', async ({ page }) => {
  const products = new ProductsPage(page);

  await products.search('Hammer'); 
  const count = await products.countProducts();
  expect(count).toBeGreaterThan(0);
});
