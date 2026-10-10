// import {test,expect, request} from '@playwright/test';
// import fs from 'fs';
// import path from 'path';

// const rawData = fs.readFileSync(path.join(process.cwd(), 'test-data/user.json'), 'utf-8');
// const userPayload = JSON.parse(rawData);

// test.describe('JSONPlaceholder API Test Suite',()=>{

//     test('Complete CRUD lifecycle', async({request}) => {

//         //POST
//         const postResponse = await request.post('/users',{
//             data: userPayload,
//         });
//         //expect(postResponse.status()).toBe(201);

//         const responseBody = await postResponse.json();
//         console.log(responseBody);
//         expect(responseBody).toHaveProperty('id');
//         const userId  = responseBody.id;
//         console.log(userId);
//         expect(responseBody.name).toBe(userPayload.name);
        
//         //GET
//         const getResponse = await request.get('/users/1');
//         expect(getResponse.status()).toBe(200);
//         const getBody= await getResponse.json();
//         expect(getBody).toHaveProperty('id',1);
//         console.log(getBody);

//         //PUT
//          const updatedPayload = { ...userPayload, name: 'Updated Name', email: 'updated@example.com' };
//     const putResponse = await request.put(`/users/1`, {
//       data: updatedPayload,
//     });
//     expect(putResponse.status()).toBe(200);
//     const putBody = await putResponse.json();
//     expect(putBody.name).toBe('Updated Name');
//     console.log(putBody);

//     // 4. DELETE - Remove resource
//     const deleteResponse = await request.delete('/users/1');
//     // JSONPlaceholder typically returns 200 OK on delete
//     expect([200, 204]).toContain(deleteResponse.status());
//     const statusCode = await deleteResponse.status();
//     console.log(statusCode);

//     });

//      test('Partial Update via PATCH', async ({ request }) => {
//       // Skips this test if running inside GitHub Actions
//       test.skip(!!process.env.CI, 'Not supported in CI environment');
//     const patchPayload = { email: 'patched.email@example.com' };
    
//     const patchResponse = await request.patch('/users/1', {
//       data: patchPayload,
//     });
    
//     expect(patchResponse.status()).toBe(200);
//     const patchBody = await patchResponse.json();
//     expect(patchBody.email).toBe('patched.email@example.com');
//     console.log(patchBody);
//   });

//   test('Filtered Data Using Query Parameters', async({request})=>{
//     const getResponse = await request.get('/posts',{
//       params:{
//         userId:1,
//       },
//     });
//    // expect(getResponse.status()).toBe(200);
//     const posts = await getResponse.json();
//     console.log(posts);
//     // Assert that the response is an array and every post belongs to userId 1

//     expect(Array.isArray(posts)).toBeTruthy();
//     expect(posts.length).toBeGreaterThan(0);
//     for (const post of posts) {
//       expect(post.userId).toBe(1);
//     }

//   });

//   test('Handling Non-Existent Resources (Negative Test)', async ({ request }) => {
//     const getResponse = await request.get('/users/99999');
//     expect(getResponse.status()).toBe(404);

//     const deleteResponse = await request.delete('/users/99999');
//     // Depending on the mock API setup, non-existent deletes can return 200/204 or 404. 
//     // JSONPlaceholder returns 200 even for non-existent IDs.
//     expect(deleteResponse.status()).toBeLessThan(500);
//   });


// });
 
