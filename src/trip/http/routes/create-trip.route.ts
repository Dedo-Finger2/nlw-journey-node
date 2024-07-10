import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { buildCreateTripController } from "../../factories/build-create-trip-controller.factory";
import { z, ZodError } from "zod";
import { HTTP_STATUS_CODE, httpResponseSchema } from "../../../interfaces/http.type";

// eslint-disable-next-line require-await
export async function createTripRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips",
    {
      schema: {
        body: z.object({
          destination: z.string().min(4),
          starts_at: z.coerce.date(),
          ends_at: z.coerce.date(),
          owner_name: z.string(),
          owner_email: z.string().email(),
          emails_to_invite: z.array(z.string().email())
        }),
        response: {
          201: httpResponseSchema(z.object({ tripId: z.string() })),
          400: httpResponseSchema(
            z.object({ message: z.union([z.string(), z.array(z.string())]) })
          ),
          500: httpResponseSchema(z.object({ message: z.string() }))
        }
      }
    },
    async (request, reply) => {
      try {
        const {
          destination,
          starts_at,
          ends_at,
          owner_name,
          owner_email,
          emails_to_invite
        } = request.body;

        const controller = await buildCreateTripController();

        const { body, code, error, success } = await controller.handle({
          destination,
          emails_to_invite,
          ends_at,
          owner_email,
          owner_name,
          starts_at
        });

        return reply.status(code).send({
          code,
          success,
          error,
          body: { tripId: body.tripId }
        });
      } catch (error) {
        if (error instanceof ZodError) {
          return reply.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
            code: HTTP_STATUS_CODE.BAD_REQUEST,
            error: true,
            success: false,
            body: { message: error.issues.map((issue) => issue.message) }
          });
        }

        return reply.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({
          code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
          error: true,
          success: false,
          body: { message: "Internal Server Error" }
        });
      }
    }
  );
}
