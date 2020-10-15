const { build } = require('../helper');

describe('test game api', () => {
  test('1, 1, 1, 1 should not solvable', async () => {
    const app = build();

    const res = await app.inject({
      url: '/api/v1/game/solve-24?numbers=1&numbers=2&numbers=3&numbers=4'
    });

    const payload = JSON.parse(res.payload);
    console.log('payload = ', payload);
  });
});
