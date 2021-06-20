import { rest } from 'msw';
import { reposDb } from 'utils/data/repos';
import { usersDb } from 'utils/data/users';

const API_URL = process.env.REACT_APP_API_URL;

export const handlers = [
  rest.get(`${API_URL}/search/users`, (req, res, ctx) => {
    const query = req.url.searchParams.get('q');

    if (!query) return res(ctx.status(400, 'Validation error'));

    const users = usersDb.search(query);
    return res(
      ctx.json({
        total_count: users.length,
        incomplete_results: false,
        items: users,
      })
    );
  }),

  rest.get(`${API_URL}/users/:login`, (req, res, ctx) => {
    const { login } = req.params;
    const user = usersDb.readOne(login);

    if (!user)
      return res(
        ctx.status(404, 'Not found'),
        ctx.json({ message: 'Not Found' })
      );
    return res(ctx.json(user));
  }),

  rest.get(`${API_URL}/users/:login/repos`, (req, res, ctx) => {
    const { login } = req.params;
    if (!usersDb.readOne(login))
      return res(
        ctx.status(404, 'Not found'),
        ctx.json({ message: 'Not Found' })
      );

    const repos = reposDb.readAll();
    return res(ctx.json(repos));
  }),
];
