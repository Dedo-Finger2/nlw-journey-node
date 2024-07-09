import dayjs from "dayjs";
import { InvalidDateError } from "../errors/invalid-date.error";
import { TripEntity, TripProperties } from "./trip.entity";

describe("Trip Entity", () => {
  beforeAll(() => {
    jest.spyOn(Date, "now").mockReturnValue(dayjs("2024-01-01").valueOf());
  });

  it("should create a new trip entity", () => {
    const tripData: TripProperties = {
      destination: "test",
      startsAt: dayjs().toDate(),
      endsAt: dayjs().add(1, "day").toDate(),
      isConfirmed: false
    };

    const sut = TripEntity.build(tripData);

    expect(sut).toBeInstanceOf(TripEntity);
    expect(sut.destination).toBe("test");
  });

  it("should not create a trip entity if start date is before today's date", () => {
    const tripData: TripProperties = {
      destination: "test",
      startsAt: dayjs().subtract(1, "days").toDate(),
      endsAt: dayjs().add(1, "day").toDate(),
      isConfirmed: false
    };

    const sut = () => TripEntity.build(tripData);

    expect(sut).toThrow(InvalidDateError);
    expect(sut).toThrow("Start date cannot be before today's date.");
  });

  it("should not create a trip entity if ends date is before starts date", () => {
    const tripData: TripProperties = {
      destination: "test",
      startsAt: dayjs().toDate(),
      endsAt: dayjs().subtract(1, "day").toDate(),
      isConfirmed: false
    };

    const sut = () => TripEntity.build(tripData);

    expect(sut).toThrow(InvalidDateError);
    expect(sut).toThrow("End date cannot be before start date.");
  });
});
