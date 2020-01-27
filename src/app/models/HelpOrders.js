import Sequelize, { Model } from 'sequelize';
const uuid = require('uuid/v4');

class HelpOrders extends Model {
  static init(sequelize) {
    super.init(
      {
        question: Sequelize.STRING,
        student_id: Sequelize.UUID,
      },
      {
        sequelize,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

export default HelpOrders;
