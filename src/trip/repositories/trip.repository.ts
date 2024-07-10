import { TripEntity } from "../domain/entities/trip.entity";

export type TripRepositorySaveMethodRequest = {
  tripEntity: TripEntity;
  ownerName: string;
  ownerEmail: string;
  participantsEmails: Array<string>;
};

export type TripRepositorySaveMethodResponse = {
  tripId: string;
};

export interface TripRepository {
  save(props: TripRepositorySaveMethodRequest): Promise<TripRepositorySaveMethodResponse>;
}
