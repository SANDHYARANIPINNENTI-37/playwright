import { test, expect } from '@playwright/test';

test.describe('Restful-booker Lifecycle & Cookie Auth Tests', () => {
  let token: string;
  let bookingId: number;

  test.beforeAll(async ({ request }) => {
    const authRes = await request.post('https://restful-booker.herokuapp.com/auth', {
      data: { username: 'admin', password: 'password123' },
    });
    const body = await authRes.json();
    token = body.token;
  });

  test('Create Complex Nested Booking Payload', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
      data: {
        firstname: 'Jim',
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-06-01',
          checkout: '2026-06-10',
        },
        additionalneeds: 'Breakfast',
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    bookingId = body.bookingid;
    expect(body.booking).toHaveProperty('firstname', 'Jim');
  });

  test('Partial Modification (PATCH) with Token Cookie', async ({ request }) => {
    // Requires bookingId from previous test execution or static seed
    const targetId = bookingId || 1;
    const response = await request.patch(`https://restful-booker.herokuapp.com/booking/${targetId}`, {
      headers: {
        'Cookie': `token=${token}`,
      },
      data: {
        firstname: 'James',
        totalprice: 150,
      },
    });
    expect(response.status()).toBe(200);
    expect((await response.json()).totalprice).toBe(150);
  });

  test('State Cleanup & Deletion', async ({ request }) => {
    const targetId = bookingId || 1;
    const response = await request.delete(`https://restful-booker.herokuapp.com/booking/${targetId}`, {
      headers: {
        'Cookie': `token=${token}`,
      },
    });
    expect(response.status()).toBe(201); // Restful-booker returns 201 for successful deletion
  });
});