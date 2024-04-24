import { FastifyReply } from 'fastify';
import { HttpCodes } from 'fastify/types/utils';

export interface GlobalResponseInterface {
  is_success: boolean;
  data?: any;
  message?: string;
}

export const GlobalSuccessResponse = (
  reply: FastifyReply,
  code: HttpCodes,
  data?: any,
  message?: string,
) => {
  return reply.code(code).send({
    is_success: true,
    data,
    message,
  });
};
