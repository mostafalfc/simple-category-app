import { main } from '../src/app';
import { test, Test } from 'tap';
const app = main();
let token = '';
let category_id = 0;
test('requests the post "/user" route', async (t: Test) => {
  let response = await app.inject({
    method: 'POST',
    url: '/api/user',
    payload: {
      email: 'test@test.com',
      name: 'test user',
      password: 'password',
    },
  });
  t.equal(response.statusCode, 201, 'returns a status code of 201');
});

test('requests the post "/user/login" route', async (t: Test) => {
  const response = await app.inject({
    method: 'POST',
    url: '/api/user/login',
    payload: {
      email: 'test@test.com',
      password: 'password',
    },
  });
  t.equal(response.statusCode, 200, 'returns a status code of 200');
  token = response.json().data.token;
});

test('requests the get "/user" route', async (t: Test) => {
  const response = await app.inject({
    method: 'get',
    url: '/api/user',
    headers: {
      authorization: token,
    },
  });
  t.equal(response.statusCode, 200, 'returns a status code of 200');
});

test('requests the post "/category" route', async (t: Test) => {
  const response = await app.inject({
    method: 'post',
    url: '/api/category',
    headers: {
      authorization: token,
    },
    payload: {
      latitude: 100,
      longitude: 100,
      category: 'test category',
      counter: 0,
    },
  });
  t.equal(response.statusCode, 201, 'returns a status code of 201');
  category_id = response.json().data.id;
});

test('requests the get "/category" route', async (t: Test) => {
  const response = await app.inject({
    method: 'post',
    url: '/api/category',
    headers: {
      authorization: token,
    },
  });
  t.equal(response.statusCode, 200, 'returns a status code of 200');
});

test('requests the get "/category/:id" route', async (t: Test) => {
  const response = await app.inject({
    method: 'post',
    url: `/api/category/${category_id}`,
    headers: {
      authorization: token,
    },
  });
  t.equal(response.statusCode, 200, 'returns a status code of 200');
});

test('requests the post "/category/counter" route', async (t: Test) => {
  const response = await app.inject({
    method: 'post',
    url: '/api/category/counter',
    headers: {
      authorization: token,
    },
    payload: {
      id: category_id,
      value: 100,
    },
  });
  t.equal(response.statusCode, 200, 'returns a status code of 201');
  await app.close();
});
