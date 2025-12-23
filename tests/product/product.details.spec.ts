import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/products/ProductsPage';
import { ProductDetailsPage } from '../../pages/products/ProductDetailsPage';

test('P01 - product details basics', async ({ page }) => {
  const products = new ProductsPage(page);
  const details = new ProductDetailsPage(page);

await products.gotoProducts();
  await products.openFirstProduct();

  await expect(page.locator('h1, [data-test="product-name"]')).toBeVisible();
  await expect(page.locator('[data-test="product-price"], .price, :text("$")')).toBeVisible();
  await expect(details.addToCartBtn).toBeVisible();
});
﻿
