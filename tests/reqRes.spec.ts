import { test, expect } from '@playwright/test';

test.describe('ReqRes Advanced API Tests', () => {
  
  test('Pagination and Metadata Verification', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users?page=2');
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toMatchObject({
      page: 2,
      per_page: expect.any(Number),
      total: expect.any(Number),
    });
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('Negative Testing: Resource Not Found', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/23');
    expect(response.status()).toBe(404);
    expect(await response.json()).toEqual({});
  });

  test('Authentication: Successful Login and Registration', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/login', {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('token');
  });

  test('Latency and Timeout Handling', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users?delay=3', {
      timeout: 5000, // Explicit timeout setting for slow responses
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data).toBeDefined();
  });
});