import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/auth/LoginPage';

test.describe('Login', () => {
  test('L01 - login using .env user', async ({ page }) => {
    const email = process.env.TEST_EMAIL;
    const password = process.env.TEST_PASSWORD;

    expect(email, 'TEST_EMAIL is missing in .env (run register test first)').toBeTruthy();
    expect(password, 'TEST_PASSWORD is missing in .env').toBeTruthy();

    const login = new LoginPage(page);
    await login.goto();
    await login.login(email!, password!);

    await login.expectSuccess();
  });

  test('L02 - invalid password', async ({ page }) => {
    const email = process.env.TEST_EMAIL;
    expect(email, 'TEST_EMAIL is missing in .env (run register test first)').toBeTruthy();

    const login = new LoginPage(page);
    await login.goto();
    await login.login(email!, 'WrongPass123!');

    await login.expectFailure();
  });
});
