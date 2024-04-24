import { FastifyInstance } from 'fastify';
import { CategoryController } from '../controllers/category.controller';
import { ChangeCategoryCounterValidationSchema } from '../validations/change-category-counter-validation.schema';
import { CreateCategoryValidationSchema } from '../validations/create-category-validation.schema';

const controller = new CategoryController();
async function CategoryRoutes(app: FastifyInstance) {
  app.post(
    '/',
    { schema: CreateCategoryValidationSchema, preHandler: app.auth },
    controller.createCategoryHandler,
  );

  app.get(
    '/',
    {
      preHandler: app.auth,
      schema: {
        security: [{ ApiToken: [] }],
        tags: ['category'],
      },
    },
    controller.getCategoriesHandler,
  );

  app.get(
    '/:id',
    {
      preHandler: app.auth,
      schema: {
        security: [{ ApiToken: [] }],
        tags: ['category'],
      },
    },
    controller.getCategoryByIdHandler,
  );

  app.post(
    '/counter',
    { schema: ChangeCategoryCounterValidationSchema, preHandler: app.auth },
    controller.changeCategoryCounter,
  );
}

export default CategoryRoutes;
