import request from 'supertest';
import app from '../app';

describe('Express Backend API Health & Auth Routes', () => {
  it('GET /health should return status UP (200 OK)', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'UP');
    expect(res.body).toHaveProperty('service', 'EcoVision Express Backend API');
  });

  it('POST /api/v1/auth/login should reject invalid credentials (401 Unauthorized)', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'invalid@ecovision.ai',
        password: 'WrongPassword123!',
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('success', false);
  });
});
