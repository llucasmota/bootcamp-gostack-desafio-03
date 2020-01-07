import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';

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
    this.configureTemplates();
  }
  configureTemplates() {
    /** recuperando o caminho que será utilizado */
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');
    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: resolve(viewPath, 'layouts', 'default'),
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
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
