import { test, expect } from '@playwright/test';

test('Checkout', async ({ page }) => {
  await page.goto('/automationpracticesite1.html');
    const products = page.getByText('Products', {exact:true}).first();
    await products.click();
   // const header12 = page.getByRole('heading',{name:'Leather Sneakers'}).filter({ hasText: 'Add to cart' });
   const header12 =page.locator('.p-6',{hasText:'Leather Sneakers'}).getByRole('button', {name:'Add to cart'});
    await header12.click();
    const toast = page.getByText("Leather Sneakers added to cart!");
    await expect(toast).toBeVisible();

});

test('Ids and selectors', async ({ page }) => {
  await page.goto('/automationpracticesite1.html');
    const products = page.getByText('Products', {exact:true}).first();
    await products.click();
   // const header12 = page.getByRole('heading',{name:'Leather Sneakers'}).filter({ hasText: 'Add to cart' });
   const header12 =page.locator('.p-6',{hasText:'Leather Sneakers'}).getByRole('button', {name:'Add to cart'});
    await header12.click();
    const toast = page.getByText("Leather Sneakers added to cart!");
    await expect(toast).toBeVisible();

});

test('Login', async ({ page }) => {
  await page.goto('/automationpracticesite1.html');
  await expect(page).toHaveTitle('Automation Practice | Full Practice Website for Testing');

  // const login1 = page.getByText('Login', {exact:true}).first();
  // await login1.click();
 
  //const login2 = page.locator('span').filter({hasText:'Login'});
    const login2 = page.locator('span').getByText('Login', {exact:true});
        const login3 = page.getByRole('button', {name:'Try Login (admin / admin)'});
        const login4 = page.getByRole('button', {name:'Login'});


  //await login2.click();
  await login3.click();

  const header1 = page.getByRole('heading',{name:'Login to your account'});
  await expect(header1).toBeVisible();

  const username= page.locator('#login-username');
  const pwd = page.locator('#login-password');
  await username.fill('admin2');
  await pwd.fill('admin2');
  await login4.click();

  const err = page.locator('#login-message');
  await expect(err).toContainText('Invalid credentials. Use admin / admin');



  
});

//-----------------------

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
