import { FastifyReply, FastifyRequest } from "fastify";
import {
  createUser,
  findUserByLogin,
  findUsers,
  deleteUser,
  updateUser,
} from "./user.service";
import {
  CreateUserInput,
  LoginInput,
  updateUserinput,
  defaultUserQuery,
} from "./user.schema";
import { verifyPassword } from "../../utils/hash";
import { app } from "../../app";

//HANDLES QUE DEVEM OBDECER AS REGRAS DAS ROTAS E FAZER CONTATO COM O SERVICE.TS(QUERYS PARA O SQL)

//Criação de usuarios
export async function registerUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (error) {
    reply.code(500).send(error);
  }
}
//Login de usuario
export async function loginHandler(
  request: FastifyRequest<{
    Body: LoginInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  //find user by login
  const user = await findUserByLogin(body.login);
  if (!user) {
    return reply.code(401).send({
      message: "Login ou senha de Invalidos!",
    });
  }

  //verify senha
  const correctPassWord = await verifyPassword({
    candidatePassword: body.senha,
    salt: user.salt,
    hash: user.senha,
  });

  if (correctPassWord) {
    const { senha, salt, ...rest } = user;
    //create accessToken
    //response
    return { accessToken: app.jwt.sign(rest) };
  }
  return reply.code(401).send({
    message: "NOME ou SENHA de Usuário Invalido!",
  });
}
// //Busca de usuarios
export async function getUsersHanlder() {
  const users = await findUsers();

  return users;
}
// //Deletas usuarios
export async function deleteUserHandler(
  request: FastifyRequest<{
    Querystring: defaultUserQuery;
  }>,
  reply: FastifyReply
) {
  const codigo = request.query.id_usuario;

  try {
    const resp = await deleteUser(codigo);
    return {
      message: `Usuário '${resp.nome}' excluído com sucesso.`,
    };
  } catch (error) {
    reply.code(500).send(error);
  }
}
//update usuarios
export async function updateUserHandler(
  request: FastifyRequest<{
    Body: updateUserinput;
    Querystring: defaultUserQuery;
  }>,
  reply: FastifyReply
) {
  const codigo = request.query.id_usuario;
  const body = request.body;
  try {
    const user = await updateUser(body, codigo);
    return reply.code(201).send(user);
  } catch (error) {
    reply.code(500).send(error);
  }
}
