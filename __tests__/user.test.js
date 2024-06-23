require('dotenv').config(); // Assuming you're using dotenv
const baseUrl = process.env.BASE_URL;
const accessToken = process.env.ACCESS_TOKEN;
describe('User CRUD Operations', () => {
 let userId;
 // Create User
 it('should create a new user', async () => {
   const userData = {
     name: `John Doe_${Date.now()}`,
     email: `testuser_${Date.now()}@example.com`,
     gender: 'male',
     status: 'active',
   };
   const response = await request(baseUrl)
     .post('/users')
     .set('Authorization', `Bearer ${accessToken}`)
     .send(userData);
   expect(response.statusCode).toBe(201);
   expect(response.body).toHaveProperty('id');
   userId = response.body.id;
 });
 // Read User
 it('should get user details by ID', async () => {
   expect(userId).toBeTruthy(); // Ensure user is created before reading
   const response = await request(baseUrl)
     .get(`/users/${userId}`)
     .set('Authorization', `Bearer ${accessToken}`);
   expect(response.statusCode).toBe(200);
   expect(response.body.id).toBe(userId);
 });
 // Update User (with additional test for specific field)
 it('should update user details and verify specific field', async () => {
   expect(userId).toBeTruthy();
   const updatedData = {
     name: 'Jane Doe',
     status: 'inactive',
   };
   const response = await request(baseUrl)
     .put(`/users/${userId}`)
     .set('Authorization', `Bearer ${accessToken}`)
     .send(updatedData);
   expect(response.statusCode).toBe(200);
   expect(response.body.name).toBe(updatedData.name); // Verify specific field
 });
 // Delete User
 it('should delete the created user', async () => {
   expect(userId).toBeTruthy();
   const response = await request(baseUrl)
     .delete(`/users/${userId}`)
     .set('Authorization', `Bearer ${accessToken}`);
   expect(response.statusCode).toBe(204); // No Content on successful deletion
 });
 // Additional Test Scenario (Error Handling)
 it('should return 401 (Unauthorized) for invalid access token', async () => {
   const userData = {
     name: 'Test User',
     email: 'test@example.com',
     gender: 'male',
     status: 'active',
   };
   const response = await request(baseUrl)
     .post('/users')
     .set('Authorization', 'Bearer invalid_token') // Invalid token
     .send(userData);
   expect(response.statusCode).toBe(401); // Check for unauthorized error
 });
});
