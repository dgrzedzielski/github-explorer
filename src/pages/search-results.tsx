import React from 'react';
import { AlertNotFound } from 'components/alert-not-found';
import { BaseList } from 'components/base-list';
import { BaseLoader } from 'components/base-loader';
import { BlockLink } from 'components/block-link';
import { useSearchParam } from 'hooks/use-search-param';
import { useUsersSearch } from 'hooks/use-users-search';
import { routes } from 'routes';

function SearchResultsPage() {
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
          <BlockLink to={routes.profile.replace(':slug', login)}>
            {login}
          </BlockLink>
        )}
        keyExtractor={({ login }) => login}
      />
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (status === 'pending') {
    return <BaseLoader />;
  }

  return <div>Use search input to search github users</div>;
}

export default SearchResultsPage;
