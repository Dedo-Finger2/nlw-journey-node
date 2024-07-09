import dayjs from "dayjs";
import { InvalidDateError } from "../errors/invalid-date.error";

export type TripProperties = {
  destination: string;
  startsAt: Date;
  endsAt: Date;
  isConfirmed: boolean;
  id?: string;
  createdAt?: Date;
};

export class TripEntity {
  private constructor(public readonly props: TripProperties) {}

  static build({ destination, startsAt, endsAt, isConfirmed }: TripProperties) {
    this.validateStartDateBeforeToday(startsAt);
    this.validadeEndDateBeforeStartDate(startsAt, endsAt);

    return new TripEntity({
      destination,
      endsAt,
      startsAt,
      isConfirmed
    });
  }

  private static validateStartDateBeforeToday(startDate: Date) {
    const startDateIsBeforeToday = dayjs(startDate).isBefore(dayjs(), "day");

    if (startDateIsBeforeToday) {
      throw new InvalidDateError("Start date cannot be before today's date.");
    }
  }

  private static validadeEndDateBeforeStartDate(startDate: Date, endDate: Date) {
    const endDateIsBeforeStartDate = dayjs(endDate).isBefore(dayjs(startDate), "day");

    if (endDateIsBeforeStartDate) {
      throw new InvalidDateError("End date cannot be before start date.");
    }
  }

  get destination() {
    return this.props.destination;
  }

  get startsAt() {
    return this.props.startsAt;
  }

  get endsAt() {
    return this.props.endsAt;
  }

  get isConfirmed() {
    return this.props.isConfirmed;
  }
}
