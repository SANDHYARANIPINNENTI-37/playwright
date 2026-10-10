import {test, expect} from '@playwright/test';

test.describe('Dummy Json', ()=>{
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