import { FastifyReply, FastifyRequest } from "fastify";
import {
  findClients,
  createClient,
  deleteClient,
  updateClient,
} from "./client.service";
import { CreateClientInput, defaultClientQuery } from "./client.schema";

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

// //Deletas clients
export async function deleteClientHandler(
  request: FastifyRequest<{
    Querystring: defaultClientQuery;
  }>,
  reply: FastifyReply
) {
  const codigo = request.query.id_pessoa;

  try {
    const resp = await deleteClient(codigo);
    return {
      message: `Client/Fornecedor '${resp.nome}' excluído com sucesso.`,
    };
  } catch (error) {
    reply.code(500).send(error);
  }
}

//update Client
export async function updateClientHandler(
  request: FastifyRequest<{
    Body: CreateClientInput;
    Querystring: defaultClientQuery;
  }>,
  reply: FastifyReply
) {
  const body = request.body;
  const id = request.query.id_pessoa;
  try {
    const client = await updateClient(body, id);
    return reply.code(201).send(client);
  } catch (error) {
    reply.code(500).send(error);
  }
}
