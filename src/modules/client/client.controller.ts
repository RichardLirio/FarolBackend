import { FastifyReply, FastifyRequest } from "fastify";
import { findClients, createClient } from "./client.service";
import { CreateClientInput } from "./client.schema";

//HANDLES QUE DEVEM OBDECER AS REGRAS DAS ROTAS E FAZER CONTATO COM O SERVICE.TS(QUERYS PARA O SQL)

//criação de clients/fornecedor
export async function registerClientHandler(
  request: FastifyRequest<{ Body: CreateClientInput }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const client = await createClient(body);
    return reply.code(201).send(client);
  } catch (error) {
    reply.code(500).send(error);
  }
}

//lista de clients/fornecedor
export async function getClientsHanlder() {
  const users = await findClients();

  return users;
}
