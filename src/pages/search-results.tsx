import React from 'react';
import { useSearchParam } from 'hooks/use-search-param';

function SearchResultsPage() {
  const query = useSearchParam('query');

  React.useEffect(() => {
    console.log({ query });
  }, [query]);

  return <div>Use search input to search github users</div>;
}

export default SearchResultsPage;
