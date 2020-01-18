import Sequelize, { Model } from 'sequelize';

class Checkin extends Model {
  static init() {
    super.init(
      {
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(model.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

export default Checkin;
