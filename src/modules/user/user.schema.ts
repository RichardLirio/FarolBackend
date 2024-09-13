import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";
//SCHEMAS E OBJETOS QUE SERÃO UTILIZADOS NAS REGRAS DE NEGOCIOS DAS ROTAS
const userCore = {
  nome: z.string({
    required_error: "Nome é requerido.",
  }),
  login: z.string({
    required_error: "Login é requerido.",
  }),
  tipo_usuario: z.enum(["Vendedor", "Administrador"], {
    required_error: "Tipo de Usuário é requerido.(Vendedor ou Administrador)",
  }),
  status: z.enum(["Ativo", "Inativo"], {
    required_error: "Status é requerido.",
  }),
};

const createUserSchema = z.object({
  ...userCore,
  senha: z.string({
    required_error: "Senha é requerido.",
    invalid_type_error: "Password must be a string",
  }),
});

const createUserResponseSchema = z.object({
  id_usuario: z.number(),
  ...userCore,
});

const loginSchema = z.object({
  login: z.string({
    required_error: "Login é requerido.",
  }),
  senha: z.string({
    required_error: "Senha é requerido.",
    invalid_type_error: "Password must be a string",
  }),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
});

const defaultUserSchemaQuery = z.object({
  id_usuario: z.number(),
});

const defaultUserSchemarResponse = z.object({
  message: z.string(),
});

const updateUserSchema = z.object({
  ...userCore,
  senha: z.string({
    required_error: "Senha é requerido.",
    invalid_type_error: "Password must be a string",
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export type defaultUserQuery = z.infer<typeof defaultUserSchemaQuery>;

export type updateUserinput = z.infer<typeof updateUserSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
  defaultUserSchemaQuery,
  defaultUserSchemarResponse,
  updateUserSchema,
});
