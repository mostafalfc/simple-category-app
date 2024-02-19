import fastifyJwt from '@fastify/jwt';
import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import configurations from './configs/configurations';
import CategoryRoutes from './modules/category/category.route';
import {
  ChangeCategoryCounterSchema,
  CreateCategorySchema,
} from './modules/category/category.schema';
import UserRoutes from './modules/user/user.route';
import { CreateUserSchema, LoginSchema } from './modules/user/user.schema';

export const app: FastifyInstance = fastify();

declare module 'fastify' {
  export interface FastifyInstance {
    auth: any;
  }
}

app.get('/', () => {
  return { status: 'OK' };
});

function registerRoutes(app: FastifyInstance) {
  app.register(UserRoutes, {
    prefix: configurations().routes.user_route,
  });
  app.register(CategoryRoutes, {
    prefix: configurations().routes.category_route,
  });
}

function addSchemas(app: FastifyInstance) {
  app.addSchema({ schema: CreateUserSchema, $id: 'CreateUserSchema' });
  app.addSchema({ schema: LoginSchema, $id: 'LoginSchema' });
  app.addSchema({ schema: CreateCategorySchema, $id: 'CreateCategorySchema' });
  app.addSchema({
    schema: ChangeCategoryCounterSchema,
    $id: 'ChangeCategoryCounterSchema',
  });
}

function registerJwt(app: FastifyInstance) {
  app.register(fastifyJwt, { secret: configurations().jwt_secret });
  app.decorate('auth', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      reply.send(error);
    }
  });
}

async function main() {
  try {
    const port = configurations().port;
    const host = configurations().host;

    registerJwt(app);
    registerRoutes(app);
    addSchemas(app);

    await app.listen({
      port: +port,
      host: host,
    });
    console.log(`Server started at http://${host}:${port}/docs`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
