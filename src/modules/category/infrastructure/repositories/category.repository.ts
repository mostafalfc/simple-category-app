import { Category } from '@prisma/client';
import { CreateCategoryRequestDto } from '../../application/dtos/requests/create-category.request.dto';
import prisma from '../../../../global/utils/prisma';
import { ErrorMessages } from '../../../../global/enums/error-messages.enum';
import { ChangeCategoryCounterRequestDto } from '../../application/dtos/requests/change-category-counter.request.dto';
import { CategoryRepositoryInterface } from '../../domain/repositories/category-repository.interface';

export class CategoryRepository implements CategoryRepositoryInterface {
  async create(input: CreateCategoryRequestDto, userId: number): Promise<Category> {
    return await prisma.category.create({
      data: { user_id: userId, ...input },
    });
  }

  async getCategories(): Promise<Partial<Category>[]> {
    return await prisma.category.findMany({
      select: {
        id: true,
        latitude: true,
        longitude: true,
        category: true,
        counter: true,
        user: {
          select: {
            email: true,
            name: true,
            id: true,
          },
        },
      },
    });
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return await prisma.category.findUnique({ where: { id: +id } });
  }

  async changeCategoryCounter(input: ChangeCategoryCounterRequestDto): Promise<Category> {
    return await prisma.category.update({
      where: { id: input.id },
      data: { counter: input.value },
    });
  }
}
