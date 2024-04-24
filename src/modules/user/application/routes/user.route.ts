import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller';
import { LoginValidationSchema } from '../validations/login-validation.schema';
import { CreateUserValidationSchema } from '../validations/create-user-validation.schema';

const controller = new UserController();
async function UserRoutes(app: FastifyInstance) {
  app.post(
    '/',
    {
      schema: CreateUserValidationSchema,
    },
    controller.createUserHandler,
  );
  app.post('/login', { schema: LoginValidationSchema }, controller.loginHandler);
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
