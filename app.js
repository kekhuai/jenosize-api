require('dotenv').config();
const path = require('path');
const AutoLoad = require('fastify-autoload');
const fastifyBabel = require('fastify-babel');

module.exports = function(fastify, opts, next) {
  fastify.register(fastifyBabel, {
    babelrc: {
      presets: ["@babel/preset-env"],
    },
  }).register(AutoLoad, {
    dir: path.join(__dirname, 'controllers'),
    options: Object.assign({ prefix: '/api' }, opts)
  });

  next();
}
