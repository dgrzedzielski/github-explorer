import React from 'react';
import { useFetch } from 'hooks/use-fetch';
import { UserDetails } from 'hooks/use-user-details';
import { makeRequest } from 'utils/api-client';

export type Repo = {
  id: number;
  name: string;
  full_name: string;
  owner: UserDetails;
  description: string;
  html_url: string;
  stargazers_count: number;
};

async function fetchUserRepos(login: string) {
  return makeRequest<Array<Repo>>(`users/${login}/repos`);
}

export function useUserRepos(login: string) {
  const { run, ...state } = useFetch<Array<Repo>>();

  React.useEffect(() => {
    run(fetchUserRepos(login));
  }, [run, login]);

  return {
    ...state,
    repos: state.data,
  };
}
