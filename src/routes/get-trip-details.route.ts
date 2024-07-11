import { z } from "zod";
import { prisma } from "../lib/prisma";
import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";

// eslint-disable-next-line require-await
export async function getTripDetails(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId",
    {
      schema: {
        summary: "Returns a trip's details.",
        tags: ["Trips"],
        params: z.object({
          tripId: z.string().uuid()
        }),
        response: {
          200: z.object({
            trip: z.object({
              id: z.string(),
              destination: z.string(),
              starts_at: z.coerce.date(),
              ends_at: z.coerce.date(),
              is_confirmed: z.boolean()
            })
          }),
          400: z.object({
            message: z.string(),
            errors: z.object({
              error: z.array(z.string()).optional(),
              tripId: z.array(z.string()).optional()
            }),
            statusCode: z.number().positive().int()
          }),
          404: z.object({
            errors: z.array(z.string()).optional(),
            message: z.string(),
            statusCode: z.number().positive().int()
          }),
          500: z.object({
            message: z.string(),
            errors: z.object({
              error: z.array(z.string())
            }),
            statusCode: z.number().positive().int()
          })
        }
      }
    },
    async (request, reply) => {
      const { tripId } = request.params;

      const trip = await prisma.trip.findUnique({
        select: {
          id: true,
          destination: true,
          starts_at: true,
          ends_at: true,
          is_confirmed: true
        },
        where: {
          id: tripId
        }
      });

      if (!trip) {
        throw new ResourceNotFoundError("Trip not found.");
      }

      return reply.status(200).send({
        trip
      });
    }
  );
}
