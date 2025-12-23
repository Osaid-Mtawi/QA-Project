import { test } from '@playwright/test';
import { ProductsPage } from '../../pages/products/ProductsPage';
import { ProductDetailsPage } from '../../pages/products/ProductDetailsPage';
import { CartPage } from '../../pages/cart/CartPage';

test.describe('Remove from Cart', () => {
  test('C02 - remove product from cart', async ({ page }) => {
    const products = new ProductsPage(page);
    const details = new ProductDetailsPage(page);
    const cart = new CartPage(page);

    await products.gotoProducts();
    await products.openFirstProduct();

    await details.addToCart();

    await cart.openFromHeader();
    await cart.expectHasItems();

    await cart.removeFirstItem();
    await cart.expectEmpty();
  });
});
