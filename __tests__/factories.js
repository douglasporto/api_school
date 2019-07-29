import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import School from '../src/app/models/School';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  kind: faker.random.arrayElement(['adm', 'student', 'teacher']),
});

factory.define('School', School, {
  name: faker.name.findName(),
});
export default factory;
