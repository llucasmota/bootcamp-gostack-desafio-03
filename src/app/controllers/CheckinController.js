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
    const checkin = await Checkin.create({
      student_id,
    });
  }
}

export default new CheckinController();
