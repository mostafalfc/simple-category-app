import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
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

function registerSwagger(app: FastifyInstance) {
  app.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Categories',
        description: 'Categories app swagger API',
        version: '0.1.0',
      },

      tags: [
        { name: 'user', description: 'User related end-points' },
        { name: 'category', description: 'Category related end-points' },
      ],
      securityDefinitions: {
        ApiToken: {
          type: 'apiKey',
          name: 'authorization',
          in: 'header',
        },
      },
    },
  });
  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
}
async function main() {
  try {
    const port = configurations().port;
    const host = configurations().host;

    registerSwagger(app);

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
