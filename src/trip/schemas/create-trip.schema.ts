import { z } from "zod";
import { baseResponseSchema } from "../../interfaces/http.type";

export const createTripSchema = z.object({
  destination: z.string(),
  starts_at: z.coerce.date(),
  ends_at: z.coerce.date(),
  owner_name: z.string(),
  owner_email: z.string().email(),
  emails_to_invite: z.array(z.string().email())
});

export const createResponseSchema = <T extends z.ZodTypeAny>(bodySchema: T) =>
  baseResponseSchema.extend({
    body: bodySchema
  });

export const createTripSuccessResponseSchema = createResponseSchema(
  z.object({
    tripId: z.string()
  })
);

export const createTripErrorResponseSchema = createResponseSchema(z.string());
