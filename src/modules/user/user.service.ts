import { User } from '@prisma/client';
import { app } from '../../app';
import { ErrorMessages } from '../../global/enums/error-messages.enum';
import { Hash } from '../../global/utils/hash';
import prisma from '../../global/utils/prisma';
import { CreateUserDto } from './dtos/requests/create-user.request.dto';
import { LoginRequestDto } from './dtos/requests/login.request.dto';
import { LoginResponseDto } from './dtos/responses/login.response.dto';

export class UserService {
  hash = new Hash();
  async createUser(input: CreateUserDto): Promise<User> {
    const { password, ...rest } = input;
    const { salt, hash } = await this.hash.hashPassword(password);
    const user = await prisma.user.create({
      data: { salt, password: hash, ...rest },
    });
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async login(input: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.findUserByEmail(input.email);
    if (!user) {
      throw new Error(ErrorMessages.INVALID_LOGIN);
    }

    const is_password_correct = await this.hash.verifyPassword({
      user_password: input.password,
      hash: user.password,
      salt: user.salt,
    });

    if (!is_password_correct) {
      throw new Error(ErrorMessages.INVALID_LOGIN);
    }

    const { password, salt, ...rest } = user;
    return { token: app.jwt.sign(rest) };
  }
}
