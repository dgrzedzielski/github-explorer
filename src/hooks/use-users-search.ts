import React from 'react';
import { useFetch } from 'hooks/use-fetch';
import { useSearchParam } from 'hooks/use-search-param';
import { ListResponse, makeRequest } from 'utils/api-client';

export type User = {
  login: string;
  id: number;
  avatar_url: string;
};

async function searchUsers(query: string) {
  return makeRequest<ListResponse<User>>('search/users', {
    params: { q: query },
  });
}

export function useUsersSearch() {
  const query = useSearchParam('user');
  const { run, ...state } = useFetch<ListResponse<User>>();

  React.useEffect(() => {
    if (query) {
      run(searchUsers(query));
    }
  }, [run, query]);

  return state;
}
