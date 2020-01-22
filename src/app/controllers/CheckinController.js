import Checkin from '../models/Checkin';
import Subscription from '../models/Subscription';
import Student from '../models/Student';

class CheckinController {
  async store(req, res) {
    const { student_id } = req.body;
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res
        .status(401)
        .json({ error: { message: 'Cliente inexistente' } });
    }
    const subscription = await Subscription.findAll({
      where: {
        student_id: student_id,
      },
    });
    if (!subscription) {
      return res
        .status(401)
        .json({ error: { message: 'Matrícula inexistente' } });
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
}

export default new CheckinController();
