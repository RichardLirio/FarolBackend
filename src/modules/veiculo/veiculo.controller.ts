import { FastifyReply, FastifyRequest } from "fastify";
import { CreateVeiculoInput } from "./veiculo.schema";
import { createVeiculo } from "./veiculo.service";

export async function createVeiculoHandler(
  request: FastifyRequest<{ Body: CreateVeiculoInput }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const veiculo = await createVeiculo(body);
    reply.code(201).send(veiculo);
  } catch (error) {
    reply.code(500).send(error);
  }
}
