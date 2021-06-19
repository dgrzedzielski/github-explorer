import React from 'react';
import { useParams } from 'react-router-dom';
import { BaseLoader } from 'components/base-loader';
import { UserProfile } from 'components/user-profile';
import { useUserDetails } from 'hooks/use-user-details';
import { useUserRepos } from 'hooks/use-user-repos';

type UserProfileParams = {
  slug: string;
};

function UserProfilePage() {
  const { slug: login } = useParams<UserProfileParams>();
  const { user, error: userDetailsError } = useUserDetails(login);
  const { repos, error: reposError } = useUserRepos(login);
  const error = userDetailsError || reposError;

  if (user && repos) {
    return <UserProfile user={user} repos={repos} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <BaseLoader />;
}

export default UserProfilePage;
