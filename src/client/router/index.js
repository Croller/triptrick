import React, { Suspense, lazy } from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import { withRouter } from 'react-router';

import Loader from '../components/Loader';

const Page401 = lazy(() => import('client/page/401'));
const Map = lazy(() => import('client/page/Map'));
const TestTS = lazy(() => import('client/page/TestTS'));
// const Layout = lazy(() => import('client/page/Layout'));

export const Routers = withRouter(() => (
  <Router>
    <Switch>
      <Suspense
        fallback={
          <Loader />
        }
      >
        {/* {
            user.token === null ? (
              <Auth />
            ) : ( */}
        {/* <Layout> */}
        <Switch>
          <Route path="/" component={Map} />
          <Route path="/test-ts" component={TestTS} />
          <Route path="/error" component={Page401} />
          <Route path="*" component={Page401} />

          {/* <Redirect to="/" /> */}
        </Switch>
        {/* </Layout> */}
        {/* )
          } */}
        {/* <Route path="/test/map" component={Map} /> */}
      </Suspense>
    </Switch>
  </Router>
));

// export default withRouter(Main);
