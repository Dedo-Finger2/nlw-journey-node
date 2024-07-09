export type TripRepositorySaveMethodRequest = {
  destination: string;
  startsAt: Date;
  endsAt: Date;
  isConfirmed: boolean;
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
