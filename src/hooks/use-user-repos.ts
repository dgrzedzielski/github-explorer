import { useQuery } from 'react-query';
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

const QUERY_KEY = (login: string) => ['user', login, 'repos'];

export function useUserRepos(login: string) {
  return useQuery<Array<Repo>, Error>(QUERY_KEY(login), () =>
    fetchUserRepos(login)
  );
}
