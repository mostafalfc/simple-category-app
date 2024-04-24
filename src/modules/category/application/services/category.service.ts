import { ErrorMessages } from '../../../../global/enums/error-messages.enum';
import { ChangeCategoryCounterRequestDto } from '../dtos/requests/change-category-counter.request.dto';
import { CreateCategoryRequestDto } from '../dtos/requests/create-category.request.dto';
import { CategoryRepositoryInterface } from '../../domain/repositories/category-repository.interface';
import { CategoryRepository } from '../../infrastructure/repositories/category.repository';
import { Category } from '../../domain/models/category.model';

export class CategoryService {
  categoryRepository: CategoryRepositoryInterface = new CategoryRepository();
  async create(input: CreateCategoryRequestDto, userId: number): Promise<Category> {
    return await this.categoryRepository.create(input, userId);
  }

  async getCategories(): Promise<Partial<Category>[]> {
    return await this.categoryRepository.getCategories();
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepository.getCategoryById(id);
    if (!category) {
      throw new Error(ErrorMessages.CATEGORY_NOT_FOUND);
    }
    return category;
  }

  async changeCategoryCounter(input: ChangeCategoryCounterRequestDto): Promise<Category> {
    return await this.categoryRepository.changeCategoryCounter(input);
  }
}
