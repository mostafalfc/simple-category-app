import { User } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserDto } from './dtos/requests/create-user.request.dto';
import { LoginRequestDto } from './dtos/requests/login.request.dto';
import { UserService } from './user.service';

export class UserController {
  async createUserHandler(
    request: FastifyRequest<{ Body: CreateUserDto }>,
    reply: FastifyReply,
  ) {
    try {
      const user = await new UserService().createUser(request.body);
      reply.code(201).send({ id: user.id });
    } catch (error) {
      console.log(error);

      reply.code(500).send(error);
    }
  }

  async loginHandler(
    request: FastifyRequest<{ Body: LoginRequestDto }>,
    reply: FastifyReply,
  ) {
    try {
      const login = await new UserService().login(request.body);
      reply.code(200).send(login);
    } catch (error) {
      console.log(error);
      reply.code(500).send(error);
    }
  }

  async getUserHandler(request: FastifyRequest, reply: FastifyReply) {
    const token_decode = (await request.jwtDecode()) as User;
    const user = await new UserService().findUserByEmail(token_decode.email);
    reply.code(200).send(user);
  }
}
