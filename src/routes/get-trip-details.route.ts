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
        params: z.object({
          tripId: z.string().uuid()
        })
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
