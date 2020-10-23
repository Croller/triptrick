const db = require('../services/db');
// const auth = require('../auth');

const ExecutionController = () => {
  const table = (req, res) => {
    const {
      tbName,
      year = null,
      quarter = null,
      month = null,
    } = req.body;

    const param = Object.keys(req.body).map(key => (
      `${key} = ${req.body[key]}`
    ));

    let strQuery = '';
    if (year === null && quarter === null && month === null) {
      strQuery = `SELECT * FROM ${tbName} WHERE upload IN (SELECT max(upload) FROM ${tbName})`;
    } else {
      strQuery = `SELECT * FROM ${tbName} WHERE upload IN (SELECT max(upload) FROM ${tbName} WHERE ${param.slice(1, 3).join(' AND ')})`;
    }

    db.AsyncQueryDB(strQuery)
      .then((tb) => {
        db.AsyncQueryDB(`SELECT * FROM alias_col_${tbName}`)
          .then((alias) => {
            db.AsyncQueryDB(`SELECT year, quarter, month FROM ${tbName} GROUP BY year, quarter, month ORDER BY year, quarter, month`)
              .then((stats) => {
                res.json({
                  table: {
                    [tbName]: {
                      alias: alias.recordsets[0],
                      table: tb.recordsets[0],
                      stats: stats.recordsets[0],
                    },
                  },
                });
              })
              .catch(() => res.json({
                error: {
                  name: 'execution table stats',
                  code: 1,
                  text: 'no records',
                },
              }));
          })
          .catch(() => res.json({
            error: {
              name: 'execution table alias',
              code: 1,
              text: 'no records',
            },
          }));
      })
      .catch(() => res.json({
        error: {
          name: 'execution table',
          code: 1,
          text: 'no records',
        },
      }));
  };

  const dictionary = (req, res) => {
    const { tbName, dcName } = req.body;
    db.AsyncQueryDB(`SELECT * FROM dictionary_${dcName}_${tbName}`)
      .then((tb) => {
        res.json({
          [`${dcName}_${tbName}`]: tb.recordsets[0],
        });
      })
      .catch(() => res.json({
        error: {
          name: 'execution dictionary',
          code: 1,
          text: 'no records',
        },
      }));
  };

  return {
    table,
    dictionary,
  };
};

export default ExecutionController;
