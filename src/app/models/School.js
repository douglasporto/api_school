import Sequelize, { Model } from 'sequelize';

class School extends Model {
  static init(sequelize) {
    super.init({ name: Sequelize.STRING }, { sequelize });

    return this;
  }

  static associate(models) {
    this.hasMany(models.School, { foreignKey: 'user_id', as: 'user' });
  }
}

export default School;
