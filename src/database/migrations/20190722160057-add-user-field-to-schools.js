module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('schools', 'user_id', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('schools', 'user_id');
  },
};
