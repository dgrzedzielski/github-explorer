import React from 'react';
import { useFetch } from 'hooks/use-fetch';
import { User } from 'hooks/use-users-search';
import { makeRequest } from 'utils/api-client';

export type Repo = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: User;
  description: string;
  fork: boolean;
  html_url: string;
  created_at: Date;
  updated_at: Date;
  pushed_at: Date;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: string | null;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}; // simplified type

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
