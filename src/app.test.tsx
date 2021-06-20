import App from 'app';
import faker from 'faker';
import { UserDetails } from 'hooks/use-user-details';
import { routes } from 'routes';
import { buildRepo, buildUser } from 'utils/builder';
import { reposDb } from 'utils/data/repos';
import { usersDb } from 'utils/data/users';
import {
  render,
  screen,
  userEvent,
  waitForLoadingToFinish,
} from 'utils/test-utils';

type RenderAppOptions = {
  user?: UserDetails | null;
  route?: string;
};

async function renderApp({ user: passedUser, route }: RenderAppOptions = {}) {
  const result = await render(<App />, { route });

  const user =
    passedUser === undefined ? usersDb.create(buildUser()) : passedUser;

  return {
    ...result,
    user,
  };
}

const performSearch = (query: string) =>
  userEvent.type(screen.getByRole('searchbox'), `${query}{enter}`);

it('should allow to search users and navigate to their profiles', async () => {
  const { user } = await renderApp();

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"Use search input to search github users"`
  );
  performSearch(user!.login);
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  await waitForLoadingToFinish();
  expect(screen.getByRole('list')).toBeInTheDocument();
  userEvent.click(screen.getByRole('link', { name: user!.login }));
  await waitForLoadingToFinish();
  expect(
    screen.getByRole('heading', { name: new RegExp(user!.name!, 'i') })
  ).toBeInTheDocument();
});

it('should show alert when no user found', async () => {
  await renderApp({ user: null });
  const notExistingUser = faker.internet.userName();

  performSearch(notExistingUser);
  await waitForLoadingToFinish();
  expect(screen.getByRole('alert')).toHaveTextContent(
    `We couldn't find anything like ${notExistingUser}`
  );
});

it('should fill searchbox from user query param', async () => {
  const userQuery = faker.internet.userName();
  await renderApp({ route: `/?user=${userQuery}`, user: null });

  expect(screen.getByRole('searchbox')).toHaveValue(userQuery);
});

it('should display user details and repos on profile page', async () => {
  const user = usersDb.create(buildUser());
  reposDb.createMany([
    buildRepo({ owner: user, stargazers_count: 3 }),
    buildRepo({ owner: user, stargazers_count: 8 }),
    buildRepo({ owner: user, stargazers_count: 1 }),
    buildRepo({ owner: user, stargazers_count: 5 }),
    buildRepo({ owner: user, stargazers_count: 2 }),
  ]);
  const [lowestStarsRepo, highestStarsRepo] = reposDb.createMany([
    buildRepo({ owner: user, stargazers_count: 0 }),
    buildRepo({ owner: user, stargazers_count: 10 }),
  ]);
  await renderApp({ user, route: routes.profile.replace(':slug', user.login) });

  expect(
    screen.getByRole('img', {
      name: new RegExp(`avatar of ${user.name}`, 'i'),
    })
  ).toHaveAttribute('src', user.avatar_url);
  expect(
    screen.getByRole('heading', { name: new RegExp(user.name!, 'i') })
  ).toBeInTheDocument();
  expect(screen.getByText(user.bio!)).toBeInTheDocument();
  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(4);
  expect(listItems[0]).toHaveTextContent(highestStarsRepo.name);
  expect(
    screen.queryByRole('link', { name: new RegExp(lowestStarsRepo.name) })
  ).not.toBeInTheDocument();
});

it('should show alert when non existing login will be provided as param', async () => {
  const username = faker.internet.userName();
  await render(<App />, { route: routes.profile.replace(':slug', username) });

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"Error: Not Found"`
  );
});
