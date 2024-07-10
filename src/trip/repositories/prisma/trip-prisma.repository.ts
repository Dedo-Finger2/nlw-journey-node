import {
  TripRepository,
  TripRepositorySaveMethodRequest,
  TripRepositorySaveMethodResponse
} from "../trip.repository";
import { prisma } from "../../../lib/prisma";

export class TripPrismaRepository implements TripRepository {
  async save({
    tripEntity,
    ownerName,
    ownerEmail,
    emailsToInvite
  }: TripRepositorySaveMethodRequest): Promise<TripRepositorySaveMethodResponse> {
    const createdTrip = await prisma.trip.create({
      data: {
        destination: tripEntity.destination,
        starts_at: tripEntity.startsAt,
        ends_at: tripEntity.endsAt,
        is_confirmed: tripEntity.isConfirmed,
        participants: {
          createMany: {
            data: [
              {
                name: ownerName,
                email: ownerEmail,
                is_confirmed: true,
                is_owner: true
              },
              ...emailsToInvite.map((email) => {
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
