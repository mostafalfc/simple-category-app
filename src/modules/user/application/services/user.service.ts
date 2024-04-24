import { app } from '../../../../app';
import { ErrorMessages } from '../../../../global/enums/error-messages.enum';
import { Hash } from '../../../../global/utils/hash';
import { CreateUserDto } from '../dtos/requests/create-user.request.dto';
import { LoginRequestDto } from '../dtos/requests/login.request.dto';
import { LoginResponseDto } from '../dtos/responses/login.response.dto';
import { UserRepositoryInterface } from '../../domain/repositories/user-repository.interface';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { User } from '../../domain/models/user.model';

export class UserService {
  hash = new Hash();
  userRepository: UserRepositoryInterface = new UserRepository();
  async create(input: CreateUserDto): Promise<User> {
    const { password, ...rest } = input;
    const { salt, hash } = await this.hash.hashPassword(password);
    return await this.userRepository.create({ salt, password: hash, ...rest });
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error(ErrorMessages.USER_NOT_FOUND);
    }
    return user;
  }

  async login(input: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.findUserByEmail(input.email);

    const is_password_correct = await this.hash.verifyPassword({
      user_password: input.password,
      hash: user.password,
      salt: user.salt,
    });

    if (!is_password_correct) {
      throw new Error(ErrorMessages.INVALID_LOGIN);
    }

    const { password, salt, ...rest } = user;
    return { token: `Bearer ${app.jwt.sign(rest)}` };
  }
}
