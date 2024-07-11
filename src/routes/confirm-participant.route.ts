import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";
import { prisma } from "../lib/prisma";

// eslint-disable-next-line require-await
export async function confirmParticipantOnTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/participants/:participantId/confirm",
    {
      schema: {
        params: z.object({
          participantId: z.string().uuid()
        })
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
          .redirect(`http://localhost:3000/trips/${participant.trip_id}`);
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
        .redirect(`http://localhost:3000/trips/${participant.trip_id}`);
    }
  );
}
