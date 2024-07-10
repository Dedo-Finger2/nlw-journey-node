import { EtherealMailService } from "../../services/mail/ethereal-mail.service";
import { InMemoryTripRepository } from "../repositories/in-memory/in-memory-trip.repository";
import { CreateTripService } from "./create-trip.service";

let sut: CreateTripService;
let tripRepository: InMemoryTripRepository;
let mailService: EtherealMailService;

describe("Create Trip Service", () => {
  beforeEach(async () => {
    tripRepository = new InMemoryTripRepository();
    mailService = await EtherealMailService.build();
    sut = new CreateTripService(tripRepository, mailService);
  });

  it("should create a new trip and return it's id", async () => {
    const { tripId } = await sut.execute({
      destination: "teste",
      startsAt: new Date(),
      endsAt: new Date(),
      ownerName: "teste",
      ownerEmail: "teste@gmail.com",
      isConfirmed: true,
      emailsToInvite: ["teste@gmail.com", "teste2@gmail.com"]
    });

    expect(tripId).toBeDefined();
  });
});
