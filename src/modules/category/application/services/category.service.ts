import { Category } from '@prisma/client';
import { ErrorMessages } from '../../../../global/enums/error-messages.enum';
import prisma from '../../../../global/utils/prisma';
import { ChangeCategoryCounterRequestDto } from '../dtos/requests/change-category-counter.request.dto';
import { CreateCategoryRequestDto } from '../dtos/requests/create-category.request.dto';
import { CategoryInterface } from '../../domain/interfaces/category.interface';
import { CategoryRepositoryInterface } from '../../domain/repositories/category-repository.interface';
import { CategoryRepository } from '../../infrastructure/repositories/category.repository';

export class CategoryService {
  categoryRepository: CategoryRepositoryInterface = new CategoryRepository();
  async create(input: CreateCategoryRequestDto, userId: number): Promise<CategoryInterface> {
    return await this.categoryRepository.create(input, userId);
  }

  async getCategories(): Promise<Partial<CategoryInterface>[]> {
    return await this.categoryRepository.getCategories();
  }

  async getCategoryById(id: number): Promise<CategoryInterface> {
    const category = await this.categoryRepository.getCategoryById(id);
    if (!category) {
      throw new Error(ErrorMessages.CATEGORY_NOT_FOUND);
    }
    return category;
  }

  async changeCategoryCounter(input: ChangeCategoryCounterRequestDto): Promise<CategoryInterface> {
    return await this.categoryRepository.changeCategoryCounter(input);
  }
}
