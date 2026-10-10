import {test, expect} from '@playwright/test';

test.describe('Dummy Json', ()=>{
  
  // Skip this entire block if credentials are missing or if you want to skip in CI
    test.skip(!process.env.API_USERNAME || !process.env.API_PASSWORD, 'Skipping: Missing API credentials');

    let userToken: string;

    test.beforeAll(async({request})=>{
     const response = await request.post('/auth/login', {
      data: { 
        username: process.env.API_USERNAME, 
        password: process.env.API_PASSWORD,
     },
    });
    const body = await response.json();
    userToken = body.accessToken;
    console.log(body);
    });

    test('Protected Endpoint Authorization via JWT', async({request}) => {
      const response = await request.get('/auth/me', {
      headers: { 'Authorization': `Bearer ${userToken}` },
    });
    expect(response.status()).toBe(200);
    expect(await response.json()).toHaveProperty('username', process.env.API_USERNAME);
    console.log(await response.json());
    });

});