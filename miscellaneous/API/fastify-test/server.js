const fastify = require('fastify')({ logger: true });

fastify.route({
  method: 'POST',
  url: '/',
  // this function is executed for every request before the handler is executed
  preHandler: async (request, reply) => {
    console.log({
      preHandler: 'preHandler',
      params: request.params,
      body: request.body,
      query: request.query,
    });
    // E.g. check authentication
  },
  handler: async (request, reply) => {
    return { hello: 'world' };
  },
});

fastify.route({
  method: 'GET',
  url: '/:id',
  schema: {
    // request needs to have a querystring with a `name` parameter
    querystring: {
      name: { type: 'string' },
    },
    // the response needs to be an object with an `hello` property of type 'string'
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' },
        },
      },
    },
  },
  // this function is executed for every request before the handler is executed
  preHandler: async (request, reply) => {
    console.log({
      preHandler: 'preHandler',
      params: request.params,
      body: request.body,
      query: request.query,
    });
    // E.g. check authentication
  },
  handler: async (request, reply) => {
    return { hello: 'world' };
  },
});

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
