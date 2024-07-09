export type TripRepositorySaveMethodRequest = {
  destination: string;
  startsAt: Date;
  endsAt: Date;
  isConfirmed: boolean;
};

export type TripRepositorySaveMethodResponse = {
  tripId: string;
};

export interface TripRepository {
  save(props: TripRepositorySaveMethodRequest): Promise<TripRepositorySaveMethodResponse>;
}
