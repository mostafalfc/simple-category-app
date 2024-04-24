import { User } from '@prisma/client';
import { UserInterface } from '../../domain/interface/user.interface';
import { CategorySerializer } from '../../../category/application/serializers/category.serializer';

export class UserSerializer {
  constructor(entity: Partial<UserInterface>) {
    this.id = entity.id;
    this.email = entity.email;
    this.name = entity.name;
    this.categories = entity.categories?.map((category) => new CategorySerializer(category));
  }

  id?: number;
  email?: string;
  name?: string | null;
  categories?: CategorySerializer[] | null;
}
