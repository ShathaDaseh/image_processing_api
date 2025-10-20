import request from 'supertest';
import app from '../index';

describe('Images API', () => {
  it('should return 200 OK for GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should return JSON response', async () => {
    const response = await request(app).get('/');
    expect(response.headers['content-type']).toContain('application/json');
  });
});
