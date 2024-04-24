import { User } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from '../../../user/application/services/user.service';
import { CategoryService } from '../services/category.service';
import { ChangeCategoryCounterRequestDto } from '../dtos/requests/change-category-counter.request.dto';
import { CreateCategoryRequestDto } from '../dtos/requests/create-category.request.dto';
import { GlobalSuccessResponse } from '../../../../global/responses/global-response';
import { GlobalErrorResponse } from '../../../../global/responses/global-error';
import { CategorySerializer } from '../serializers/category.serializer';

export class CategoryController {
  async createCategoryHandler(
    request: FastifyRequest<{ Body: CreateCategoryRequestDto }>,
    reply: FastifyReply,
  ) {
    const token_decode = (await request.jwtDecode()) as User;
    const user = await new UserService().findUserByEmail(token_decode.email);
    const category = await new CategoryService().create(request.body, user.id);

    GlobalSuccessResponse(reply, 201, new CategorySerializer(category));
  }

  async getCategoriesHandler(request: FastifyRequest, reply: FastifyReply) {
    const categories = await new CategoryService().getCategories();
    GlobalSuccessResponse(
      reply,
      200,
      categories.map((category) => new CategorySerializer(category)),
    );
  }

  async getCategoryByIdHandler(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
  ) {
    const category = await new CategoryService().getCategoryById(request.params.id);
    GlobalSuccessResponse(reply, 200, new CategorySerializer(category));
  }

  async changeCategoryCounter(
    request: FastifyRequest<{ Body: ChangeCategoryCounterRequestDto }>,
    reply: FastifyReply,
  ) {
    const category = await new CategoryService().changeCategoryCounter(request.body);
    GlobalSuccessResponse(reply, 200, new CategorySerializer(category));
  }
}
