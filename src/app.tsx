import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FormSearchUser } from 'components/form-search-user/form-search-user';
import { PageHeader } from 'components/page-header';
import { routes } from 'routes';

const Homepage = React.lazy(() => import('pages/search-results'));
const UserProfilePage = React.lazy(() => import('pages/user-profile'));

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader>
        <FormSearchUser />
      </PageHeader>
      <main>{children}</main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={routes.search} component={Homepage} />
            <Route path={routes.profile} component={UserProfilePage} />
          </Switch>
        </React.Suspense>
      </Layout>
    </Router>
  );
}

export default App;
