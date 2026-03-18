import { test, expect, type Locator, type Page } from '@playwright/test'; 
import { only } from 'node:test';


test('login, open dashboard, and scroll page', async ({ page }) => {
  test.setTimeout(60000);

  const userId = process.env.MY_USER_ID || '';
  const userPass = process.env.MY_PASSWORD || '';

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


  await page.getByRole('textbox', { name: /enter your id/i }).fill(userId);

  const passwordInput: Locator = page
    .getByRole('textbox', { name: /enter your password/i });
  await passwordInput.fill(userPass);

  await page.getByRole('button', { name: /log in/i }).click();
  await page.waitForTimeout(4000);
  const AssetText = page.getByText('Asset Management', { exact: true }).nth(1);
  await AssetText.click({ force: true });
  await page.waitForTimeout(4000);

  await page.getByText('Asset Registration').nth(0).click();
  await page.waitForTimeout(4000);
  
  await page.getByRole('textbox', { name: /search/i }).click();
  await page.waitForTimeout(4000);

   const performSearch = async (page: any, searchInput: string) => {
    const inputBox = page.getByRole('textbox', { name: 'search' });
    await inputBox.fill(''); // clear previous value
    await inputBox.fill(searchInput);
    await inputBox.press('Enter');
    await page.waitForTimeout(2000);
  };

  await performSearch(page, 'Laptop');
  await performSearch(page, 'Monitor');
  await performSearch(page, 'Item');
  await performSearch(page, '');
  await performSearch(page, 'x8jjjjj'); 
  await performSearch(page, '12345');
  await performSearch(page, 'NonExistentAsset123');

  await page.getByRole('button', { name: /Edit/i }).click();
  await page.waitForTimeout(4000);

});

