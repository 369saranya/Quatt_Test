const request = require('supertest');
const baseUrl = 'https://gorest.co.in/public-api';
const token = '89d085643ec80144bbc2d7a85506602bba1bf1ab74d3b7d5c51c82c8c83d94cb';  // Replace with your actual bearer token
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
