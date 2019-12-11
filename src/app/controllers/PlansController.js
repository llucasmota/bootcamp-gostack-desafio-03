import Plans from '../models/Plan';

class PlansController {
  async index(req, res) {
    const plans = await Plans.findAll();
    if (!plans) {
      return res
        .status(400)
        .json({ error: { message: 'Não há planos para apresentação' } });
    }
    return res.json(plans);
  }

  async store(req, res) {
    const data = req.body;
    const planExist = await Plans.findOne({ where: { title: data.title } });
    if (planExist) {
      return res.status(400).json({ error: { message: 'o plano já existe' } });
    }
    const plan = await Plans.create(req.body);
    return res.json(plan);
  }

  async update(req, res) {
    const { title, duration, price } = req.body;
    const idPlan = req.params.id;
    const plan = await Plans.findByPk(idPlan);
    if (!plan) {
      return res.status(400).json({ error: { message: 'O plano não existe' } });
    }
    try {
      plan.update({ title, duration, price });
    } catch (err) {
      return res
        .status(err.status)
        .json({ error: { message: 'Algo deu errado' } });
    }
    return res.json(plan);
  }
}

export default new PlansController();
