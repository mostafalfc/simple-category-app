import { CategoryInterface } from '../../../category/domain/interfaces/category.interface';

export interface UserInterface {
  id: number;
  email: string;
  name?: string | null;
  password: string;
  salt: string;
  categories?: CategoryInterface[] | null;
}
