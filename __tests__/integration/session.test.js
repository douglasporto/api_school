/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';
import truncate from '../utils/truncate';

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      email: 'test@brainmind.com.br',
      password: '123123',
    });
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: user.email,
        password: '123123',
      });

    expect(response.body).toHaveProperty('token');
  });
  it('Should not authenticate when not send email', async () => {
    await factory.create('User', {
      password: '123123',
    });
    const response = await request(app)
      .post('/auth/login')
      .send({
        password: '123123',
      });

    expect(response.status).toBe(400);
  });
  it('Should not authenticate when send email wrong', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'test',
        password: '123123',
      });

    expect(response.body.error).toBe('Endereço de e-mail inválido');
  });
  it('Should not authenticate when not send password', async () => {
    const user = await factory.create('User', {
      email: 'test@brainmind.com.br',
    });
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: user.email,
      });

    expect(response.status).toBe(400);
  });

  it('Should not authenticate when user not exist', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@brainmind.com.br',
        password: '123123',
      });

    expect(response.status).toBe(401);
  });

  it('Should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      email: 'test@brainmind.com.br',
      password: '123123',
    });

    const response = await request(app)
      .post('/auth/login')
      .send({
        email: user.email,
        password: '123456',
      });

    expect(response.status).toBe(401);
  });

  it('Should return jwt token when authenticated', async () => {
    const user = await factory.create('User', {
      email: 'test@brainmind.com.br',
      password: '123123',
    });

    const response = await request(app)
      .post('/auth/login')
      .send({
        email: user.email,
        password: '123123',
      });

    expect(response.body).toHaveProperty('token');
  });
});
