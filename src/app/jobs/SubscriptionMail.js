import moment from 'moment';
import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }
  async handle({ data }) {
    const { student, plan, subscription, price } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      from: 'gympoint@nodemailer.com',
      to: student.email,
      /**
       * template a ser utilizado
       */
      template: 'subscription',
      /**dados que são utilizados na view, geralmente atributos */
      context: {
        student,
        plan,
        start_date: moment(subscription.start_date).format('MMM Do YYYY'),
        end_date: moment(subscription.end_date).format('MMM Do YYYY'),
        price,
      },
    });
  }
}

export default new SubscriptionMail();
