import { prisma } from "../../utils/prisma";
import { CreateVeiculoInput } from "./veiculo.schema";

export async function createVeiculo(input: CreateVeiculoInput) {
  const veiculo = await prisma.veiculos.create({ data: input });
  return veiculo;
}
