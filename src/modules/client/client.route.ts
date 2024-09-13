import { FastifyInstance } from "fastify";
import { getClientsHanlder, registerClientHandler } from "./client.controller";
import { $ref, clientSchemas } from "./client.schema";

async function clientRoutes(server: FastifyInstance) {
  for (const schema of clientSchemas) {
    server.addSchema(schema);
  }

  //criação de usuario
  server.register;
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createClientSchema"),
      },
    },
    registerClientHandler
  );

  //listar clientes
  server.get(
    "/",
    {
      preHandler: [server.authenticate],
    },
    getClientsHanlder
  );

  // //delete client
  // server.delete(
  //   "/",
  //   {
  //     schema: {
  //       querystring: $ref("defaultUserSchemaQuery"),
  //       response: { 204: $ref("defaultUserSchemarResponse") },
  //     },
  //     preHandler: [server.authenticate],
  //   },
  //   deleteUserHandler
  // );
}

export default clientRoutes;
