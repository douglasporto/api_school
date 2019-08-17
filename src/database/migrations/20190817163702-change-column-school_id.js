module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'school_id');
    return queryInterface.addColumn('users', 'school_id', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: false,
      defaultValue: [],
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'school_id', {
      type: Sequelize.INTEGER,
      references: { model: 'schools', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },
};
