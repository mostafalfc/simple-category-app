import { FastifySchema } from 'fastify';

export const CreateCategoryValidationSchema: FastifySchema = {
  tags: ['category'],
  security: [{ ApiToken: [] }],
  body: {
    type: 'object',
    properties: {
      latitude: { type: 'number', nullable: true },
      longitude: { type: 'number', nullable: true },
      category: { type: 'string', nullable: false },
      counter: { type: 'number', nullable: true },
    },
    required: ['category'],
    additionalProperties: false,
  },
  response: {
    201: {
      type: 'object',
      properties: {
        is_success: { type: 'boolean' },
        data: {
          id: { type: 'number' },
          created_at: { type: 'date' },
          latitude: { type: 'number' },
          longitude: { type: 'number' },
          category: { type: 'string' },
          counter: { type: 'number' },
        },
      },
    },
  },
};
