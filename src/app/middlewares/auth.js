import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res
      .status(401)
      .json({ error: { message: 'usuário não autorizado' } });
  }
  const [, token] = auth.split(' ');
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    /**
     * Adicionando id do usuário req
     */
    req.userId = decoded.id;
    console.log(decoded);
    return next();
  } catch (err) {
    return res.status(401).json({ error: { message: 'token inválido' } });
  }
};
