import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Routers } from './router';
import worker from './sw';

const App = () => (
  <Routers />
);

worker();

export default hot(App);
