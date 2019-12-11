module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('students', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('students');
  },
};
