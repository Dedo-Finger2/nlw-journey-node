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
        summary: "Create a new activity for a trip.",
        tags: ["Activities"],
        params: z.object({
          tripId: z.string().uuid()
        }),
        body: z.object({
          title: z.string().min(4),
          occurs_at: z.coerce.date()
        }),
        response: {
          201: z.object({
            activityId: z.string().uuid()
          }),
          400: z.object({
            message: z.string(),
            errors: z.array(z.string()).optional(),
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
      const { title, occurs_at } = request.body;

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId
        }
      });

      if (!trip) {
        throw new ResourceNotFoundError("Trip not found.");
      }

      console.log("occurs_at:", occurs_at);
      console.log("trip.starts_at:", trip.starts_at);
      console.log("trip.ends_at:", trip.ends_at);

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
