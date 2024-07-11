import request from "supertest";
import { app } from "./../config/app";
import { FastifyInstance } from "fastify";
import { env } from "../config/env";

let server: FastifyInstance;

describe("Get Trip Activities Route", () => {
  beforeAll(async () => {
    server = app;
    await server.listen({ port: 3339 });
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to return a list of activities of given trip", async () => {
    const response = await request(server.server).get(
      `/trips/${env.TEST_TRIP_ID}/activities`
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      activities: expect.arrayContaining([
        {
          date: expect.any(String),
          activities: expect.any(Array)
        }
      ])
    });
  });

  it("should not be able to return the activities of a trip does not exists", async () => {
    const response = await request(server.server).get(
      `/trips/${env.TEST_TRIP_PARTICIPANT_ID}/activities`
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: "ResourceNotFoundError",
      message: "Trip not found.",
      statusCode: 404
    });
  });

  it("should not be able to return the activities of a trip if tripId is an invalid uuid", async () => {
    const response = await request(server.server).get(
      `/trips/${env.TEST_TRIP_ID}-2/activities`
    );

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Invalid input.",
      statusCode: 400,
      errors: {
        tripId: ["Invalid uuid"]
      }
    });
  });
});
