import { CategoryInterface } from '../interfaces/category.interface';
import { User } from '../../../user/domain/models/user.model';

export class Category implements CategoryInterface {
  category!: string;
  counter?: number | null;
  created_at!: Date;
  id!: number;
  latitude?: number | null;
  longitude?: number | null;
  updated_at!: Date;
  user?: User | null;
  user_id?: number | null;
}
