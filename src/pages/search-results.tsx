import React from 'react';
import { BaseList } from 'components/base-list';
import { BlockLink } from 'components/block-link';
import { useUsersSearch } from 'hooks/use-users-search';
import { routes } from 'routes';

function SearchResultsPage() {
  const { data, error } = useUsersSearch();

  if (data) {
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

  return <div>Use search input to search github users</div>;
}

export default SearchResultsPage;
