import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createTransactionSchema = z.object({
  id_veiculos: z.number().nullable(),
  id_produto: z.number().nullable(),
  id_pessoa: z.number({ required_error: "Cliente/Fornecedor é requerido." }),
  tipo: z.enum(["Compra", "Venda"], {
    required_error: "Tipo é requerido.(Compra ou Venda)",
  }),
  valor: z.number({
    required_error: "Valor é requerido.",
  }),
  data_transacao: z.date(),
  documento: z.string().nullable(),
  tipo_documento: z.number().nullable(),
  status_pagamento: z.enum(["Recebida", "Paga", "Em_Aberto"], {
    required_error: "Status é requerido.",
  }),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

export const { schemas: transactionSchemas, $ref } = buildJsonSchemas({
  createTransactionSchema,
});
