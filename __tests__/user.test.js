const request = require('supertest');
require('dotenv').config();
const baseUrl = process.env.BASE_URL;
const token = process.env.ACCESS_TOKEN;
if (!token) {
 throw new Error("BEARER_TOKEN is not defined. Please set it in the environment variables.");
}
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
