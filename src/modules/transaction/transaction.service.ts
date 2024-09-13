import { prisma } from "../../utils/prisma";
import { CreateTransactionInput } from "./transaction.schema";

export async function createTransaction(input: CreateTransactionInput) {
  const transaction = await prisma.transacoes.create({ data: input });

  return transaction;
}
