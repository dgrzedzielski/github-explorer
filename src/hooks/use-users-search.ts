import React from 'react';
import { useFetch } from 'hooks/use-fetch';
import { useSearchParam } from 'hooks/use-search-param';
import { ListResponse, makeRequest } from 'utils/api-client';

export type User = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
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
    if (query && query.length >= 3) {
      run(searchUsers(query));
    }
  }, [run, query]);

  return state;
}
