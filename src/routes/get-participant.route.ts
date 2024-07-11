import { z } from "zod";
import { prisma } from "../lib/prisma";
import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";

// eslint-disable-next-line require-await
export async function getTripParticipant(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/participants/:participantId",
    {
      schema: {
        summary: "Returns details of a participant.",
        tags: ["Participants"],
        params: z.object({
          participantId: z.string().uuid()
        }),
        response: {
          200: z.object({
            participant: z.object({
              id: z.string(),
              name: z.string().nullable(),
              is_confirmed: z.boolean(),
              email: z.string()
            })
          }),
          400: z.object({
            message: z.string(),
            errors: z.record(z.string(), z.array(z.string())).optional(),
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
      const { participantId } = request.params;

      const participant = await prisma.participant.findUnique({
        select: {
          id: true,
          name: true,
          email: true,
          is_confirmed: true
        },
        where: {
          id: participantId
        }
      });

      if (!participant) {
        throw new ResourceNotFoundError("Participant not found.");
      }

      return reply.status(200).send({
        participant
      });
    }
  );
}
