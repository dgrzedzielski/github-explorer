import React from 'react';
import { useHistory } from 'react-router-dom';
import { FormSearch } from 'components/form-search';
import { useSearchParam } from 'hooks/use-search-param';
import { routes } from 'routes';

export function FormSearchUser() {
  const history = useHistory();
  const userSearchQuery = useSearchParam('user');

  const handleSearch = (query: string) => {
    const search = query
      ? new URLSearchParams({
          user: encodeURIComponent(query),
        }).toString()
      : undefined;

    history.push({
      pathname: routes.search,
      search,
    });
  };

  return (
    <FormSearch
      onSearch={handleSearch}
      defaultQuery={userSearchQuery}
      label="search github users"
    />
  );
}
