'use strict';
const uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('help_orders', {
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
          question: {
            allowNull: false,
            type: Sequelize.STRING,
            allowNull: false,
          },
          answer: {
            allowNull: true,
            type: Sequelize.STRING,
          },
          answer_at: {
            type: Sequelize.DATE,
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
    return queryInterface.dropTable('help_orders');
  },
};
