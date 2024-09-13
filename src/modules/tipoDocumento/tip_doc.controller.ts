import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTipDocInput, defaultTipDocQuery } from "./tip_doc.schema";
import {
  createTipDoc,
  deleteTipDoc,
  findTipDocs,
  updateTipDoc,
} from "./tip_doc.service";

//Criação de tipo de documentos
export async function createTipDocHandler(
  request: FastifyRequest<{
    Body: CreateTipDocInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const tipdoc = await createTipDoc(body);
    return reply.code(201).send(tipdoc);
  } catch (error) {
    reply.code(500).send(error);
  }
}
//Busca de tipo de documentos
export async function getTipDocsHandler() {
  const tipdocs = await findTipDocs();

  return tipdocs;
}

//deleta tipo de documentos
export async function deleteTipDocHandler(
  request: FastifyRequest<{
    Querystring: defaultTipDocQuery;
  }>,
  reply: FastifyReply
) {
  const codigo = request.query.id_tipo_doc;

  try {
    const resp = await deleteTipDoc(codigo);
    return {
      message: ` Tipo de documento '${resp.descricao}' excluído com sucesso.`,
    };
  } catch (error) {
    reply.code(500).send(error);
  }
}

//update tipo documento
export async function updateTipDocHandler(
  request: FastifyRequest<{
    Body: CreateTipDocInput;
    Querystring: defaultTipDocQuery;
  }>,
  reply: FastifyReply
) {
  const body = request.body;
  const id_tipo_doc = request.query.id_tipo_doc;

  try {
    const tipdoc = await updateTipDoc(body, id_tipo_doc);
    return reply.code(201).send(tipdoc);
  } catch (error) {
    reply.code(500).send(error);
  }
}
