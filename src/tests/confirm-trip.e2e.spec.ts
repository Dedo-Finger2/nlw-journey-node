import request from "supertest";
import { app } from "./../config/app";
import { FastifyInstance } from "fastify";
import { env } from "../config/env";

let server: FastifyInstance;

describe("Confirm Trip Route", () => {
  beforeAll(async () => {
    server = app;
    await server.listen({ port: 3334 });
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to set trip's is_confirmed property to true and redirect the user", async () => {
    const response = await request(server.server).get(
      `/trips/${env.TEST_TRIP_ID}/confirm`
    );

    expect(response.status).toBe(301);
    expect(response.body).toEqual({});
  });

  it("should not be able to confirm a trip if the trip does not exists", async () => {
    const response = await request(server.server).get(
      `/trips/${env.TEST_TRIP_PARTICIPANT_ID}/confirm`
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      errors: ["ResourceNotFoundError"],
      message: "Trip not found.",
      statusCode: 404
    });
  });

  it("should not be able to confirm a trip if tripId is an invalid uuid", async () => {
    const response = await request(server.server).get(
      `/trips/${env.TEST_TRIP_PARTICIPANT_ID}-2/confirm`
    );

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Invalid input.",
      errors: { tripId: ["Invalid uuid"] },
      statusCode: 400
    });
  });
});
