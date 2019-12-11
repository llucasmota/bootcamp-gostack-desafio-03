import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        /**
         * Referente a senha sem encriptação
         */
        price: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Plan;
