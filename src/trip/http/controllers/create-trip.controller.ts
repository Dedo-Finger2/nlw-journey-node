import { AppService } from "../../../interfaces/app-service.interface";
import { Controller } from "../../../interfaces/controller.interface";
import { BaseHttpResponse, HTTP_STATUS_CODE } from "../../../interfaces/http.type";
import {
  CreateTripServiceRequest,
  CreateTripServiceResponse
} from "../../app-services/create-trip.service";

type CreateTripControllerRequestBody = {
  destination: string;
  starts_at: Date;
  ends_at: Date;
  owner_name: string;
  owner_email: string;
  emails_to_invite: string[];
};

type CreateTripControllerResponse = BaseHttpResponse & {
  body: {
    tripId: string;
  };
};

export class CreateTripController
  implements Controller<CreateTripControllerRequestBody, CreateTripControllerResponse>
{
  constructor(
    private readonly createTripService: AppService<
      CreateTripServiceRequest,
      CreateTripServiceResponse
    >
  ) {}

  async handle(
    input: CreateTripControllerRequestBody
  ): Promise<CreateTripControllerResponse> {
    const { destination, starts_at, ends_at, owner_name, owner_email, emails_to_invite } =
      input;

    const { tripId } = await this.createTripService.execute({
      destination,
      emailsToInvite: emails_to_invite,
      startsAt: starts_at,
      endsAt: ends_at,
      isConfirmed: true,
      ownerName: owner_name,
      ownerEmail: owner_email
    });

    return {
      code: HTTP_STATUS_CODE.CREATED,
      error: false,
      success: true,
      body: { tripId }
    };
  }
}
