const jwt = require('jsonwebtoken');
const db = require('./db');

const signature = 'test_secret';

module.exports = {
  generateToken: (user) => {
    const obj = {
      id: user.id,
      login: user.login,
      password: user.password,
    };
    const expiration = '6h';
    return jwt.sign(obj, signature, { expiresIn: expiration });
  },

  getToken: (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return jwt.verify(req.headers.authorization.split(' ')[1], signature);
    }
    return null;
  },

  verifyToken: async (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      const data = jwt.verify(req.headers.authorization.split(' ')[1], signature);
      if (data) {
        const { login, password } = data;
        const strQuery = `SELECT * FROM users WHERE login='${login}' AND password='${password}'`;
        const user = await db.AsyncQueryDB(strQuery);
        if (user.recordsets[0].length === 1) {
          return true;
        }
        return false;
      }
      return null;
    }
    return null;
  },
};
