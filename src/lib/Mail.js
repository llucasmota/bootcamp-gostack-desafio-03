import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';
class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;
    /**
     * Passando parametros do transporter
     */
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
  }
  /***
   * recupera todos os parametros necessários e chama o transporter
   */
  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig,
      ...message,
    });
  }
}

export default new Mail();
