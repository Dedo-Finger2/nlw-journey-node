import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  console.error(error);

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Invalid input.",
      errors: error.flatten().fieldErrors
    });
  }

  return reply
    .status(error?.statusCode ?? 500)
    .send({ message: error?.message ?? "Internal Server Error." });
};
