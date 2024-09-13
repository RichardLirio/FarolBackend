import { prisma } from "../../utils/prisma";
import { hashPassword } from "../../utils/hash";
import { CreateUserInput, updateUserinput } from "./user.schema";

//Serviços de querys dentro do banco de dados
export async function createUser(input: CreateUserInput) {
  const { senha, ...rest } = input;

  const { hash, salt } = hashPassword(senha);

  const user = await prisma.usuarios.create({
    data: { ...rest, salt, senha: hash },
  });

  return user;
}

export async function findUserByLogin(login: string) {
  const user = await prisma.usuarios.findFirst({
    where: {
      login,
    },
  });

  return user || null;
}

export async function findUsers() {
  return prisma.usuarios.findMany({
    select: {
      id_usuario: true,
      nome: true,
      login: true,
      tipo_usuario: true,
      status: true,
    },
  });
}

export async function deleteUser(id_usuario: number) {
  return prisma.usuarios.delete({
    where: {
      id_usuario,
    },
    select: {
      nome: true,
      login: true,
      tipo_usuario: true,
    },
  });
}

export async function updateUser(input: updateUserinput, id_usuario: number) {
  const { senha, ...rest } = input;

  const { hash, salt } = hashPassword(senha);
  const user = await prisma.usuarios.update({
    data: { ...rest, salt, senha: hash },
    where: {
      id_usuario,
    },
  });
  return user;
}
