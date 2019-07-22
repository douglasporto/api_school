import Sequelize, { Model } from 'sequelize';

class School extends Model {
  static init(sequelize) {
    super.init({ name: Sequelize.STRING }, { sequelize });

    return this;
  }
}

export default School;
