import { z } from "zod";
import { prisma } from "../lib/prisma";
import { dayjs } from "./../lib/dayjs";
import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";
import { InvalidResourceError } from "../errors/invalid-resource.error";

// eslint-disable-next-line require-await
export async function createActivity(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips/:tripId/activities",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid()
        }),
        body: z.object({
          title: z.string().min(4),
          occurs_at: z.coerce.date()
        })
      }
    },
    async (request, reply) => {
      const { tripId } = request.params;
      const { title, occurs_at } = request.body;

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId
        }
      });

      if (!trip) {
        throw new ResourceNotFoundError("Trip not found.");
      }

      const invalidActivityDate =
        dayjs(occurs_at).isBefore(dayjs(trip.starts_at)) ||
        dayjs(occurs_at).isAfter(dayjs(trip.ends_at));

      if (invalidActivityDate) {
        throw new InvalidResourceError("Invalid activity occurs_at");
      }

      const activity = await prisma.activity.create({
        data: {
          title,
          occurs_at,
          trip_id: tripId
        }
      });

      return reply.status(201).send({
        activityId: activity.id
      });
    }
  );
}
