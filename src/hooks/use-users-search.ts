import { useQuery } from 'react-query';
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

const QUERY_KEY = (query: string) => ['search', 'users', query];

export function useUsersSearch() {
  const query = useSearchParam('user');
  const enabled = !!query;

  return useQuery<ListResponse<User>, Error>(
    QUERY_KEY(query!),
    () => searchUsers(query!),
    { enabled }
  );
}
