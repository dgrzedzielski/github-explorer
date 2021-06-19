import React from 'react';
import { useUsersSearch } from 'hooks/use-users-search';

function SearchResultsPage() {
  const { data, error } = useUsersSearch();

  if (data) {
    return (
      <div>
        {data.items.map((el) => (
          <div>{el.login}</div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <div>Use search input to search github users</div>;
}

export default SearchResultsPage;
