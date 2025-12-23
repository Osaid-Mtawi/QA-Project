import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/products/ProductsPage';

test('F03 - brand', async ({ page }) => {
  const products = new ProductsPage(page);

  await products.filterByBrand('ForgeFlex Tools'); 

  const count = await products.countProducts();
  expect(count).toBeGreaterThan(0);
});
