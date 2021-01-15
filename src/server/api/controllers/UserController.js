import moment from 'moment';

const db = require('../services/db');
const auth = require('../services/auth');

const UserController = () => {
  const signin = (req, res) => {
    const {
      login,
      password,
    } = req.body;
    const strQuery = `SELECT * FROM users WHERE login='${login}' AND password='${password}'`;
    db.AsyncQueryDB(strQuery)
      .then((us) => {
        if (us.recordsets[0].length > 0) {
          const user = us.recordsets[0][0];
          const token = auth.generateToken(us.recordsets[0][0]);
          db.AsyncQueryDB('SELECT * FROM alias_col_users')
            .then((alias) => {
              db.AsyncQueryDB('SELECT * FROM roles')
                .then((roles) => {
                  db.AsyncQueryDB('SELECT * FROM position')
                    .then((position) => {
                      db.AsyncQueryDB('SELECT * FROM department')
                        .then((department) => {
                          db.AsyncQueryDB('SELECT * FROM organization')
                            .then((organization) => {
                              db.AsyncQueryDB(`UPDATE users SET last_login='${moment().format('YYYY-MM-DDTHH:mm:ss.SSS')}' WHERE login='${login}' AND password='${password}'`);
                              res.json({
                                alias: alias.recordsets[0],
                                token,
                                info: user,
                                dictionary: {
                                  roles: roles.recordsets[0],
                                  position: position.recordsets[0],
                                  department: department.recordsets[0],
                                  organization: organization.recordsets[0],
                                },
                                error: null,
                              });
                            })
                            .catch(() => res.json({
                              error: {
                                name: 'execution roles alias',
                                code: 1,
                                text: 'no records',
                              },
                            }));
                        })
                        .catch(() => res.json({
                          error: {
                            name: 'execution roles alias',
                            code: 1,
                            text: 'no records',
                          },
                        }));
                    })
                    .catch(() => res.json({
                      error: {
                        name: 'execution roles alias',
                        code: 1,
                        text: 'no records',
                      },
                    }));
                })
                .catch(() => res.json({
                  error: {
                    name: 'execution roles alias',
                    code: 1,
                    text: 'no records',
                  },
                }));
            })
            .catch(() => res.json({
              error: {
                name: 'execution users alias',
                code: 1,
                text: 'no records',
              },
            }));
        } else {
          res.json({
            error: {
              name: 'authorisation',
              code: 1,
              text: 'no user',
            },
          });
        }
      })
      .catch(() => res.json({
        error: {
          name: 'authorisation',
          code: 1,
          text: 'bad query',
        },
      }));
  };

  const create = (req, res) => {
    const verifyToken = auth.verifyToken(req, res);
    if (verifyToken) {
      const userData = req.body;
      const params = Object.keys(userData).filter(f => f !== 'id').map(k => (userData[k] !== null ? `N'${userData[k]}'` : 'NULL'));
      const strQuery = `INSERT INTO users (${Object.keys(userData).join(', ')}) VALUES (${params.join(', ')})`;
      db.AsyncQueryDB(strQuery)
        .then(() => {
          res.json({
            error: null,
          });
        })
        .catch(e => res.json({
          error: {
            name: 'create user',
            code: 1,
            text: JSON.stringify(e),
          },
        }));
    } else {
      res.json({
        error: {
          name: 'non auth',
          code: 1,
          text: 'Не верный токен',
        },
      });
    }
  };

  const edit = async (req, res) => {
    const verifyToken = auth.verifyToken(req, res);
    if (verifyToken) {
      const { userData, who } = req.body;
      const params = Object.keys(userData).filter(f => f !== 'id').map(k => (userData[k] !== null ? `${k}=N'${userData[k]}'` : `${k}=NULL`));
      const strQuery = `UPDATE users SET ${params.join(', ')} WHERE id = ${userData.id}`;
      db.AsyncQueryDB(strQuery)
        .then((data) => {
          if (data.recordsets.length === 0) {
            if (who !== 'admin') {
              db.AsyncQueryDB(`SELECT * FROM users WHERE id=${userData.id}`)
                .then((user) => {
                  if (user.recordsets[0].length === 1) {
                    const token = auth.generateToken(user.recordsets[0][0]);
                    res.json({
                      token,
                      info: user.recordsets[0][0],
                      error: null,
                    });
                  }
                })
                .catch((e) => {
                  res.json({
                    error: {
                      name: 'edit user data',
                      code: 1,
                      text: JSON.stringify(e),
                    },
                  });
                });
            } else {
              db.AsyncQueryDB('SELECT * FROM users')
                .then((user) => {
                  if (user.recordsets[0].length > 0) {
                    res.json({
                      list: user.recordsets[0],
                      error: null,
                    });
                  }
                })
                .catch((e) => {
                  res.json({
                    error: {
                      name: 'edit users data',
                      code: 1,
                      text: JSON.stringify(e),
                    },
                  });
                });
            }
          }
        })
        .catch((e) => {
          res.json({
            error: {
              name: 'edit users data',
              code: 1,
              text: JSON.stringify(e),
            },
          });
        });
    } else {
      res.json({
        error: {
          name: 'non auth',
          code: 1,
          text: 'Не верный токен',
        },
      });
    }
  };

  const list = async (req, res) => {
    try {
      const verifyToken = auth.verifyToken(req, res);
      if (verifyToken) {
        const users = await db.AsyncQueryDB('SELECT * FROM users');
        if (users.recordsets[0].length > 0) {
          return res.status(200).json({
            list: users.recordsets[0],
          });
        }
        return res.status(400).json({
          error: true,
          name: 'Ошибка запроса',
          message: 'Пользователи не найдены',
        });
      }
      return res.status(400).json({
        error: true,
        name: 'Ошибка авторизации',
        message: 'Не верный токен',
      });
    } catch (e) {
      return res.status(500).json({
        error: true,
        name: 'Ошибка сервера',
        message: JSON.stringify(e),
      });
    }
  };

  return {
    signin,
    create,
    edit,
    list,
  };
};

export default UserController;
