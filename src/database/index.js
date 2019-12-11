import Sequelize from 'sequelize';
import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import databaseConfig from '../config/database';
import Subscription from '../app/models/Subscription';

const models = [User, Student, Plan, Subscription];

class Database {
  constructor() {
    this.init();
  }

  /**
   * Geranco conexão
   */
  init() {
    this.connection = new Sequelize(databaseConfig);
    /**
     * this.connection é o "sequelize" esperado pelo Model
     */
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
