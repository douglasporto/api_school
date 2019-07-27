/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';
import truncate from '../utils/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });
  it('Should create the User', async () => {
    const user = await factory.attrs('User');
    const response = await request(app)
      .post('/auth/signup')
      .send(user);

    expect(response.status).toBe(200);
  });
  it('Should not create when already user with email', async () => {
    await factory.create('User', {
      email: 'test@brainmind.com.br',
    });
    const user = await factory.attrs('User', {
      email: 'test@brainmind.com.br',
    });
    const response = await request(app)
      .post('/auth/signup')
      .send(user);

    expect(response.status).toBe(422);
  });
  it('Should not create the User without email', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({
        name: 'Douglas',
        password: '123123',
      });
    expect(response.status).toBe(400);
  });

  it('Should return user list', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });

    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
  });

  it('Should not return user list without token', async () => {
    const response = await request(app).get('/users');
    expect(response.body.error).toBe('Token não enviado');
  });

  it('Should not return user list with token invalid', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer dshjfgshfgshjdgfjsgdfjsgj`);
    expect(response.body.error).toBe('Token inválido');
  });

  it('Should update the user', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });

    const response = await request(app)
      .put(`/users`)
      .send({
        name: 'Douglas',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.body.name).toBe('Douglas');
  });

  it('Should not update with user already exist', async () => {
    const user = await factory.create('User');
    const user2 = await factory.create('User', {
      email: 'test@brainmind.com.br',
    });

    const response = await request(app)
      .put(`/users`)
      .send({
        name: 'Douglas',
        email: user2.email,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(422);
  });
  it('Should not update the user when send oldPassword but not password', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .put(`/users`)
      .send({
        oldPassword: '123456',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.body.error).toBe('Você deve digitar a senha antiga');
  });

  it('Should not update the user when not confirm the password', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .put(`/users`)
      .send({
        oldPassword: '123456',
        password: '654321',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.body.error).toBe('Você deve confirmar a senha');
  });

  it('Should not update the user when send wrong oldPassword', async () => {
    const user = await factory.create('User', {
      password: 'testpassword',
    });

    const response = await request(app)
      .put(`/users`)
      .send({
        oldPassword: '123456',
        password: '654321',
        confirmPassword: '654321',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.body.error).toBe('Senha antiga incorreta');
  });
});
