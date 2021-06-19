import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BaseLoader } from 'components/base-loader';
import { DefaultLayout } from 'components/default-layout';
import { routes } from 'routes';

const Homepage = React.lazy(() => import('pages/search-results'));
const UserProfilePage = React.lazy(() => import('pages/user-profile'));

function App() {
  return (
    <Router>
      <DefaultLayout>
        <React.Suspense fallback={<BaseLoader />}>
          <Switch>
            <Route exact path={routes.search} component={Homepage} />
            <Route path={routes.profile} component={UserProfilePage} />
          </Switch>
        </React.Suspense>
      </DefaultLayout>
    </Router>
  );
}

export default App;
