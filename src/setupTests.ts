import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { reposDb } from 'utils/data/repos';
import { usersDb } from 'utils/data/users';
import { server } from 'utils/server';

window.history.pushState({}, 'Home page', '/');

// to speed up byRole queries
// https://github.com/testing-library/dom-testing-library/issues/552
configure({ defaultHidden: true });

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
afterEach(() => {
  usersDb.reset();
  reposDb.reset();
});
