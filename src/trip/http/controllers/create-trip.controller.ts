import { AppService } from "../../../interfaces/app-service.interface";
import { HTTP_STATUS_CODE } from "../../../interfaces/http.type";
import { z } from "zod";
import {
  Controller,
  ControllerReply,
  ControllerRequest
} from "../../../interfaces/controller.interface";
import {
  CreateTripServiceRequest,
  CreateTripServiceResponse
} from "../../app-services/create-trip.service";
import {
  createTripErrorResponseSchema,
  createTripSchema,
  createTripSuccessResponseSchema
} from "../../schemas/create-trip.schema";

type CreateTripControllerRequestBody = z.infer<typeof createTripSchema>;
type CreateTripSuccessResponse = z.infer<typeof createTripSuccessResponseSchema>;
type CreateTripErrorResponse = z.infer<typeof createTripErrorResponseSchema>;

export class CreateTripController
  implements
    Controller<
      CreateTripControllerRequestBody,
      CreateTripSuccessResponse,
      CreateTripErrorResponse
    >
{
  constructor(
    private readonly createTripService: AppService<
      CreateTripServiceRequest,
      CreateTripServiceResponse
    >
  ) {}

  async handle(
    request: ControllerRequest<CreateTripControllerRequestBody>,
    reply: ControllerReply<CreateTripSuccessResponse | CreateTripErrorResponse>
  ): Promise<CreateTripSuccessResponse | CreateTripErrorResponse> {
    const { destination, starts_at, ends_at, owner_name, owner_email, emails_to_invite } =
      request.body;

    try {
      const { tripId } = await this.createTripService.execute({
        destination,
        emailsToInvite: emails_to_invite,
        startsAt: starts_at,
        endsAt: ends_at,
        isConfirmed: true,
        ownerName: owner_name,
        ownerEmail: owner_email
      });

      return reply.status(HTTP_STATUS_CODE.CREATED).send({
        code: HTTP_STATUS_CODE.CREATED,
        error: false,
        success: true,
        body: { tripId }
      });
    } catch (error) {
      return reply.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({
        code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        error: true,
        success: false,
        body: "Internal Server Error."
      });
    }
  }
}
