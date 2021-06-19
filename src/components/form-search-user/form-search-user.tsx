import React from 'react';
import { useHistory } from 'react-router-dom';
import { FormSearch } from 'components/form-search';
import { routes } from 'routes';

export function FormSearchUser() {
  const history = useHistory();

  const handleSearch = (query: string) => {
    history.push({
      pathname: routes.search,
      search: new URLSearchParams({
        query: encodeURIComponent(query),
      }).toString(),
    });
  };

  return <FormSearch onSearch={handleSearch} label="search github users" />;
}
