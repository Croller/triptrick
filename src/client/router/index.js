import React, { Suspense, lazy } from 'react';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import { withRouter } from 'react-router';

import { Loader } from 'client/ui/components/Loader';
import { Layout } from 'client/ui/components/Layout';
import { ErrorBoundary } from 'client/ui/components/base/ErrorBoundary';

const Page404 = lazy(() => import('client/ui/page/404'));
const Map = lazy(() => import('client/ui/page/Map'));
const UI = lazy(() => import('client/ui/page/UI'));

export const Routers = withRouter(() => (
  <ErrorBoundary>
    <Router>
      <Switch>
        <Suspense
          fallback={
            <Loader />
          }
        >
          <Layout>
            <Switch>
              <Route exact path="/" component={Map} />
              <Route exact path="/ui" component={UI} />
              <Route path="/error" component={Page404} />
              <Route path="*" component={Page404} />
              <Redirect to="/" />
            </Switch>
          </Layout>
        </Suspense>
      </Switch>
    </Router>
  </ErrorBoundary>
));
