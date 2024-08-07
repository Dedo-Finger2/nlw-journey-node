import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";
import { prisma } from "../lib/prisma";
import { env } from "../config/env";

// eslint-disable-next-line require-await
export async function confirmParticipantOnTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/participants/:participantId/confirm",
    {
      schema: {
        summary: "Confirms a participant presence in an event.",
        tags: ["Participants"],
        params: z.object({
          participantId: z.string().uuid()
        }),
        response: {
          301: z.object({}),
          400: z.object({
            message: z.string(),
            errors: z.record(z.string(), z.array(z.string())).optional(),
            statusCode: z.number().positive().int()
          }),
          404: z.object({
            message: z.string(),
            errors: z.array(z.string()).optional(),
            statusCode: z.number().positive().int()
          }),
          500: z.object({
            message: z.string(),
            errors: z.array(z.string()),
            statusCode: z.number().positive().int()
          })
        }
      }
    },
    async (request, reply) => {
      const { participantId } = request.params;

      const participant = await prisma.participant.findUnique({
        where: {
          id: participantId
        }
      });

      if (!participant) {
        throw new ResourceNotFoundError("Participant not found.");
      }

      if (participant.is_confirmed) {
        return reply
          .status(301)
          .redirect(`${env.API_BASE_URL}/trips/${participant.trip_id}`);
      }

      await prisma.participant.update({
        where: {
          id: participantId
        },
        data: {
          is_confirmed: true
        }
      });

      return reply
        .status(301)
        .redirect(`${env.WEB_BASE_URL}/trips/${participant.trip_id}`);
    }
  );
}
