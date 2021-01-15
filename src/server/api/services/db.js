require('dotenv').config();
const { Client } = require('pg');

const CONFIG = {
  user: process.env.DB_LOCAL_USER,
  password: process.env.DB_LOCAL_PASSWORD,
  host: process.env.DB_LOCAL_HOST,
  port: Number(process.env.DB_LOCAL_PORT),
  database: process.env.DB_LOCAL_DATABASE,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
};

const db = new Client(CONFIG);
db.connect().catch((err) => console.log('Connect error:', err));

module.exports = {
  query: str => new Promise((resolve, reject) => {
    db.query(str)
      .then((res) => resolve(res))
      .catch((err) => {
        const obj = { ...err, query: str };
        reject(obj);
      });
  }),
  end: () => db.end(),
};
