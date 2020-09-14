import React from 'react';
import { hot } from 'react-hot-loader';
import { Routers } from './router';
import worker from './sw';

export const App = () => (
  <Routers />
);

worker();

export default hot(module)(App);
