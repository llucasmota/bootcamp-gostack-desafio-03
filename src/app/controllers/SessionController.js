import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import configAuth from '../../config/auth';

class SessionController {
  async store(req, res) {
    const Schema = Yup.object().shape({
      email: Yup.string().email(),
      password: Yup.string()
        .required()
        .min(6),
    });
    if (!(await Schema.isValid(req.body))) {
      return res.status(400).json({ error: { message: 'Validation fails' } });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json({ error: { message: 'O usuário não existe' } });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: { message: 'Senha incorreta' } });
    }
    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, configAuth.secret, {
        expiresIn: configAuth.expiresIn,
      }),
    });
  }
}

export default new SessionController();
