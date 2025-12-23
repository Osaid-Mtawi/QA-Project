import { test } from '@playwright/test';
import { ProductsPage } from '../../pages/products/ProductsPage';
import { ProductDetailsPage } from '../../pages/products/ProductDetailsPage';
import { CartPage } from '../../pages/cart/CartPage';

test.describe('Add to Cart', () => {
  test('C01 - add product to cart (via product details)', async ({ page }) => {
    const products = new ProductsPage(page);
    const details = new ProductDetailsPage(page);
    const cart = new CartPage(page);

    await products.gotoProducts();      
    await products.openFirstProduct();

    await details.addToCart();

    await cart.openFromHeader();
    await cart.expectHasItems();
  });
});
