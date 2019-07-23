/* eslint-disable no-undef */
import app from '../../src/app';

const request = require('supertest');

const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('School', () => {
  beforeEach(async () => {
    await truncate();
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

  it('should to return School List', async () => {
    const user = await factory.create('User', {});
    const response = await request(app)
      .get('/schools')
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
  });

  it('should not to return School List without Token', async () => {
    const response = await request(app).get('/schools');
    expect(response.status).toBe(401);
  });

  it('should to update the School', async () => {
    const user = await factory.create('User', { kind: 'adm' });
    const school = await factory.create('School');
    const response = await request(app)
      .put(`/schools/${school.id}`)
      .send({
        name: 'Teste nova de Escola',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.body.name).toBe('Teste nova de Escola');
  });

  it('should not to update the School with permission', async () => {
    const school = await factory.create('School');
    const user = await factory.create('User', {
      kind: 'teacher',
    });
    const response = await request(app)
      .put(`/schools/${school.id}`)
      .send({
        name: 'Teste nova de Escola',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(400);
  });
});
