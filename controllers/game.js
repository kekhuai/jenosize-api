const get = require('lodash/get');
const map = require('lodash/map');
const solver = require('../services/twenty_four_solver');

module.exports = async function(fastify, opts) {
  fastify.get('/', {}, async function(request, reply) {
    let numbers = get(request, 'query.numbers') || [];
    numbers = map(numbers, (number) => parseInt(number));
    const solution = solver.solve(numbers);
    if (solution) {
      return { solvable: 'Yes', possibleSolution: solution };
    }
    return { solvable: 'No' };
  });
};

module.exports.autoPrefix = '/v1/solve-24';
