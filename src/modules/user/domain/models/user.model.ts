import { UserInterface } from '../interface/user.interface';
import { Category } from '../../../category/domain/models/category.model';

export class User implements UserInterface {
  categories?: Category[] | null;
  email!: string;
  id!: number;
  name?: string | null;
  password!: string;
  salt!: string;
}
