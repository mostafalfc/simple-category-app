import { FastifySchema } from 'fastify';
export const CreateCategorySchema: FastifySchema = {
  tags: ['category'],
  security: [{ ApiToken: [] }],
  body: {
    type: 'object',
    properties: {
      latitude: { type: 'number', nullable: true },
      longitude: { type: 'number', nullable: true },
      category: { type: 'string', nullable: false },
      counter: { type: 'number', nullable: false },
    },
    required: ['category'],
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

export const ChangeCategoryCounterSchema: FastifySchema = {
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
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
    },
  },
};
