import { Page, Locator, expect } from '@playwright/test';

export type RegisterData = {
  firstName: string;
  lastName: string;
  dob: string;
  street: string;
  postalCode: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  password: string;
};

export class RegisterPage {
  readonly page: Page;
  readonly url = '/auth/register';

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly dob: Locator;
  readonly street: Locator;
  readonly postalCode: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly country: Locator;
  readonly phone: Locator;

  readonly email: Locator;
  readonly password: Locator;

  readonly registerBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstName = page.getByLabel(/first name/i);
    this.lastName = page.getByLabel(/last name/i);
    this.dob = page.getByLabel(/date of birth|dob|birth/i);

    this.street = page.getByLabel(/street/i);
    this.postalCode = page.getByLabel(/postal code|zip/i);
    this.city = page.getByLabel(/city/i);
    this.state = page.getByLabel(/state/i);

    this.country = page.locator('#country, [data-test="country"]');

    this.phone = page.getByLabel(/phone/i);

    this.email = page.locator(
      '#email, input[name="email"], input[formcontrolname="email"], input[type="email"], [data-test="email"]'
    ).first();

    this.password = page.locator(
      '#password, input[name="password"], input[formcontrolname="password"], input[type="password"], [data-test="password"]'
    ).first();

    this.registerBtn = page.getByRole('button', { name: /register/i });
  }

  async goto() {
    await this.page.goto(this.url);
    await expect(this.registerBtn).toBeVisible();
  }

  private async selectAnyCountry() {
    await this.country.waitFor({ state: 'visible' });
    const optionCount = await this.country.locator('option').count();
    if (optionCount < 2) throw new Error('Country options not loaded yet.');
    await this.country.selectOption({ index: 1 }); 
  }

  async register(data: RegisterData) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.dob.fill(data.dob);

    await this.street.fill(data.street);
    await this.postalCode.fill(data.postalCode);
    await this.city.fill(data.city);
    await this.state.fill(data.state);

    await this.selectAnyCountry();

    await this.phone.fill(data.phone);

    await expect(this.email).toBeVisible();
    await this.email.fill(data.email);

    await expect(this.password).toBeVisible();
    await this.password.fill(data.password);

    await this.registerBtn.click();
  }

  async expectSuccess() {
    await expect(this.page).toHaveURL(/\/auth\/login/i, { timeout: 10000 });
  }
}
