const { test } = require('tap');
const { build } = require('../helper');

test('test game api', async (t) => {
  t.test('1, 1, 1, 1 should not solvable', async (t) => {
    const app = build(t);

    const res = await app.inject({
      url: '/api/v1/game/solve-24?numbers=1&numbers=2&numbers=3&numbers=4'
    });

    const payload = JSON.parse(res.payload);
    console.log('payload = ', payload);
  });
});
