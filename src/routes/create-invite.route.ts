import { z } from "zod";
import { prisma } from "../lib/prisma";
import { dayjs } from "./../lib/dayjs";
import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";
import { getMailClient } from "../lib/mail";
import { env } from "../config/env";

// eslint-disable-next-line require-await
export async function createInvite(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips/:tripId/invites",
    {
      schema: {
        summary: "Create a new invite for a trip.",
        tags: ["Trips"],
        params: z.object({
          tripId: z.string().uuid()
        }),
        body: z.object({
          email: z.string().email()
        }),
        response: {
          201: z.object({
            participantId: z.string().uuid()
          }),
          400: z.object({
            message: z.string(),
            errors: z.object({
              error: z.array(z.string()).optional(),
              tripId: z.array(z.string()).optional(),
              email: z.array(z.string()).optional()
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
      const { email } = request.body;

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId
        }
      });

      if (!trip) {
        throw new ResourceNotFoundError("Trip not found.");
      }

      const participant = await prisma.participant.create({
        data: {
          email,
          trip_id: tripId
        }
      });

      const formattedStartDate = dayjs(trip.starts_at).format("LL");
      const formattedEndDate = dayjs(trip.ends_at).format("LL");

      const mail = await getMailClient();

      const confirmationRouteUrl = `${env.API_BASE_URL}/participants/${participant.id}/confirm`;

      await mail.sendMail({
        from: {
          name: "Equipe planner",
          address: "planner@company.com"
        },
        to: participant.email,
        subject: `Confirme sua presença na viagem para ${trip.destination} em ${formattedStartDate}.`,
        html: `
          <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
            <p>Você foi convidado(a) para uma viagem para <strong>${trip.destination}</strong> nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>

            <p>Para confirmar sua presença na viagem, clique no link abaixo:</p>

            <p>
              <a href="${confirmationRouteUrl}">Confirmar viagem</a>
            </p>

            <p>Caso esteja usando um dispositivo móvel, você também pode confirmar a criação da viagem pelos aplicativos:</p>

            <p>
              <a href="#">Aplicativo para IPhone</a>
            </p>
            <p>
              <a href="#">Aplicativo para Android</a>
            </p>

            <p>Caso você não saiba do que se trata este e-mail, apenas ignore-o.</p>
          </div>
        `.trim()
      });

      return reply.status(201).send({
        participantId: participant.id
      });
    }
  );
}
