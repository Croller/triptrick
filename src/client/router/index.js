import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import { withRouter } from 'react-router';
import { getLocalStorage } from 'client/utils/common';

import { Loader } from 'client/ui/components/base/Loader';
import { Layout } from 'client/ui/components/Layout';
import { ErrorBoundary } from 'client/ui/components/base/ErrorBoundary';

const Page404 = lazy(() => import('client/ui/page/404'));
const Auth = lazy(() => import('client/ui/page/Auth'));
const Main = lazy(() => import('client/ui/page/Main'));
const MonitoringKrt = lazy(() => import('client/ui/page/MonitoringKrt'));
const Components = lazy(() => import('client/ui/page/Components'));

export const Routers = withRouter(() => {
  const { user } = useSelector((state) => state.global);
  const token = getLocalStorage('tt', true);

  return (
    <ErrorBoundary>
      <Router>
        <Switch>
          <Suspense fallback={<Loader />}>
            {(!user || !token) ? (
              <Auth />
            ) : (
              <>
                {/* <Layout> */}
                <Switch>
                  <Route exact path="/" component={Main} />
                  <Route exact path="/auth" component={Auth} />
                  <Route exact path="/monitoring_krt" component={MonitoringKrt} />
                  <Route exact path="/ui" component={Components} />
                  {/* <Route path="/error" component={Page404} /> */}
                  <Route path="*" component={Page404} />
                  <Redirect to="/" />
                </Switch>
                {/* </Layout> */}
              </>
            )}
          </Suspense>
        </Switch>
      </Router>
    </ErrorBoundary>
  );
});
