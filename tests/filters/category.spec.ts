import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/products/ProductsPage';

test('F02 - category', async ({ page }) => {
  const products = new ProductsPage(page);

  await products.filterByCategory('Pliers'); 

  const count = await products.countProducts();
  expect(count).toBeGreaterThan(0);
});
