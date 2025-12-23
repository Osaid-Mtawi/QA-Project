import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly url = '/auth/login';

  readonly email: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.email = page.locator(
      '#email, input[name="email"], input[formcontrolname="email"], input[type="email"], [data-test="email"]'
    ).first();

    this.password = page.locator(
      '#password, input[name="password"], input[formcontrolname="password"], input[type="password"], [data-test="password"]'
    ).first();

    this.loginBtn = page.getByRole('button', { name: /login/i });
  }

  async goto() {
    await this.page.goto(this.url);
    await expect(this.loginBtn).toBeVisible();
  }

  async login(email: string, password: string) {
    await expect(this.email).toBeVisible();
    await this.email.fill(email);

    await expect(this.password).toBeVisible();
    await this.password.fill(password);

    await this.loginBtn.click();
  }

  async expectSuccess() {

    await expect(this.page).not.toHaveURL(/\/auth\/login/i, { timeout: 10000 });
  }

  async expectFailure() {
    await expect(this.page).toHaveURL(/\/auth\/login/i);
  }
}
