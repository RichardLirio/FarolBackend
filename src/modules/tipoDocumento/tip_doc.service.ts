import { prisma } from "../../utils/prisma";
import { CreateTipDocInput } from "./tip_doc.schema";

//Serviços de querys dentro do banco de dados
export async function createTipDoc(input: CreateTipDocInput) {
  const tipdoc = await prisma.tipodocumento.create({
    data: input,
  });

  return tipdoc;
}

export async function findTipDocs() {
  const tipdocs = await prisma.tipodocumento.findMany();

  return tipdocs;
}

export async function deleteTipDoc(id_tipo_doc: number) {
  const tipdoc = await prisma.tipodocumento.delete({
    where: {
      id_tipo_doc,
    },
    select: {
      id_tipo_doc: true,
      descricao: true,
    },
  });

  return tipdoc;
}

export async function updateTipDoc(
  input: CreateTipDocInput,
  id_tipo_doc: number
) {
  const tipdoc = await prisma.tipodocumento.update({
    data: input,
    where: {
      id_tipo_doc,
    },
  });

  return tipdoc;
}
