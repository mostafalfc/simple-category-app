import { FastifySchema } from 'fastify';

export const CreateUserValidationSchema: FastifySchema = {
  tags: ['user'],
  body: {
    type: 'object',
    properties: {
      email: { type: 'string', nullable: false, default: 'test@example.com' },
      name: { type: 'string' },
      password: { type: 'string', nullable: false },
    },
    required: ['email', 'password'],
    additionalProperties: false,
  },
};
