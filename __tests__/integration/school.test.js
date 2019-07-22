/* eslint-disable no-undef */
import app from '../../src/app';

const request = require('supertest');

const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('School', () => {
  beforeEach(async () => {
    await truncate();
  });
  it('should to return School List', async () => {
    const user = await factory.create('User', {});
    const response = await request(app)
      .get('/schools')
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
  });

  it('should to create School', async () => {
    const user = await factory.create('User', {});
    const response = await request(app)
      .post('/schools')
      .send({
        name: 'Teste de Escola',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
  });
});
