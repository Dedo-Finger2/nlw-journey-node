import { EtherealMailService } from "../../services/mail/ethereal-mail.service";
import { CreateTripService } from "../app-services/create-trip.service";
import { CreateTripController } from "../http/controllers/create-trip.controller";
import { PrismaTripRepository } from "../repositories/prisma/prisma-trip.repository";

export async function buildCreateTripController() {
  const tripRepository = new PrismaTripRepository();

  const mailService = await EtherealMailService.build();

  const createTripService = new CreateTripService(tripRepository, mailService);

  const createTripController = new CreateTripController(createTripService);

  return createTripController;
}
