import { CategoryInterface } from '../../../category/domain/interfaces/category.interface';

export interface CreateUserInterface {
  email: string;
  name?: string | null;
  password: string;
  salt: string;
}
