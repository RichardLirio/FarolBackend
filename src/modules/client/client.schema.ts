import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createClientSchema = z.object({
  nome: z.string({
    required_error: "Nome é requerido.",
  }),
  endereco: z.string(),
  telefone: z.string().nullable(),
  cnpj_cpf: z.string({ required_error: "Cpf ou Cnpj são requeridos." }),
  email: z.string().email().nullable(),
  inscricao_estadual: z.string().nullable(),
  tipo: z.enum(["Pessoa_Fisica", "Pessoa_Juridica"], {
    required_error: "Tipo é requerido.(Pessoa Física ou Pessoa Jurídica)",
  }),
  cidade: z.string({
    required_error: "Cidade é requirida.",
  }),
  uf: z.string({
    required_error: "UF é requerida.",
  }),
  cep: z.string({
    required_error: "CEP é requerido.",
  }),
  bairro: z.string({
    required_error: "Bairro é requerido.",
  }),
});

const defaultClientSchemaQuery = z.object({
  id_pessoa: z.number(),
});

const defaultClientSchemarResponse = z.object({
  message: z.string(),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;

export type defaultClientQuery = z.infer<typeof defaultClientSchemaQuery>;

export const { schemas: clientSchemas, $ref } = buildJsonSchemas({
  createClientSchema,
  defaultClientSchemaQuery,
  defaultClientSchemarResponse,
});
