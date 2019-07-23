module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'school_id', {
      type: Sequelize.INTEGER,
      references: { model: 'schools', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'school_id');
  },
};
