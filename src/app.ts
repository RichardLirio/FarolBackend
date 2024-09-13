import fastify, { FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./modules/user/user.route";

import fjwt from "@fastify/jwt";
import clientRoutes from "./modules/client/client.route";

export const app = fastify();

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

app.register(fjwt, {
  secret: "djsiao543jioj53mniofds54u3mko654m213214mkdsa342",
});

app.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      return reply.send(error);
    }
  }
);

//rota para verificação do estado do servidor
app.get("/healthcheck", async function () {
  return {
    status: "OK",
  };
});

async function main() {
  app.register(import("@fastify/swagger"));
  app.register(import("@fastify/swagger-ui"), {
    routePrefix: "/documentation",
  });

  app.register(userRoutes, { prefix: "api/users" });
  app.register(clientRoutes, { prefix: "api/clients" });

  try {
    await app.listen({
      port: 3100,
      host: "0.0.0.0",
    });
    console.log("Server is running on port 3100");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
main();
