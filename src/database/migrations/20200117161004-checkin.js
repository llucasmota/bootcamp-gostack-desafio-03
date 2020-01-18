'use strict';
const uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('checkin', {
          student_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'students',
              key: 'id',
              onDelele: 'SET NULL',
            },
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
    return queryInterface.dropTable('checkin');
  },
};
