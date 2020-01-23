import Checkin from '../models/Checkin';
import Subscription from '../models/Subscription';
import Student from '../models/Student';
import User from '../models/User';
import moment from 'moment';
import Sequelize, { Op } from 'sequelize';

class CheckinController {
  async store(req, res) {
    const id = req.params.id;
    const student = await Student.findByPk(id);

    if (!student) {
      return res
        .status(401)
        .json({ error: { message: 'Cliente inexistente' } });
    }
    const subscription = await Subscription.findAll({
      where: {
        student_id: student.id,
      },
    });
    if (!subscription) {
      return res
        .status(401)
        .json({ error: { message: 'Matrícula inexistente' } });
    }
    const today = moment().format();
    const sevenDaysBefore = moment()
      .subtract(7, 'days')
      .format();
    /**
     * O aluno não pode ter mais de 5 checkins na semana
     */
    const countCheckins = await Checkin.count({
      where: {
        student_id: student.id,
        created_at: {
          [Op.between]: [sevenDaysBefore, today],
        },
      },
    });
    if (countCheckins === 5) {
      return res.status(401).json({
        error: { message: 'Aluno possui mais de 5 checkins na semana' },
      });
    }
    try {
      const checkin = await Checkin.create({
        student_id: student.id,
      });
      return res.json({
        result: {
          message: `Checkin realizado para o estudante ${student.name}`,
        },
      });
    } catch (err) {
      return res.status(400).json({ error: { message: err } });
    }
  }
  async index(req, res) {
    const id = req.params.id;
    const student = await Student.findByPk(id);
    if (!student) {
      return res
        .status(401)
        .json({ result: { error: 'Pesquise por dados válidos' } });
    }
    console.log(student);
    const checkStudent = await Checkin.findAll({
      where: {
        student_id: student.id,
      },
    });
    if (!checkStudent) {
      return res
        .status(400)
        .json({ resultado: { message: 'O aluno não possui checkins ainda' } });
    }
    return res.json(checkStudent);
  }
}

export default new CheckinController();
