const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');
const routes = require('./api/routes');
require('dotenv').config();

// console.log('-------------- check connection server --------------');
// const db = require('./api/db');
// db.ConnectDB();
// -------------- config server --------------

const mappedRoutes = mapRoutes(routes, '/src/server/api/controllers/');
const app = express();
app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true, limit: '1550mb' }));
app.use(bodyParser.json({ limit: '1550mb' }));
app.use('/', mappedRoutes);
app.use(express.static('src/server/shared'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.listen(process.env.PORT || process.env.PORT_LOCAL_SERVER, () => console.log(`success: listen port ${process.env.PORT || process.env.PORT_LOCAL_SERVER}`));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});
