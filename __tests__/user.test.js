const request = require('supertest');
const baseUrl = 'https://gorest.co.in/public-api';
// require('dotenv').config();
const token = 'c52c7c49c036329823d6f31b63cdfa19f226b3ee3b458abe77321e4ed0866d75';  // Replace with your actual bearer token

if (!token) {
  throw new Error("ACCESS_TOKEN is not defined. Please set it in the environment variables.");
}

describe('CRUD User Operations', () => {
 let userId;
 it('should create a user', async () => {
   const res = await request(baseUrl)
     .post('/users')
     .set('Authorization', `Bearer ${token}`)
     .send({
       name: 'John Doe',
       gender: 'male',
       email: `john.doe${Date.now()}@example.com`,
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
       name: 'John Doe Updated',
     });
   expect(res.statusCode).toEqual(200);
   expect(res.body.data).toHaveProperty('name', 'John Doe Updated');
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
