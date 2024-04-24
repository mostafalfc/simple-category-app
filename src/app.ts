import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import configurations from './configs/configurations';
import CategoryRoutes from './modules/category/application/routes/category.route';
import { ChangeCategoryCounterValidationSchema } from './modules/category/application/validations/change-category-counter-validation.schema';
import UserRoutes from './modules/user/application/routes/user.route';
import { LoginValidationSchema } from './modules/user/application/validations/login-validation.schema';
import { CreateCategoryValidationSchema } from './modules/category/application/validations/create-category-validation.schema';
import { CreateUserValidationSchema } from './modules/user/application/validations/create-user-validation.schema';
import { GlobalErrorResponse } from './global/responses/global-error';

export const app: FastifyInstance = fastify();

declare module 'fastify' {
  export interface FastifyInstance {
    auth: any;
  }
}
// Register parent error handler
app.setErrorHandler((error, request, reply) => {
  GlobalErrorResponse(reply, error.message);
});

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
  app.addSchema({ schema: CreateUserValidationSchema, $id: 'CreateUserValidationSchema' });
  app.addSchema({ schema: LoginValidationSchema, $id: 'LoginValidationSchema' });
  app.addSchema({
    schema: CreateCategoryValidationSchema,
    $id: 'CreateCategoryValidationSchema',
  });
  app.addSchema({
    schema: ChangeCategoryCounterValidationSchema,
    $id: 'ChangeCategoryCounterValidationSchema',
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
