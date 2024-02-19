import { User } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from '../user/user.service';
import { CategoryService } from './category.service';
import { ChangeCategoryCounterRequestDto } from './dtos/requests/change-category-counter.request.dto';
import { CreateCategoryRequestDto } from './dtos/requests/create-category.request.dto';

export class CategoryController {
  async createCategoryHandler(
    request: FastifyRequest<{ Body: CreateCategoryRequestDto }>,
    reply: FastifyReply,
  ) {
    try {
      const token_decode = (await request.jwtDecode()) as User;
      const user = await new UserService().findUserByEmail(token_decode.email);
      const category = await new CategoryService().create(
        request.body,
        user.id,
      );
      reply.code(201).send(category);
    } catch (error) {
      console.log(error);
      reply.code(500).send(error);
    }
  }

  async getCategoriesHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      reply.code(200).send(await new CategoryService().getCategories());
    } catch (error) {
      reply.code(500).send(error);
    }
  }

  async getCategoryByIdHandler(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
  ) {
    try {
      reply
        .code(200)
        .send(await new CategoryService().getCategoryById(request.params.id));
    } catch (error) {
      reply.code(500).send(error);
    }
  }

  async changeCategoryCounter(
    request: FastifyRequest<{ Body: ChangeCategoryCounterRequestDto }>,
    reply: FastifyReply,
  ) {
    try {
      const category = new CategoryService().changeCategoryCounter(
        request.body,
      );
      reply.code(200).send({ id: (await category).id });
    } catch (error) {
      reply.code(500).send(error);
    }
  }
}
