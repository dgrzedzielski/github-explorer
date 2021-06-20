import { UserProfile } from 'components/user-profile/user-profile';
import { UserDetails } from 'hooks/use-user-details';
import { buildUser } from 'utils/builder';
import { usersDb } from 'utils/data/users';
import { render, screen } from 'utils/test-utils';

type RenderUserProfileOptions = { user?: UserDetails };

async function renderUserProfile({
  user: passedUser,
}: RenderUserProfileOptions = {}) {
  const user =
    passedUser === undefined ? usersDb.create(buildUser()) : passedUser;

  const result = await render(<UserProfile user={user} repos={[]} />);

  return {
    ...result,
    user,
  };
}

it('should render user profile with display name as name when provided', async () => {
  const { user } = await renderUserProfile();
  const displayName = user.name!;

  expect(
    screen.getByRole('heading', { name: displayName })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('img', { name: `avatar of ${displayName}` })
  ).toHaveAttribute('src', user.avatar_url);
  expect(screen.getByText(user.bio!)).toBeInTheDocument();
});

it('should render user profile with display name as login when name is null', async () => {
  const user = usersDb.create(buildUser({ name: null }));
  await renderUserProfile({ user });
  const displayName = user.login;

  expect(
    screen.getByRole('heading', { name: displayName })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('img', { name: `avatar of ${displayName}` })
  ).toBeInTheDocument();
});
