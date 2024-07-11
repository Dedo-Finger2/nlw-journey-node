import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  console.error(error);

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Invalid input.",
      errors: error.flatten().fieldErrors,
      statusCode: 400
    });
  }

  return reply.status(error?.statusCode ?? 500).send({
    error: error?.name ?? "Error",
    message: error?.message ?? "Internal Server Error.",
    statusCode: error?.statusCode ?? 500
  });
};
