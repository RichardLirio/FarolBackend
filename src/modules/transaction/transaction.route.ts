import { FastifyInstance } from "fastify";
import { createTransactionHandler } from "./transaction.controller";
import { $ref, transactionSchemas } from "./transaction.schema";

async function transactionRoutes(server: FastifyInstance) {
  for (const schema of transactionSchemas) {
    server.addSchema(schema);
  }
  //criação de transações
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: $ref("createTransactionSchema"),
    },
    createTransactionHandler
  );
}

export default transactionRoutes;
