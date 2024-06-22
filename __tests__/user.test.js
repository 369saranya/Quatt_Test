const request = require('supertest');
require('dotenv').config();
const baseUrl = process.env.API_URL;
const token = process.env.BEARER_TOKEN;
if (!token) {
 throw new Error("BEARER_TOKEN is not defined. Please set it in the environment variables.");
}
describe('Create User API Tests', () => {
   it('should create a new user', async () => {
       try {
           const response = await axios.post(`${BASE_URL}/users`, userData, {
               headers: {
                   'Authorization': `Bearer ${TOKEN}`,
                   'Content-Type': 'application/json',
               },
           });
           // Assert status code
           expect(response.status).toBe(201);
           // Assert response data structure
           expect(response.data).toHaveProperty('data');
           expect(response.data.data).toHaveProperty('id');
           expect(response.data.data).toHaveProperty('name', userData.name);
           expect(response.data.data).toHaveProperty('email', userData.email);
           expect(response.data.data).toHaveProperty('gender', userData.gender);
           expect(response.data.data).toHaveProperty('status', userData.status);
       } catch (error) {
           // If request fails
           if (error.response) {
               console.error('Error response:', error.response.data);
           } else {
               console.error('Error:', error.message);
           }
           throw error;
       }
   });
});
describe('CRUD User Operations', () => {
 let userId;
 const uniqueSuffix = Date.now();
 const userName = `John Doe ${uniqueSuffix}`;
 const userEmail = `john.doe${uniqueSuffix}@example.com`;
 it('should create a user', async () => {
   const res = await request(baseUrl)
     .post('/users')
     .set('Authorization', `Bearer ${token}`)
     .send({
       name: userName,
       gender: 'male',
       email: userEmail,
       status: 'active',
     });
   expect(res.statusCode).toEqual(201);
   expect(res.body.data).toHaveProperty('id');
   userId = res.body.data.id;
 });
 it('should read a user', async () => {
   const res = await request(baseUrl)
     .get(`/users/${userId}`)
     .set('Authorization', `Bearer ${token}`);
   expect(res.statusCode).toEqual(200);
   expect(res.body.data).toHaveProperty('id', userId);
 });
 it('should update a user', async () => {
   const res = await request(baseUrl)
     .put(`/users/${userId}`)
     .set('Authorization', `Bearer ${token}`)
     .send({
       name: `${userName} Updated`,
     });
   expect(res.statusCode).toEqual(200);
   expect(res.body.data).toHaveProperty('name', `${userName} Updated`);
 });
 it('should delete a user', async () => {
   const res = await request(baseUrl)
     .delete(`/users/${userId}`)
     .set('Authorization', `Bearer ${token}`);
   expect(res.statusCode).toEqual(204);
 });
 it('should verify the user is deleted', async () => {
   const res = await request(baseUrl)
     .get(`/users/${userId}`)
     .set('Authorization', `Bearer ${token}`);
   expect(res.statusCode).toEqual(404);
 });
});
