import React, { Suspense, lazy } from 'react';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import { withRouter } from 'react-router';

import { Loader } from 'client/ui/components/base/Loader';
import { Layout } from 'client/ui/components/Layout';
import { ErrorBoundary } from 'client/ui/components/base/ErrorBoundary';

const Page404 = lazy(() => import('client/ui/page/404'));
const Main = lazy(() => import('client/ui/page/Main'));
const Components = lazy(() => import('client/ui/page/Components'));

export const Routers = withRouter(() => (
  <ErrorBoundary>
    <Router>
      <Switch>
        <Suspense fallback={<Loader />}>
          <Layout>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/ui" component={Components} />
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
