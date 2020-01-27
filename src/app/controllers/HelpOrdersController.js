import HelpOrders from '../models/HelpOrders';
import Student from '../models/Student';

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
    const helpOrder = await HelpOrders.create({
      student_id: student.id,
      question,
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
}

export default new HelpOrdersController();
