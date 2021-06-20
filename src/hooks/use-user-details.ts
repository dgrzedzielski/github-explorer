import React from 'react';
import { useFetch } from 'hooks/use-fetch';
import { User } from 'hooks/use-users-search';
import { makeRequest } from 'utils/api-client';

export type UserDetails = User & {
  bio: string | null;
  name: string | null;
};

async function fetchUserDetails(login: string) {
  return makeRequest<UserDetails>(`users/${login}`);
}

export function useUserDetails(login: string) {
  const { run, ...state } = useFetch<UserDetails>();

  React.useEffect(() => {
    run(fetchUserDetails(login));
  }, [run, login]);

  return {
    ...state,
    user: state.data,
  };
}
