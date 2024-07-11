import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";
import { InvalidResourceError } from "../errors/invalid-resource.error";

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

  if (error instanceof ResourceNotFoundError || error instanceof InvalidResourceError) {
    return reply.status(error.statusCode).send({
      message: error.message,
      errors: [`${error.name ?? undefined}`],
      statusCode: error.statusCode
    });
  }

  return reply.status(500).send({
    message: "Internal Server Error.",
    errors: ["Server Error"],
    statusCode: 500
  });
};
