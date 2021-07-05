import React from 'react';
import { AlertNotFound } from 'components/alert-not-found';
import { BaseAlert } from 'components/base-alert';
import { BaseList } from 'components/base-list';
import { BaseLoader } from 'components/base-loader';
import { BlockLink } from 'components/block-link';
import { useSearchParam } from 'hooks/use-search-param';
import { useUsersSearch } from 'hooks/use-users-search';
import { routes } from 'routes';

function Homepage() {
  const userSearchQuery = useSearchParam('user');
  const { data, error, status } = useUsersSearch();

  if (data) {
    if (data.items.length === 0) {
      return <AlertNotFound resource={userSearchQuery!} />;
    }

    return (
      <BaseList
        items={data.items}
        renderItem={({ login }) => (
          <BlockLink to={routes.profile.replace(':login', login)}>
            {login}
          </BlockLink>
        )}
        keyExtractor={({ login }) => login}
      />
    );
  }

  if (error) {
    return <BaseAlert>Error: {error.message}</BaseAlert>;
  }

  if (status === 'loading') {
    return <BaseLoader />;
  }

  return (
    <BaseAlert type="info">Use search input to search github users</BaseAlert>
  );
}

export default Homepage;
