import Sequelize, { Model } from 'sequelize';
import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';
import Plan from '../models/Plan';
import Student from '../models/Student';

class Subscription extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', async subscription => {
      const plan = await Plan.findByPk(subscription.plan_id);
      const student = await Student.findByPk(subscription.student_id);
      const price = plan.price * plan.duration;
      await Queue.add(SubscriptionMail.key, {
        subscription,
        student,
        plan,
        price,
      });
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

export default Subscription;
