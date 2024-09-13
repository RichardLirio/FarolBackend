import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createVeiculoSchema = z.object({
  modelo: z.string({ required_error: "Modelo é requerido." }),
  marca: z.string({ required_error: "Marca é requerido." }),
  ano: z.number().int().lte(9999),
  cor: z.string().nullable(),
  valor_compra: z.number({ required_error: "Valor de compra é requerido." }),
  renavam: z.string().nullable(),
  chassi: z.string().nullable(),
  quilometragem: z.number().nullable(),
  status: z.enum(["vendido", "disponivel", "manutencao"]),
  tipo_combustivel: z.string().nullable(),
  placa: z
    .string({ required_error: "Placa é requerida" })
    .max(7)
    .min(7)
    .toUpperCase(),
});

export type CreateVeiculoInput = z.infer<typeof createVeiculoSchema>;

export const { schemas: veiculoSchemas, $ref } = buildJsonSchemas({
  createVeiculoSchema,
});
