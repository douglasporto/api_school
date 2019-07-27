import database from '../../src/database';

export default function truncate() {
  return Promise.all(
    Object.keys(database.connection.models).map(key => {
      return database.connection.models[key].destroy({
        truncate: true,
        force: true,
      });
    })
  );
}

// module.exports = () => {
//   const { connection } = sequelize;
//   return Promise.all(
//     Object.keys(connection.models).map(key => {
//       return connection.models[key].destroy({ truncate: true, force: true });
//     })
//   );
// };
