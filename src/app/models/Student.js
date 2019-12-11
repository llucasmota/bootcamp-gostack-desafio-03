import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        weight: Sequelize.DECIMAL,
        height: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Student;
