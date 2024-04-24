import { FastifySchema } from 'fastify';

export const ChangeCategoryCounterValidationSchema: FastifySchema = {
  tags: ['category'],
  security: [{ ApiToken: [] }],
  body: {
    type: 'object',
    properties: {
      id: { type: 'number', nullable: true },
      value: { type: 'number', nullable: true },
    },
    required: ['value', 'id'],
    additionalProperties: false,
  },
};
