import { test, expect, type Locator, type Page } from '@playwright/test'; 


test('login, open dashboard, and scroll page', async ({ page }) => {
  test.setTimeout(60000);

  // Maximize browser window in Chromium (fallback-safe for headless/unsupported runs).
  try {
    const session = await page.context().newCDPSession(page);
    const { windowId } = await session.send('Browser.getWindowForTarget');
    await session.send('Browser.setWindowBounds', {
      windowId,
      bounds: { windowState: 'maximized' },
    });
  } catch {
    // Ignore when browser window bounds API is unavailable.
  }

  await page.goto('https://devapp.peopledesk.io/', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle(/PeopleDesk/);


  await page.getByRole('textbox', { name: /enter your id/i }).fill('peopledeskdemo@ibos.io');

  const passwordInput: Locator = page
    .getByRole('textbox', { name: /enter your password/i });
  await passwordInput.fill('peopledeskdemo@ibos');

  await page.getByRole('button', { name: /log in/i }).click();
  const dashboardText = page.getByText('Dashboard', { exact: true }).nth(1);
  await dashboardText.click({ force: true });
  

  // After Close, user should return to Service Book page.
  await page.getByRole('link', { name: /Supervisor/i }).click();
  await page.waitForTimeout(4000); 
  await page.getByRole('link', { name: /Management/i }).click();
  await page.waitForTimeout(4000);
  await page.getByRole('heading', { name: /Overview/i }).click();
  await page.waitForTimeout(4000);
  await page.getByRole('heading', { name: /Attendance & Leave/i }).click();
  await page.waitForTimeout(4000);
  await page.getByRole('heading', { name: /Employee Analytics/i }).click();
  await page.waitForTimeout(4000);
  await page.getByRole('heading', { name: /Compensation & Payroll Metrics/i }).click();
  await page.waitForTimeout(10000);
 

  await page.getByRole('link', { name: /Service Book/i }).click();
  await page.waitForTimeout(4000);

  const employeeRows: Locator = page.locator('tr.ant-table-row');
  await employeeRows.first().waitFor({ state: 'visible' });

  const totalEmployees: number = await employeeRows.count();
  const randomIndex: number = Math.floor(Math.random() * totalEmployees);
  const selectedRow: Locator = employeeRows.nth(randomIndex); 

   try {
    await selectedRow.locator('td').nth(3).click({ force: true });
  } catch {
    await selectedRow.click({ force: true });
    await page.waitForTimeout(4000); 
}
  await page.getByRole('button', { name: /Close/i }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('img', { name: /Profile/i }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('heading', { name: /Log Out/i }).click();

});
