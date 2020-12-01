const routes = {
  'POST /api/user/signin': 'UserController.signin',
  'GET /api/user/auth': 'UserController.auth',
  'POST /api/user/create': 'UserController.create',
  'POST /api/user/update': 'UserController.update',
  'POST /api/user/remove': 'UserController.remove',
  
  'POST /api/table/get': 'CommonController.getTableByNames',

  'GET /api/table/record/:id': 'CommonController.getRecord',
  'POST /api/table/record/create': 'CommonController.createRecord',
  'POST /api/table/record/update': 'CommonController.updateRecord',

  // 'GET /api/map/mbtiles/:z/:x/:y.*': 'MapController.mbtiles',
  // 'GET /api/map/test': 'MapController.test',

};

module.exports = routes;
