import { test, expect, type Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL || '';
const userId = process.env.MY_USER_ID || '';
const userPass = process.env.MY_PASSWORD || '';

async function openLoginPage(page: Page): Promise<void> {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle(/PeopleDesk/i);
}

async function submitLogin(page: Page, email: string, password: string): Promise<void> {
  const emailInput = page.getByRole('textbox', { name: /enter your id/i });
  const passwordInput = page.getByRole('textbox', { name: /enter your password/i });
  const loginButton = page.getByRole('button', { name: /log in/i });

  await emailInput.fill(email);
  await passwordInput.fill(password);
  await loginButton.click();
}

async function expectLoginFailed(page: Page): Promise<void> {
  await expect(page).toHaveURL(/devapp\.peopledesk\.io\/?$/);
  await expect(page.getByRole('button', { name: /log in/i })).toBeVisible();
}

test.describe('PeopleDesk Login - 10 test cases', () => {
  test('TC01: login with valid credentials', async ({ page }) => {
    await openLoginPage(page);
    await submitLogin(page, userId, userPass);
    await expect(page.getByText('Dashboard', { exact: true }).first()).toBeVisible({
      timeout: 20_000
    });
    await page.waitForTimeout(2000);
  });

  test('TC02: login with valid email and wrong password', async ({ page }) => {
    await openLoginPage(page);
    await submitLogin(page, userId, 'WrongPassword123!');
    await expectLoginFailed(page);

    await page.waitForTimeout(2000);
  });

  test('TC03: login with wrong email and valid password', async ({ page }) => {
    await openLoginPage(page);
    await submitLogin(page, 'wrong.user@ibos.io', userPass);
    await expectLoginFailed(page);
    await page.waitForTimeout(2000);
  });

  test('TC04: login with both email and password wrong', async ({ page }) => {
    await openLoginPage(page);
    await submitLogin(page, 'invalid.user@example.com', 'InvalidPass123!');
    await expectLoginFailed(page);
    await page.waitForTimeout(2000);
  });

  test('TC05: login with invalid email format', async ({ page }) => {
    await openLoginPage(page);
    await submitLogin(page, 'invalid-email-format', userPass);
    await expectLoginFailed(page);
    await page.waitForTimeout(2000);
  });

  test('TC06: login with empty email', async ({ page }) => {
    await openLoginPage(page);
    await submitLogin(page, '', userPass);
    await expectLoginFailed(page);
    await page.waitForTimeout(2000);
  });

  test('TC07: login with empty password', async ({ page }) => {
    await openLoginPage(page);
    await submitLogin(page, userId, '');
    await expectLoginFailed(page);
    await page.waitForTimeout(2000);
  });

  test('TC08: login with both email and password empty', async ({ page }) => {
    await openLoginPage(page);
    await submitLogin(page, '', '');
    await expectLoginFailed(page);
  });

  test('TC09: login with SQL-like input in email and password', async ({ page }) => {
    await openLoginPage(page);
    await submitLogin(page, "' OR '1'='1", "' OR '1'='1");
    await expectLoginFailed(page);
    await page.waitForTimeout(2000);
  });

  test('TC10: login with very long invalid credentials', async ({ page }) => {
    await openLoginPage(page);
    const longEmail = `${'a'.repeat(80)}@example.com`;
    const longPassword = 'X'.repeat(120);
    await submitLogin(page, longEmail, longPassword);
    await expectLoginFailed(page);
    await page.waitForTimeout(2000);
  });
});

test.describe('PeopleDesk Login - Edge cases', () => {
  test('TC11: email with leading and trailing spaces', async ({ page }) => {
    await openLoginPage(page);
    await submitLogin(page, `  ${userId}  `, userPass);
    await expectLoginFailed(page);
    await page.waitForTimeout(2000);
  });

  test('TC12: password with leading and trailing spaces', async ({ page }) => {
    await openLoginPage(page);
    await submitLogin(page, userId, `  ${userPass}  `);
    await expectLoginFailed(page);
    await page.waitForTimeout(2000);
  });

  test('TC13: email upper/lower case variation', async ({ page }) => {
    await openLoginPage(page);
    await submitLogin(page, userId.toUpperCase(), userPass);
    await expectLoginFailed(page);
    await page.waitForTimeout(2000);
  });

  test('TC14: unicode characters in credentials', async ({ page }) => {
    await openLoginPage(page);
    await submitLogin(page, 'user@ibos.io', 'password123');
    await expectLoginFailed(page);
  });

  test('TC15: special characters only in password', async ({ page }) => {
    await openLoginPage(page);
    await submitLogin(page, userId, '!@#$%^&*()_+{}[]|:;<>,.?/~`');
    await expectLoginFailed(page);
    await page.waitForTimeout(2000);
  });
});
