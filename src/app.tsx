import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { BaseLoader } from 'components/base-loader';
import { DefaultLayout } from 'components/default-layout';
import { routes } from 'routes';

const Homepage = React.lazy(
  () => import(/* webpackPrefetch: true */ 'pages/homepage')
);
const UserProfilePage = React.lazy(
  () => import(/* webpackPrefetch: true */ 'pages/user-profile')
);

export function App() {
  return (
    <React.Suspense fallback={<BaseLoader />}>
      <DefaultLayout>
        <Switch>
          <Route exact path={routes.search} component={Homepage} />
          <Route path={routes.profile} component={UserProfilePage} />
        </Switch>
      </DefaultLayout>
    </React.Suspense>
  );
}
