import moment from 'moment';

const db = require('../services/db');
// const auth = require('../services/auth');

const error = {
  name: '',
  code: 0,
  text: '',
};

const CommonController = () => {
  const getTableByNames = async (req, res) => {
    try {
      const { names } = req.body.data;
      const result = await Promise.all(names.map(async (name) => {
        const desc = await db.query(`SELECT * FROM ${name}`);
        return { [name]: desc.rows };
      }));
      res.json(result.reduce((obj, arr) => ({ ...obj, ...arr }), {}));
    } catch (err) {
      error.name = 'Query error';
      error.text = JSON.stringify(err);
      res.json({ error });
    }
  };

  const getRecord = async (req, res) => {
    try {
      const { id, name } = req.body.data;
      const result = await db.query(`SELECT * FROM ${name} WHERE id=${id}`);
      res.json(result.rows);
    } catch (err) {
      error.name = 'Query error';
      error.text = JSON.stringify(err);
      res.json({ error });
    }
  };

  const createRecord = async (req, res) => {
    try {
      const { name, data } = req.body.data;
      const query = Object.keys(data).reduce((obj, key) => ({
        fields: [...obj.fields, key],
        values: [...obj.values, data[key]],
      }), { fields: [], values: [] });
      const record = await db.query(`INSERT INTO ${name} (${query.fields.join(', ')}) VALUES ('${query.values.join('\', \'')}') RETURNING *`);
      res.json(record.rows[0]);
    } catch (err) {
      error.name = 'Query error';
      error.text = JSON.stringify(err);
      res.json({ error });
    }
  };

  const updateRecord = async (req, res) => {
    try {
      const { name, data } = req.body.data;
      const { id } = { ...data };
      const check = await db.query(`SELECT * FROM ${name} WHERE id='${id}'`);
      if (check.rows.length === 1) {
        delete data.id;
        data.enter_at = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
        const query = Object.keys(data).map(key => (`${key}='${data[key]}'`));
        const upadateUser = await db.query(`UPDATE ${name} SET ${query.join(', ')} WHERE id='${id}' RETURNING *`);
        res.json(upadateUser.rows[0]);
      } else {
        error.name = 'Update record error';
        error.text = 'This record does not exist';
        res.json({ error });
      }
    } catch (err) {
      error.name = 'Query error';
      error.text = JSON.stringify(err);
      res.json({ error });
    }
  };

  return {
    getTableByNames,
    getRecord,
    createRecord,
    updateRecord,
  };
};

export default CommonController;
