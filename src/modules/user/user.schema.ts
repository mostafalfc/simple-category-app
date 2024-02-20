import { FastifySchema } from 'fastify';
export const CreateUserSchema: FastifySchema = {
  tags: ['user'],
  body: {
    type: 'object',
    properties: {
      email: { type: 'string', nullable: false },
      name: { type: 'string' },
      password: { type: 'string', nullable: false },
    },
    required: ['email', 'password'],
    additionalProperties: false,
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
    },
  },
};

export const LoginSchema: FastifySchema = {
  tags: ['user'],
  body: {
    type: 'object',
    properties: {
      email: { type: 'string', nullable: false },
      password: { type: 'string', nullable: false },
    },
    required: ['email', 'password'],
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
  },
};
