const uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('plans', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          duration: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          price: {
            type: Sequelize.DECIMAL,
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
          },
        });
      });
  },

  down: queryInterface => {
    return queryInterface.dropTable('plans');
  },
};
