import { CreateCategoryRequestDto } from '../../application/dtos/requests/create-category.request.dto';
import { Category } from '@prisma/client';
import { CategoryInterface } from '../interfaces/category.interface';
import { ChangeCategoryCounterRequestDto } from '../../application/dtos/requests/change-category-counter.request.dto';

export interface CategoryRepositoryInterface {
  create(input: CreateCategoryRequestDto, userId: number): Promise<CategoryInterface>;
  getCategories(): Promise<Partial<CategoryInterface>[]>;
  getCategoryById(id: number): Promise<CategoryInterface | null>;
  changeCategoryCounter(input: ChangeCategoryCounterRequestDto): Promise<CategoryInterface>;
}
