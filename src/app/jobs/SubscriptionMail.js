import moment from 'moment';
import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }
  async handle({ data }) {
    const { student, plan } = data;
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
        date_start: moment(start_date).format('MMM Do YYYY'),
        date_end: moment(finalDate).format('MMM Do YYYY'),
      },
    });
  }
}

export default new SubscriptionMail();
