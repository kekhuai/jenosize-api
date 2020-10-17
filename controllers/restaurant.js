const get = require('lodash/get');
const { searchRestaurant } = require('../services/google-map');

module.exports = async function(fastify, opts) {
  fastify.get('/search', {}, async function(request, reply) {
    const term = get(request, 'query.term');
    const searchResults = await searchRestaurant(term);
    return { 'results': searchResults };
  });
};

module.exports.autoPrefix = '/v1/restaurant';
