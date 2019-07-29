/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';
import truncate from '../utils/truncate';

describe('School', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should to create School', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .post('/schools')
      .send({
        name: 'Teste de Escola',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.body).toHaveProperty('name');
  });

  it('Should not create when to send without name', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .post('/schools')
      .send()
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.body.error).toBe('O nome é obrigatório');
  });

  it('Should to return School List', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .get('/schools')
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('Should not to return School List without Token', async () => {
    const response = await request(app).get('/schools');
    expect(response.status).toBe(401);
  });

  it('Should to update the School', async () => {
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

  it('Should not to update the School when the school not exist', async () => {
    const user = await factory.create('User', { kind: 'adm' });
    await factory.create('School');
    const response = await request(app)
      .put(`/schools/50`)
      .send({
        name: 'Teste nova de Escola',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.body.error).toBe('Escola não encontrada para alterar');
  });

  it('Should not to update the School with permission', async () => {
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
