import { z } from "zod";

export enum HTTP_STATUS_CODE {
  BAD_REQUEST = 400,
  OK = 200,
  CREATED = 201,
  INTERNAL_SERVER_ERROR = 500
}

export const baseResponseSchema = z.object({
  code: z.nativeEnum(HTTP_STATUS_CODE),
  error: z.boolean(),
  success: z.boolean()
});

export type BaseHttpResponse = z.infer<typeof baseResponseSchema>;

export const httpResponseSchema = <T extends z.ZodTypeAny>(bodySchema: T) =>
  baseResponseSchema.extend({
    body: bodySchema
  });
