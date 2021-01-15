import React from 'react';
import { hot } from 'react-hot-loader/root';
import { GlobalStyle } from 'client/style/base';
import { Routers } from './router';
import worker from './sw';

const App = () => (
  <>
    <GlobalStyle />
    <Routers />
  </>
);

worker();

export default hot(App);
