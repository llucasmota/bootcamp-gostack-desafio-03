import Students from '../models/Student';
import * as Yup from 'yup';

class StudentsController {
  async store(req, res) {
    const { name, email, weight, height } = req.body;

    const Schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });
    if (!(await Schema.isValid(req.body))) {
      return res.status(400).json({ error: { message: 'Validation fails' } });
    }

    const studentExist = await Students.findOne({ where: { email } });

    if (studentExist) {
      return res
        .status(400)
        .json({ error: { message: 'email já está em uso' } });
    }
    try {
      const student = await Students.create({ name, email, weight, height });
      return res.json(student);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status)
        .json({ error: { message: 'Algo deu errado' } });
    }
  }
}

export default new StudentsController();
