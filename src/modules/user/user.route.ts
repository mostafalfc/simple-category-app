import { FastifyInstance } from 'fastify';
import { UserController } from './user.controller';
import { CreateUserSchema, LoginSchema } from './user.schema';

const controller = new UserController();
async function UserRoutes(app: FastifyInstance) {
  app.post(
    '/',
    {
      schema: CreateUserSchema,
    },
    controller.createUserHandler,
  );
  app.post('/login', { schema: LoginSchema }, controller.loginHandler);
  app.get(
    '/',
    {
      preHandler: app.auth,
      schema: {
        tags: ['user'],
        security: [{ ApiToken: [] }],
      },
    },
    controller.getUserHandler,
  );
}

export default UserRoutes;
