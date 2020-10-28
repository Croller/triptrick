// const db = require('src/server/api/services/db');
const db = require('../services/db');
// const auth = require('../services/auth');

const KrtController = () => {
  const krt = async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM data_krt');
      res.json(result.rows);
    } catch (err) {
      res.json({
        error: {
          name: 'query errors',
          code: 1,
          text: JSON.stringify(err),
        },
      });
    }
  };

  const monitoring = async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM data_krt_confirm');
      res.json(result.rows);
    } catch (err) {
      res.json({
        error: {
          name: 'query errors',
          code: 1,
          text: JSON.stringify(err),
        },
      });
    }
  };

  return {
    krt,
    monitoring,
  };
};

export default KrtController;
