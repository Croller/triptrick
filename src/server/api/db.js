require('dotenv').config();
const sql = require('pg');

const param = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  server: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  // charset: 'utf8'
};

module.exports = {
  ConnectDB: () => {
    sql.connect(param, (err) => {
      if (err) {
        console.error('connect to database error: ', err);
      } else {
        console.error('connect to database success');
      }
    });
  },

  QueryDB: (str, callback) => {
    const sqlRequest = new sql.Request();
    sqlRequest.query(str, (err, data) => {
      if (err) return callback(err, null);
      return callback(null, data);
    });
  },

  AsyncQueryDB: str => new Promise((resolve, reject) => {
    const sqlRequest = new sql.Request();
    sqlRequest.query(str, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  }),

  ConnectClose: () => {
    sql.close();
  },
};
