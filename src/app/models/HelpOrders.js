import Sequelize, { Model } from 'sequelize';
const uuid = require('uuid/v4');

class HelpOrders extends Model {
  static init(sequelize) {
    super.init(
      {
        question: Sequelize.TEXT,
        student_id: Sequelize.UUID,
        answer: Sequelize.TEXT,
        answer_at: Sequelize.DATE,
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
