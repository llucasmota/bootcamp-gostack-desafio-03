import User from '../models/User';

class UserController {
  async store(req, res) {
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
