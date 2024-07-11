import { z } from "zod";
import { prisma } from "../lib/prisma";
import { dayjs } from "./../lib/dayjs";
import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { InvalidResourceError } from "../errors/invalid-resource.error";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";

// eslint-disable-next-line require-await
export async function updateTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/trips/:tripId",
    {
      schema: {
        summary: "Updates a trip data.",
        tags: ["Trips"],
        params: z.object({
          tripId: z.string().uuid()
        }),
        body: z.object({
          destination: z.string().min(4),
          starts_at: z.coerce.date(),
          ends_at: z.coerce.date()
        }),
        response: {
          200: z.object({
            tripId: z.string().uuid()
          }),
          400: z.object({
            message: z.string(),
            errors: z.object({
              error: z.array(z.string()).optional(),
              tripId: z.array(z.string()).optional(),
              destination: z.array(z.string()).optional(),
              starts_at: z.array(z.string()).optional(),
              ends_at: z.array(z.string()).optional()
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
      const { destination, starts_at, ends_at } = request.body;
      const { tripId } = request.params;

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId
        }
      });

      if (!trip) {
        throw new ResourceNotFoundError("Trip not found.");
      }

      if (dayjs(starts_at).isBefore(new Date())) {
        throw new InvalidResourceError(
          "Invalid trip starts_at. Cannot be before today's date."
        );
      }

      if (dayjs(ends_at).isBefore(starts_at)) {
        throw new InvalidResourceError(
          "Invalid trip ends_at. Cannot be before starts_at date."
        );
      }

      await prisma.trip.update({
        data: {
          destination,
          starts_at,
          ends_at
        },
        where: {
          id: tripId
        }
      });

      return reply.status(200).send({ tripId: trip.id });
    }
  );
}
