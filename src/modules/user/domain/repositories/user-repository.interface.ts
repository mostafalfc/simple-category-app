import { CreateUserDto } from '../../application/dtos/requests/create-user.request.dto';
import { User } from '@prisma/client';
import { UserInterface } from '../interface/user.interface';
import { CreateUserInterface } from '../interface/create-user.interface';

export interface UserRepositoryInterface {
  create(data: CreateUserInterface): Promise<UserInterface>;
  findUserByEmail(email: string): Promise<UserInterface | null>;
}
