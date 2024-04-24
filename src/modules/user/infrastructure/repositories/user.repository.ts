import { User } from '@prisma/client';
import { app } from '../../../../app';
import { ErrorMessages } from '../../../../global/enums/error-messages.enum';
import { Hash } from '../../../../global/utils/hash';
import prisma from '../../../../global/utils/prisma';
import { CreateUserDto } from '../../application/dtos/requests/create-user.request.dto';
import { LoginRequestDto } from '../../application/dtos/requests/login.request.dto';
import { UserRepositoryInterface } from '../../domain/repositories/user-repository.interface';
import { CreateUserInterface } from '../../domain/interface/create-user.interface';

export class UserRepository implements UserRepositoryInterface {
  async create(data: CreateUserInterface): Promise<User> {
    return await prisma.user.create({
      data,
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
      select: {
        name: true,
        email: true,
        password: true,
        salt: true,
        id: true,
        categories: {
          select: {
            category: true,
          },
        },
      },
    });
  }
}
