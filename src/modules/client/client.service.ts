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

export async function deleteClient(id_pessoa: number) {
  const client = await prisma.pessoas.delete({
    where: {
      id_pessoa,
    },
    select: {
      id_pessoa: true,
      nome: true,
      cnpj_cpf: true,
    },
  });
  return client;
}

export async function updateClient(
  input: CreateClientInput,
  id_pessoa: number
) {
  const client = await prisma.pessoas.update({
    data: input,
    where: {
      id_pessoa,
    },
  });
  return client;
}
