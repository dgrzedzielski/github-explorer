import React from 'react';
import { useParams } from 'react-router-dom';
import { AlertError } from 'components/alert-error';
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
    const reposToDisplay = [...repos]
      .sort((repoA, repoB) =>
        repoA.stargazers_count > repoB.stargazers_count ? -1 : 1
      )
      .slice(0, 4);

    return <UserProfile user={user} repos={reposToDisplay} />;
  }

  if (error) {
    return <AlertError>Error: {error.message}</AlertError>;
  }

  return <BaseLoader />;
}

export default UserProfilePage;
