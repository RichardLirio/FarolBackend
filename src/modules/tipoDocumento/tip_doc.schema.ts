import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createTipDocSchema = z.object({
  descricao: z.string({
    required_error: "Descrição é requerido.",
  }),
});

const defaultTipDocSchemaQuery = z.object({
  id_tipo_doc: z.number(),
});

const defaultTipDocSchemarResponse = z.object({
  message: z.string(),
});

export type CreateTipDocInput = z.infer<typeof createTipDocSchema>;

export type defaultTipDocQuery = z.infer<typeof defaultTipDocSchemaQuery>;

export const { schemas: tipDocSchemas, $ref } = buildJsonSchemas({
  createTipDocSchema,
  defaultTipDocSchemaQuery,
  defaultTipDocSchemarResponse,
});
