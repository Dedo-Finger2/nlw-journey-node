/* eslint-disable require-await */
import {
  TripRepository,
  TripRepositorySaveMethodRequest,
  TripRepositorySaveMethodResponse
} from "../trip.repository";
import { randomUUID } from "node:crypto";

type Trip = TripRepositorySaveMethodRequest;

export class InMemoryTripRepository implements TripRepository {
  public items: Array<Trip> = [];

  async save({
    tripEntity,
    ownerName,
    ownerEmail,
    emailsToInvite
  }: TripRepositorySaveMethodRequest): Promise<TripRepositorySaveMethodResponse> {
    this.items.push({
      tripEntity,
      ownerName,
      ownerEmail,
      emailsToInvite
    });

    return {
      tripId: randomUUID()
    };
  }
}
