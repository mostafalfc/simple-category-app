import { main } from '../src/app';
import { test, Test } from 'tap';

test('requests the "/" route', async (t: Test) => {
  const app = main();

  try {
    const response = await app.inject({
      method: 'GET',
      url: '/',
    });
    t.equal(response.statusCode, 200, 'returns a status code of 200');
    t.same(response.json(), { status: 'OK' });
  } catch (e) {
    console.log(e);
  }

  await app.close();
});
