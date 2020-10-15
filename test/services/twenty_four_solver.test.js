const solver = require('../../services/twenty_four_solver');

describe('test 24 solver', () => {
  test('1 2 3 4 should be solved as 4*(3+(1+2))', () => {
    const solution = solver.solve([1, 2, 3, 4]);
    expect(solution).toEqual('4*(3+(1+2))');
  });

  test('1, 1, 1, 1 should not solvable', () => {
    const solution = solver.solve([1, 1, 1, 1]);
    expect(solution).toBeUndefined();
  });

  test('1, 5, 5, 5 should be solved as 5*(5-(1/5))', () => {
    const solution = solver.solve([1, 5, 5, 5]);
    expect(solution).toEqual('5*(5-(1/5))');
  });

  test('4, 8, 3, 6 should be solved as (4+8)/(3/6)', () => {
    const solution = solver.solve([4, 8, 3, 6]);
    expect(solution).toEqual('(4+8)/(3/6)');
  });
});
