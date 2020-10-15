const Fastify = require('fastify');
const fp = require('fastify-plugin');
const App = require('../app');

function build() {
  const app = Fastify();
  app.register(fp(App), {});
  return app;
}

module.exports = { build };
