/* eslint-disable no-undef */
import app from '../../src/app';

const request = require('supertest');
const factory = require('../factories');

const truncate = require('../utils/truncate');

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });
  it('should create the User', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Douglas',
        email: 'douglas@teste.com.br',
        password: '123123',
      });

    expect(response.status).toBe(200);
  });
  it('should not create the User without email', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Douglas',
        password: '123123',
      });
    expect(response.status).toBe(400);
  });

  it('should return user list', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });
    console.log(user.email);
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
  });

  it('should not return user list without token', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(401);
  });

  it('should update the user', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });
    console.log(user.email);
    const response = await request(app)
      .put(`/users`)
      .send({
        name: 'Douglas',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.body.name).toBe('Douglas');
  });
});
