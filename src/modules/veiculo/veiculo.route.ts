import { FastifyInstance } from "fastify";
import { createVeiculoHandler } from "./veiculo.controller";
import { $ref, veiculoSchemas } from "./veiculo.schema";

async function veiculoRoutes(server: FastifyInstance) {
  for (const schema of veiculoSchemas) {
    server.addSchema(schema);
  }
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createVeiculoSchema"),
      },
    },
    createVeiculoHandler
  );
}

export default veiculoRoutes;
