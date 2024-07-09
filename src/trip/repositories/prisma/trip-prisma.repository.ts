import {
  TripRepository,
  TripRepositorySaveMethodRequest,
  TripRepositorySaveMethodResponse
} from "../trip.repository";
import { prisma } from "../../../lib/prisma";

export class TripPrismaRepository implements TripRepository {
  async save({
    destination,
    startsAt,
    endsAt,
    isConfirmed,
    ownerName,
    ownerEmail,
    participantsEmails
  }: TripRepositorySaveMethodRequest): Promise<TripRepositorySaveMethodResponse> {
    const createdTrip = await prisma.trip.create({
      data: {
        destination,
        starts_at: startsAt,
        ends_at: endsAt,
        is_confirmed: isConfirmed,
        participants: {
          createMany: {
            data: [
              {
                name: ownerName,
                email: ownerEmail,
                is_confirmed: true,
                is_owner: true
              },
              ...participantsEmails.map((email) => {
                return { email };
              })
            ]
          }
        }
      }
    });

    return {
      tripId: createdTrip.id
    };
  }
}
