const db = require('../services/db');
// const auth = require('../services/auth');

const CommonController = () => {
  const getTableByName = async (req, res) => {
    const { names } = req.body;
    try {
      const result = await Promise.all(names.map(async (name) => {
        const desc = await db.query(`SELECT * FROM ${name}`);
        return { [name]: desc.rows };
      }));
      res.json(result.reduce((obj, arr) => ({ ...obj, ...arr }), {}));
    } catch (err) {
      res.json({
        error: {
          name: 'Query error',
          code: 1,
          text: JSON.stringify(err),
        },
      });
    }
  };

  const getRowById = async (req, res) => {
    const { id, name } = req.body;
    try {
      const result = await db.query(`SELECT * FROM ${name} WHERE id=${id}`);
      res.json(result.rows);
    } catch (err) {
      res.json({
        error: {
          name: 'Query error',
          code: 1,
          text: JSON.stringify(err),
        },
      });
    }
  };

  return {
    getTableByName,
    getRowById,
  };
};

export default CommonController;
