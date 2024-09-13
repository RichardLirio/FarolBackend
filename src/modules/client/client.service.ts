import { prisma } from "../../utils/prisma";
import { CreateClientInput } from "./client.schema";

export async function createClient(input: CreateClientInput) {
  const client = await prisma.pessoas.create({ data: input });

  return client;
}

export async function findClients() {
  return prisma.pessoas.findMany({
    select: {
      id_pessoa: true,
      nome: true,
      endereco: true,
      cnpj_cpf: true,
      email: true,
      inscricao_estadual: true,
      tipo: true,
      bairro: true,
      cidade: true,
      uf: true,
      cep: true,
      telefone: true,
      transacoes: true,
    },
  });
}
