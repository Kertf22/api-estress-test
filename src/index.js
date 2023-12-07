import Fastify from "fastify";
import pool from "./db.js";

const fastify = Fastify({
  logger: true,
});

fastify.route({
  method: "GET",
  url: "/",
  schema: {
    // request needs to have a querystring with a `name` parameter
    querystring: {
      type: "object",
      properties: {
        name: { type: "string" },
      },
      required: ["name"],
    },
    // the response needs to be an object with an `hello` property of type 'string'
    response: {
      200: {
        type: "object",
        properties: {
          hello: { type: "string" },
        },
      },
      500: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          error: { type: "string" },
        },
      },
    },
  },
  // this function is executed for every request before the handler is executed
  preHandler: async (request, reply) => {
    // E.g. check authentication
  },
  handler: async (request, reply) => {
    return { hello: "world" };
  },
});

fastify.route({
  method: "POST",
  url: "/login",
  schema: {
    body: {
      type: "object",
      properties: {
        username: { type: "string" },
        password: { type: "string" },
      },
      required: ["username", "password"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          user: {
            type: "object",
            properties: {
              name: { type: "string" },
              username: { type: "string" },
            },
          },
        },
      },
      400: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          error: { type: "string" },
        },
      },
      500: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          error: { type: "string" },
        },
      },
    },
  },
  handler: async (request, reply) => {
    const { username, password } = request.body;

    if (!username || !password) {
      return reply
        .code(400)
        .send({ success: false, error: "username and password are required" });
    }

    const res = pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (res.rows.length == 0) {
      return reply
        .code(400)
        .send({ success: false, error: "invalid username/password" });
    }

    const user = res.rows[0];

    if (user.password !== password) {
      return reply
        .code(400)
        .send({ success: false, error: "invalid username/password" });
    }

    return {
      success: true,
      user: { name: user.name, username: user.username },
    };
  },
});

fastify.route({
  method: "POST",
  url: "/create",
  schema: {
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        username: { type: "string" },
        password: { type: "string" },
      },
      required: ["username", "password"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
        },
      },
      400: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          error: { type: "string" },
        },
      },
      500: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          error: { type: "string" },
        },
      },
    },
  },
  handler: async (request, reply) => {
    const { name, username, password } = request.body;
    if (!name || !username || !password) {
      return reply.code(400).send({
        success: false,
        error: "name, username and password are required",
      });
    }

    const res = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (res.rows.length > 0) {
      return reply
        .code(400)
        .send({ success: false, error: "username already exists" });
    }

    await pool.query(
      "INSERT INTO users (name, username, password) VALUES ($1, $2, $3)",
      [name, username, password]
    );

    return { success: true };
  },
});

try {
  await pool.connect();

  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
