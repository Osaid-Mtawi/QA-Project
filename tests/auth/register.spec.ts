import { test } from '@playwright/test';
import { RegisterPage } from '../../pages/auth/RegisterPage';
import { generateEmail, getPasswordFromEnv, saveCredentialsToEnv } from '../../utils/testUser';

test.describe('Register', () => {
  test('R01 - create user and save to .env', async ({ page }) => {
    const reg = new RegisterPage(page);
    await reg.goto();

    const email = generateEmail();
    const password = getPasswordFromEnv(); 

    await reg.register({
      firstName: 'osaid',
      lastName: 'QA',
      dob: '2005-09-11',
      street: 'qalailia St 10',
      postalCode: '00970',
      city: 'qalailia',
      state: 'qalailia',
      phone: '0507091444',
      email,
      password,
    });

    await reg.expectSuccess();

    saveCredentialsToEnv(email, password);
  });
});
