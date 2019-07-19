import sequelize from '../../src/database';

module.exports = () => {
  const { connection } = sequelize;
  return Promise.all(
    Object.keys(connection.models).map(key => {
      return connection.models[key].destroy({ truncate: true, force: true });
    })
  );
};
