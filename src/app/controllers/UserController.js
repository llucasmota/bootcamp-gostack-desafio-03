import User from '../models/User';
import * as Yup from 'yup';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email(),
      password: Yup.string()
        .required()
        .min(6),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: { message: 'Validation fails' } });
    }

    const data = req.body;
    const findUser = await User.findOne({ where: { email: req.body.email } });
    if (findUser) {
      return res.status(400).json({ error: { message: 'Cliente já existe' } });
    }
    const user = await User.create(data);
    return res.json(user);
  }
}

export default new UserController();
