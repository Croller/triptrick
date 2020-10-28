const routes = {
  'POST /api/user/signin': 'UserController.signin',
  'GET /api/user/auth': 'UserController.auth',
  'POST /api/user/create': 'UserController.create',
  'POST /api/user/update': 'UserController.update',
  'POST /api/user/remove': 'UserController.remove',
  
  'POST /api/table/get': 'CommonController.getTableByName',
  // 'GET /api/krt': 'KrtController.krt',
  // 'GET /api/krt/monitoring': 'KrtController.monitoring',
  // 'POST /api/user/signin': 'UserController.signin',
  // 'POST /api/user/create': 'UserController.create',
  // 'POST /api/user/edit': 'UserController.edit',
  // // 'POST /api/user/restore': 'UserController.restore',
  // // 'POST /api/user/signout': 'UserController.signout',
  // 'GET /api/user/list': 'UserController.list',

  // 'POST /api/execution/table': 'ExecutionController.table',
  // 'POST /api/execution/dictionary': 'ExecutionController.dictionary',

  // 'POST /api/emailer/send': 'MailerController.send',
  // 'POST /api/emailer/sendOneByOne': 'MailerController.sendOneByOne',

  // 'GET /api/map/mbtiles/:z/:x/:y.*': 'MapController.mbtiles',
  // 'GET /api/map/test': 'MapController.test',

};

module.exports = routes;
