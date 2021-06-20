import App from 'app';
import { routes } from 'routes';
import {
  act,
  render,
  screen,
  userEvent,
  waitForLoadingToFinish,
} from 'utils/test-utils';

const performSearch = (query: string) =>
  userEvent.type(screen.getByRole('searchbox'), `${query}{enter}`);

it('should allow to search users and navigate to their profiles', async () => {
  await render(<App />);
  const searchedUsername = 'dgrzedzielski';

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"Use search input to search github users"`
  );
  performSearch(searchedUsername);
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  await waitForLoadingToFinish();
  expect(screen.getByRole('list')).toBeInTheDocument();
  userEvent.click(screen.getByRole('link', { name: searchedUsername }));
  await waitForLoadingToFinish();
  expect(
    screen.getByRole('heading', { name: new RegExp(searchedUsername, 'i') })
  ).toBeInTheDocument();
});

it('should show alert when no user found', async () => {
  await render(<App />);
  const notExistingUser = 'somenotexistinguser';

  performSearch(notExistingUser);
  await waitForLoadingToFinish();
  expect(screen.getByRole('alert')).toHaveTextContent(
    `We couldn't find anything like ${notExistingUser}`
  );
});

it('should fill searchbox from user query param', async () => {
  const userQuery = 'anything';
  await render(<App />, { route: `/?user=${userQuery}` });

  expect(screen.getByRole('searchbox')).toHaveValue(userQuery);
});

it('should display user details and repos on profile page', async () => {
  const username = 'dgrzedzielski';
  await render(<App />, { route: routes.profile.replace(':slug', username) });
  expect(
    screen.getByRole('img', { name: new RegExp(`avatar of ${username}`, 'i') })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: new RegExp(username, 'i') })
  ).toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).toHaveLength(4);
});

it('should show alert when non existing login will be provided as param', async () => {
  const username = 'notexistinguser';
  await render(<App />, { route: routes.profile.replace(':slug', username) });

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"Error: Not Found"`
  );
});
