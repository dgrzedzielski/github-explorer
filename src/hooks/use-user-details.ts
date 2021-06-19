import React from 'react';
import { useFetch } from 'hooks/use-fetch';
import { makeRequest } from 'utils/api-client';

export type UserDetails = {
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
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
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
