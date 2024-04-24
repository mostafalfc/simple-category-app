import { FastifySchema } from 'fastify';

export const LoginValidationSchema: FastifySchema = {
  tags: ['user'],
  body: {
    type: 'object',
    properties: {
      email: { type: 'string', nullable: false, default: 'test@example.com' },
      password: { type: 'string', nullable: false },
    },
    required: ['email', 'password'],
    additionalProperties: false,
  },
};
