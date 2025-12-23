import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/products/ProductsPage';

test('F01 - price range', async ({ page }) => {
  const products = new ProductsPage(page);

  await products.filterByPriceRange(1, 200);

  const count = await products.countProducts();
  expect(count).toBeGreaterThan(0);
});
