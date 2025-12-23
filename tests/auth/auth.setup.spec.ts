import { test } from '@playwright/test';
import { LoginPage } from '../../pages/auth/LoginPage';

test.setTimeout(60000);

test('auth setup - login once and save state', async ({ page }) => {
  const email = process.env.TEST_EMAIL!;
  const password = process.env.TEST_PASSWORD!;

  const login = new LoginPage(page);
  await login.goto();
  await login.login(email, password);
  await login.expectSuccess();

  await page.context().storageState({ path: 'storageState.json' });
});
