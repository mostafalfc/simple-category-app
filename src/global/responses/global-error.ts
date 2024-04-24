import { HttpCodes } from 'fastify/types/utils';
import { FastifyReply } from 'fastify';

export interface GlobalErrorInterface {
  is_success: boolean;
  message: string;
}

export const GlobalErrorResponse = (reply: FastifyReply, message?: string) => {
  return reply.code(500).send({
    is_success: false,
    message: message ?? 'Internal server error',
  });
};
