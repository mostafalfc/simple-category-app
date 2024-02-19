import { Category } from '@prisma/client';
import { ErrorMessages } from '../../global/enums/error-messages.enum';
import prisma from '../../global/utils/prisma';
import { ChangeCategoryCounterRequestDto } from './dtos/requests/change-category-counter.request.dto';
import { CreateCategoryRequestDto } from './dtos/requests/create-category.request.dto';

export class CategoryService {
  async create(
    input: CreateCategoryRequestDto,
    userId: number,
  ): Promise<Category> {
    return await prisma.category.create({
      data: { user_id: userId, ...input },
    });
  }

  async getCategories(): Promise<Partial<Category>[]> {
    return await prisma.category.findMany({
      select: {
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

  async getCategoryById(id: number): Promise<Category> {
    const category = await prisma.category.findUnique({ where: { id: +id } });
    if (!category) {
      throw new Error(ErrorMessages.CATEGORY_NOT_FOUND);
    }
    return category;
  }

  async changeCategoryCounter(
    input: ChangeCategoryCounterRequestDto,
  ): Promise<Category> {
    const category = await prisma.category.update({
      where: { id: input.id },
      data: { counter: input.value },
    });
    return category;
  }
}
