const uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('subscriptions', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          student_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'students',
              key: 'id',
              onDelele: 'SET NULL',
            },
          },
          plan_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'plans',
              key: 'id',
              onDelele: 'SET NULL',
            },
          },
          start_date: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          end_date: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          price: {
            type: Sequelize.DECIMAL,
            allowNull: false,
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
    return queryInterface.dropTable('subscriptions');
  },
};
