import * as faker from 'faker';
import { API_URL, makeRequest } from 'utils/api-client';
import { rest, server } from './server';

const endpoint = 'any-test-endpoint';

it('should call fetch with query params when passed', async () => {
  const params = {
    query: faker.lorem.word(),
    anotherParam: faker.lorem.word(),
  };

  server.use(
    rest.get(`${API_URL}/${endpoint}`, (req, res, ctx) => {
      return res(ctx.json(req.url.searchParams.toString()));
    })
  );

  const result = await makeRequest(endpoint, { params });
  expect(result).toEqual(new URLSearchParams(params).toString());
});

it('should call fetch and return value returned from response', async () => {
  const responseResult = { anyKey: 'anyValue' };

  server.use(
    rest.get(`${API_URL}/${endpoint}`, (req, res, ctx) => {
      return res(ctx.json(responseResult));
    })
  );

  const result = await makeRequest(endpoint);
  expect(result).toEqual(responseResult);
});

it(`should reject promise if there's was an error in response`, async () => {
  const anyError = { message: 'Some error from API' };

  server.use(
    rest.get(`${API_URL}/${endpoint}`, (req, res, ctx) => {
      return res(ctx.status(400), ctx.json(anyError));
    })
  );

  const error = await makeRequest(endpoint).catch((e) => e);
  expect(error).toEqual(anyError);
});

it('should call fetch to request POST endpoint, by default when body provided', async () => {
  const body = { anyKey: 'anyValue' };

  server.use(
    rest.post(`${API_URL}/${endpoint}`, (req, res, ctx) => {
      return res(ctx.json(req.body));
    })
  );

  const result = await makeRequest(endpoint, { body });
  expect(result).toEqual(body);
});

it('should allow to override config', async () => {
  const body = { anyKey: 'anyValue' };

  server.use(
    rest.put(`${API_URL}/${endpoint}`, (req, res, ctx) => {
      return res(ctx.json(req.body));
    })
  );

  const result = await makeRequest(endpoint, { body, method: 'PUT' });
  expect(result).toEqual(body);
});
