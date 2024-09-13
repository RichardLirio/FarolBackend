import { FastifyInstance } from "fastify";
import {
  getClientsHanlder,
  registerClientHandler,
  deleteClientHandler,
  updateClientHandler,
} from "./client.controller";
import { $ref, clientSchemas } from "./client.schema";

async function clientRoutes(server: FastifyInstance) {
  for (const schema of clientSchemas) {
    server.addSchema(schema);
  }

  //criação de clientes
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
  server.delete(
    "/",
    {
      schema: {
        querystring: $ref("defaultClientSchemaQuery"),
        response: { 204: $ref("defaultClientSchemarResponse") },
      },
      preHandler: [server.authenticate],
    },
    deleteClientHandler
  );

  //update client
  server.put(
    "/",
    {
      schema: {
        body: $ref("createClientSchema"),
        querystring: $ref("defaultClientSchemaQuery"),
      },
      preHandler: [server.authenticate],
    },
    updateClientHandler
  );
}

export default clientRoutes;
