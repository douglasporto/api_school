import User from '../src/app/models/User';

const faker = require('faker');
const { factory } = require('factory-girl');

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  kind: faker.random.arrayElement(['adm', 'student', 'teacher']),
});
module.exports = factory;
