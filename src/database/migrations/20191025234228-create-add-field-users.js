module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
