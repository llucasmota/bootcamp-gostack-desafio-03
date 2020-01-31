import * as Yup from 'yup';
import HelpOrders from '../models/HelpOrders';
import Student from '../models/Student';
import moment from 'moment';
import Queue from '../../lib/Queue';
import HelpOrderMail from '../jobs/HelpOrderMail';

class HelpOrdersController {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: { message: 'Validation fails' } });
    }

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
    const ordersByClient = await HelpOrders.findAllll({
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
      include: [
        {
          model: Student,
          as: 'student',
        },
      ],
    });
    if (!ordersByClient) {
      return res.status(400).json({
        resultado: { message: 'Não há ordens para serem apresentadas' },
      });
    }

    ordersByClient.answer = data.answer;
    ordersByClient.answer_at = moment().format();
    await ordersByClient.save();

    await Queue.add(HelpOrderMail.key, {
      helpOrder: ordersByClient,
    });

    return res.json({
      name: ordersByClient.student.name,
      question: ordersByClient.question,
      dateAnswer: ordersByClient.answer_at,
      answer: ordersByClient.answer,
    });
  }
}

export default new HelpOrdersController();
