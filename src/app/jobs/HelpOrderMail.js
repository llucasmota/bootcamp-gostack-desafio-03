import Mail from '../../lib/Mail';
import moment from 'moment';

class HelpOrderMail {
  get key() {
    return 'HelpOrderMail';
  }
  async handle({ data }) {
    const { helpOrder } = data;

    await Mail.sendMail({
      from: 'gympoint@nodemailer.com',
      to: helpOrder.student.email,
      /**
       * template a ser utilizado
       */
      template: 'helpOrder',
      /**dados que são utilizados na view, geralmente atributos */
      context: {
        student: helpOrder.student,
        helpOrder,
        dateAnswer: moment(helpOrder.answer_at).format('LLL'),
      },
    });
  }
}
export default new HelpOrderMail();
