import { z } from "zod";
import { dayjs } from "./../lib/dayjs";
import { prisma } from "../lib/prisma";
import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";

// eslint-disable-next-line require-await
export async function getTripActivities(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId/activities",
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
        where: {
          id: tripId
        },
        include: {
          activities: {
            orderBy: {
              occurs_at: "asc"
            }
          }
        }
      });

      if (!trip) {
        throw new ResourceNotFoundError("Trip not found.");
      }

      const differenceInDayBetweenTripStartAndEnd = dayjs(trip.ends_at).diff(
        trip.starts_at,
        "days"
      );

      const activities = Array.from({
        length: differenceInDayBetweenTripStartAndEnd + 1
      }).map((_, index) => {
        const date = dayjs(trip.starts_at).add(index, "days");

        return {
          date: date.toDate(),
          activities: trip.activities.filter((activity) => {
            return dayjs(activity.occurs_at).isSame(date, "day");
          })
        };
      });

      return reply.status(200).send({
        activities
      });
    }
  );
}
