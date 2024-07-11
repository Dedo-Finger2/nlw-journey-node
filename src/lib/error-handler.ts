import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    console.error(error.flatten().fieldErrors);

    return reply.status(400).send({
      message: "Invalid input.",
      errors: error.flatten().fieldErrors,
      statusCode: 400
    });
  }

  console.error(error);

  return reply.status(error?.statusCode ?? 500).send({
    message: error?.message ?? "Internal Server Error.",
    errors: {
      error: [`${error?.name ?? "Server Error"}`]
    },
    statusCode: error?.statusCode ?? 500
  });
};
