import { FastifyReply, FastifyRequest } from "fastify";
import { createTransaction } from "./transaction.service";
import { CreateTransactionInput } from "./transaction.schema";

export async function createTransactionHandler(
  request: FastifyRequest<{ Body: CreateTransactionInput }>,
  reply: FastifyReply
) {
  const body = request.body;
  try {
    const transaction = await createTransaction(body);
    return reply.code(201).send(transaction);
  } catch (error) {
    reply.code(500).send(error);
  }
}
