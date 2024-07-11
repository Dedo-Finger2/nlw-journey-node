import { z } from "zod";
import { prisma } from "../lib/prisma";
import { dayjs } from "./../lib/dayjs";
import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { getMailClient } from "../lib/mail";
import { InvalidResourceError } from "../errors/invalid-resource.error";
import { env } from "../config/env";

// eslint-disable-next-line require-await
export async function createTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips",
    {
      schema: {
        summary: "Create a new trip.",
        tags: ["Trips"],
        body: z.object({
          destination: z.string().min(4),
          starts_at: z.coerce.date(),
          ends_at: z.coerce.date(),
          owner_name: z.string(),
          owner_email: z.string().email(),
          emails_to_invite: z.array(z.string().email())
        }),
        response: {
          201: z.object({
            tripId: z.string().uuid()
          }),
          400: z.object({
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
      const {
        destination,
        starts_at,
        ends_at,
        owner_name,
        owner_email,
        emails_to_invite
      } = request.body;

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

      const trip = await prisma.trip.create({
        data: {
          destination,
          starts_at,
          ends_at,
          participants: {
            createMany: {
              data: [
                {
                  name: owner_name,
                  email: owner_email,
                  is_owner: true,
                  is_confirmed: true
                },
                ...emails_to_invite.map((email) => {
                  return { email };
                })
              ]
            }
          }
        }
      });

      const formattedStartDate = dayjs(starts_at).format("LL");
      const formattedEndDate = dayjs(ends_at).format("LL");

      const confirmationRouteUrl = `${env.API_BASE_URL}/trips/${trip.id}/confirm`;

      const mail = await getMailClient();

      await mail.sendMail({
        from: {
          name: "Equipe planner",
          address: "planner@company.com"
        },
        to: {
          name: owner_name,
          address: owner_email
        },
        subject: `Confirmação da sua viagem para ${destination} em ${formattedStartDate}.`,
        html: `
          <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
            <p>Você solicitou a crianção de uma viagem para <strong>${destination}</strong> nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>

            <p>Para confirmar sua viagem, clique no link abaixo:</p>

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

      return reply.status(201).send({ tripId: trip.id });
    }
  );
}
