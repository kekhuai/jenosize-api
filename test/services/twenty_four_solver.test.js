const { test } = require('tap');
const solver = require('../../services/twenty_four_solver');

test('test 24 solver', async (childTest) => {
  childTest.test('1 2 3 4 should be solved as 4*(3+(1+2))', async (t) => {
    const solution = solver.solve([1, 2, 3, 4]);
    t.equal(solution, '4*(3+(1+2))');
  });

  childTest.test('1, 1, 1, 1 should not solvable', async (t) => {
    const solution = solver.solve([1, 1, 1, 1]);
    t.equal(solution, undefined);
  });

  childTest.test('1, 5, 5, 5 should be solved as 5*(5-(1/5))', async (t) => {
    const solution = solver.solve([1, 5, 5, 5]);
    t.equal(solution, '5*(5-(1/5))');
  });

  childTest.test('4, 8, 3, 6 should be solved as (4+8)/(3/6)', async (t) => {
    const solution = solver.solve([4, 8, 3, 6]);
    t.equal(solution, '(4+8)/(3/6)');
  });
});
