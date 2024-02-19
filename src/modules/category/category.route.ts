import { FastifyInstance } from 'fastify';
import { CategoryController } from './category.controller';
import {
  ChangeCategoryCounterSchema,
  CreateCategorySchema,
} from './category.schema';

const controller = new CategoryController();
async function CategoryRoutes(app: FastifyInstance) {
  app.post(
    '/',
    { schema: CreateCategorySchema, preHandler: app.auth },
    controller.createCategoryHandler,
  );

  app.get('/', { preHandler: app.auth }, controller.getCategoriesHandler);

  app.get('/:id', { preHandler: app.auth }, controller.getCategoryByIdHandler);

  app.post(
    '/counter',
    { schema: ChangeCategoryCounterSchema, preHandler: app.auth },
    controller.changeCategoryCounter,
  );
}

export default CategoryRoutes;