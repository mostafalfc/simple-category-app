import { CategorySerializer } from '../../../category/application/serializers/category.serializer';
import { User } from '../../domain/models/user.model';

export class UserSerializer {
  constructor(entity: Partial<User>) {
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
