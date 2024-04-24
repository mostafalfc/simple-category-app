import { User } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserDto } from '../dtos/requests/create-user.request.dto';
import { LoginRequestDto } from '../dtos/requests/login.request.dto';
import { UserService } from '../services/user.service';
import { GlobalSuccessResponse } from '../../../../global/responses/global-response';
import { UserSerializer } from '../serializers/user.serializer';

export class UserController {
  async createUserHandler(request: FastifyRequest<{ Body: CreateUserDto }>, reply: FastifyReply) {
    const user = await new UserService().create(request.body);
    GlobalSuccessResponse(reply, 201, new UserSerializer(user));
  }

  async loginHandler(request: FastifyRequest<{ Body: LoginRequestDto }>, reply: FastifyReply) {
    const login = await new UserService().login(request.body);
    GlobalSuccessResponse(reply, 200, login);
  }

  async getUserHandler(request: FastifyRequest, reply: FastifyReply) {
    const token_decode = (await request.jwtDecode()) as User;
    const user = await new UserService().findUserByEmail(token_decode.email);
    GlobalSuccessResponse(reply, 200, new UserSerializer(user));
  }
}
