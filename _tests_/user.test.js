const request = require('supertest');
const dotenv = require('dotenv');

dotenv.config();

const api = request(process.env.API_BASE_URL);
const token = process.env.API_TOKEN;

let userId;

describe('GoRest API v2 - CRUD User Operations', () => {
  const userPayload = {
    name: 'John Doe',
    email: john.doe.${Date.now()}@example.com,
    gender: 'male',
    status: 'active',
  };

  test('Create User', async () => {
    const response = await api
      .post('/users')
      .set('Authorization', Bearer ${token})
      .send(userPayload);

    expect(response.status).toBe(201);
    expect(response.body.data).toMatchObject(userPayload);

    userId = response.body.data.id;
  });

  test('Read User', async () => {
    const response = await api
      .get(/users/${userId})
      .set('Authorization', Bearer ${token});

    expect(response.status).toBe(200);
    expect(response.body.data).toMatchObject(userPayload);
  });

  test('Update User', async () => {
    const updatedPayload = {
      name: 'John Doe Updated',
    };

    const response = await api
      .put(/users/${userId})
      .set('Authorization', Bearer ${token})
      .send(updatedPayload);

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe(updatedPayload.name);
  });

  test('Delete User', async () => {
    const response = await api
      .delete(/users/${userId})
      .set('Authorization', Bearer ${token});

    expect(response.status).toBe(204);
  });

  test('Verify User Deletion', async () => {
    const response = await api
      .get(/users/${userId})
      .set('Authorization', Bearer ${token});

    expect(response.status).toBe(404);
  });
});
