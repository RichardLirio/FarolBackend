import { FastifyInstance } from "fastify";
import { tipDocSchemas } from "./tip_doc.schema";
import {
  createTipDocHandler,
  getTipDocsHandler,
  deleteTipDocHandler,
  updateTipDocHandler,
} from "./tip_doc.controller";
import { $ref } from "./tip_doc.schema";

async function tipDocRoutes(server: FastifyInstance) {
  for (const schema of tipDocSchemas) {
    server.addSchema(schema);
  }
  //create tipo de documento
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createTipDocSchema"),
      },
    },
    createTipDocHandler
  );

  // //list all tipos de documentos
  server.get(
    "/",
    {
      preHandler: [server.authenticate],
    },
    getTipDocsHandler
  );

  //delete tipo documento
  server.delete(
    "/",
    {
      schema: {
        querystring: $ref("defaultTipDocSchemaQuery"),
        response: { 204: $ref("defaultTipDocSchemarResponse") },
      },
      preHandler: [server.authenticate],
    },
    deleteTipDocHandler
  );

  //update documento
  server.put(
    "/",
    {
      schema: {
        body: $ref("createTipDocSchema"),
        querystring: $ref("defaultTipDocSchemaQuery"),
      },
      preHandler: [server.authenticate],
    },
    updateTipDocHandler
  );
}

export default tipDocRoutes;
