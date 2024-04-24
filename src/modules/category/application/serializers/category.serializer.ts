import { CategoryInterface } from '../../domain/interfaces/category.interface';
import { UserSerializer } from '../../../user/application/serializers/user.serializer';

export class CategorySerializer {
  constructor(entity: Partial<CategoryInterface>) {
    this.id = entity.id;
    this.created_at = entity.created_at;
    this.latitude = entity.latitude;
    this.longitude = entity.longitude;
    this.category = entity.category;
    this.counter = entity.counter;
    if (entity.user) {
      this.user = new UserSerializer(entity.user);
    }
  }
  id?: number;
  created_at?: Date;
  latitude?: number | null;
  longitude?: number | null;
  category?: string;
  counter?: number | null;
  user?: UserSerializer;
}
