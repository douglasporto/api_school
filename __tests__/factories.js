import User from '../src/app/models/User';
import School from '../src/app/models/School';

const faker = require('faker');
const { factory } = require('factory-girl');

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  kind: faker.random.arrayElement(['adm', 'student', 'teacher']),
});

factory.define('School', School, {
  name: faker.name.findName(),
});
module.exports = factory;
