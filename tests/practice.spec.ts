import { test, expect } from '@playwright/test';
test('has title', async ({ page }) => {
  await page.goto('https://devapp.peopledesk.io/');
  await expect(page).toHaveTitle(/PeopleDesk/);
  await page.getByRole("textbox", { name: "Enter your id" }).fill('10001');
  await page.getByRole("textbox", { name: "Enter your password" }).fill('123456');
  await page.getByRole("button", { name: "Log In" }).click();
  await page.getByRole("button", { name: "" }).click();
  await page.pause(); 
});
