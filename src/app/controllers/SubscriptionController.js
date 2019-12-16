import moment from 'moment';
import Subscription from '../models/Subscription';
import Plans from '../models/Plan';
import Students from '../models/Student';
import Notification from '../schemas/Notification';

class SubscriptionController {
  async store(req, res) {
    const { plan_id, start_date, student_id } = req.body;
    /** verificando se estudante existe */
    const student = await Students.findByPk(student_id);
    if (!student) {
      res.status(400).json({ error: { message: 'Estudante não existe' } });
    }
    /**
     * Verificando se plano existe
     */
    const plan = await Plans.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json({ error: { message: 'Plano não existe' } });
    }
    /** calculando o preço do plano */
    const realPrice = plan.price * plan.duration;
    const finalDate = moment(start_date).add(plan.duration, 'month');
    try {
      const subscription = await Subscription.create({
        student_id,
        plan_id,
        start_date,
        price: realPrice,
        end_date: finalDate,
      });

      /**
       * Notificando aluno
       */
      await Notification.create({
        title: 'Nova matrícula',
        content: `Obrigado por confiar em nós, recebemos sua nova matrícula:
        Plano: ${plan.title}, Data de término: ${subscription.end_date},
        Valor total:${realPrice}`,
      });
      return res.status(200).json({
        price: subscription.price,
        start_date: subscription.start_date,
        end_date: subscription.end_date,
      });
    } catch (err) {
      return res
        .status(400)
        .json({ error: { message: 'Algo deu errado', error: err } });
    }
  }

  async index(req, res) {
    const subscriptions = await Subscription.findAll();
    if (!subscriptions) {
      res
        .status(400)
        .json({ error: { message: 'Não há matrículas para apresentar' } });
    }
    return res.json(subscriptions);
  }

  async update(req, res) {
    const { plan_id, start_date } = req.body;

    const subscription = await Subscription.findByPk(req.params.id);
    if (!subscription) {
      res.status(401).json({ error: { message: 'Registro inválido' } });
    }

    const plan = await Plans.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: { message: 'Plano inválido' } });
    }

    const notValidDate = moment(start_date).isBefore(moment());
    if (notValidDate) {
      return res.status(400).json({
        error: { message: 'A data não deve ser anterior ao dia atual' },
      });
    }
    const finalDate = moment(start_date).add(plan.duration, 'month');
    /** calculando o preço do plano */
    const realPrice = plan.price * plan.duration;
    try {
      await subscription.update({
        price: realPrice,
        start_date,
        plan_id,
        end_date: finalDate,
      });
      return res.json({ subscription });
    } catch (err) {
      return res
        .status(err.status)
        .json({ error: { message: 'Algo deu errado' } });
    }
  }
}

export default new SubscriptionController();
