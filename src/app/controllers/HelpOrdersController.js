import HelpOrders from '../models/HelpOrders';
import Student from '../models/Student';
import moment from 'moment';

class HelpOrdersController {
  async store(req, res) {
    const { id } = req.params;
    const { question } = req.body;
    const student = await Student.findByPk(id);
    if (!student) {
      return res
        .status(401)
        .json({ error: { message: 'Favor informar dados válidos' } });
    }
    const dateValue = moment().format();
    const helpOrder = await HelpOrders.create({
      student_id: student.id,
      question,
      answer: null,
      answer_at: dateValue,
    });
    return res.json(helpOrder);
  }
  async index(req, res) {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) {
      return res
        .status(401)
        .json({ error: { message: 'Favor informar dados válidos' } });
    }
    const ordersByClient = await HelpOrders.findAll({
      where: {
        student_id: student.id,
      },
    });
    if (!ordersByClient) {
      return res.status(400).json({
        resultado: { message: 'Não há ordens para serem apresentadas' },
      });
    }
    return res.json(ordersByClient);
  }
  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    if (!data.answer) {
      return res.status(400).json({ error: { message: 'Informar resposta' } });
    }
    const ordersByClient = await HelpOrders.findOne({
      where: {
        id: id,
      },
    });
    if (!ordersByClient) {
      return res.status(400).json({
        resultado: { message: 'Não há ordens para serem apresentadas' },
      });
    }

    ordersByClient.answer = 'dasdasd';
    ordersByClient.answer_at = moment().format();
    console.log(ordersByClient);
    await ordersByClient.save();

    return res.json(ordersByClient);
  }
}

export default new HelpOrdersController();
