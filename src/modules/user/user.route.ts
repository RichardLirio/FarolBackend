import { FastifyInstance } from "fastify";
import {
  registerUserHandler,
  loginHandler,
  getUsersHanlder,
  deleteUserHandler,
  updateUserHandler,
} from "./user.controller";
import { $ref } from "./user.schema";
import { userSchemas } from "./user.schema";
//ROTAS COM ENDPOINT, REGRAS DE NEGOCIOS PARA CADA ENDPOINT PARA CONTROLE DE USUARIOS
async function userRoutes(server: FastifyInstance) {
  for (const schema of userSchemas) {
    server.addSchema(schema);
  }
  //crete user
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("createUserResponseSchema"),
        },
      },
    },
    registerUserHandler
  );
  //login user
  server.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
        response: {
          200: $ref("loginResponseSchema"),
        },
      },
    },
    loginHandler
  );
  // //list all users
  server.get(
    "/",
    {
      preHandler: [server.authenticate],
    },
    getUsersHanlder
  );
  // //delete user
  server.delete(
    "/",
    {
      schema: {
        querystring: $ref("defaultUserSchemaQuery"),
        response: { 204: $ref("defaultUserSchemarResponse") },
      },
      preHandler: [server.authenticate],
    },
    deleteUserHandler
  );
  //update user
  server.put(
    "/",
    {
      schema: {
        body: $ref("updateUserSchema"),
        querystring: $ref("defaultUserSchemaQuery"),
        response: {
          201: $ref("createUserResponseSchema"),
        },
      },
      preHandler: [server.authenticate],
    },
    updateUserHandler
  );
}

export default userRoutes;
