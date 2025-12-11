import { test, expect } from '@playwright/test';

test.describe('ALM Platform E2E', () => {
  test('should display dashboard', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('should navigate to products', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Products');
    await expect(page.locator('h1')).toContainText('Products');
  });

  test('should create a new product', async ({ page }) => {
    await page.goto('/products');
    await page.click('text=Create Product');
    await page.fill('input[formControlName="name"]', 'Test Product');
    await page.fill('textarea[formControlName="description"]', 'Test Description');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/products');
  });
});
