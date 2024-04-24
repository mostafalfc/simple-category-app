import { User } from '@prisma/client';
import prisma from '../../../../global/utils/prisma';
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
