import { User } from '@prisma/client';
import { UserInterface } from '../../../user/domain/interface/user.interface';

export interface CategoryInterface {
  id: number;
  created_at: Date;
  updated_at: Date;
  latitude: number | null;
  longitude: number | null;
  category: string;
  counter: number | null;
  user?: UserInterface | null;
  user_id: number | null;
}
