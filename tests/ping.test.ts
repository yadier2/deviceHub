import request from 'supertest';
import app from '../src/index';  

describe('GET /ping', () => {
  it('debería responder con "pong"', async () => {
    const response = await request(app).get('/ping');
    expect(response.status).toBe(200); 
    expect(response.text).toBe('pong'); 
  });
});
