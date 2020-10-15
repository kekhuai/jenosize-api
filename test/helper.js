const Fastify = require('fastify');
const fp = require('fastify-plugin');
const App = require('../app');

function build(t) {
  const app = Fastify();
  app.register(fp(App), {});
  t.tearDown(app.close.bind(app));
  return app;
}

module.exports = { build };
