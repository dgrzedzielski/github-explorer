import { useQuery } from 'react-query';
import { User } from 'hooks/use-users-search';
import { makeRequest } from 'utils/api-client';

export type UserDetails = User & {
  bio: string | null;
  name: string | null;
};

async function fetchUserDetails(login: string) {
  return makeRequest<UserDetails>(`users/${login}`);
}

const QUERY_KEY = (login: string) => ['users', login];

export function useUserDetails(login: string) {
  return useQuery<UserDetails, Error>(
    QUERY_KEY(login),
    () => fetchUserDetails(login),
    { retry: false }
  );
}
