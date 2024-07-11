import request from "supertest";
import { app } from "../config/app";
import { FastifyInstance } from "fastify";
import { env } from "../config/env";

let server: FastifyInstance;

describe("Get Participant Route", () => {
  beforeAll(async () => {
    server = app;
    await server.listen({ port: 3341 });
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to return a participant data", async () => {
    const response = await request(server.server).get(
      `/participants/${env.TEST_TRIP_PARTICIPANT_ID}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      participant: expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        is_confirmed: expect.any(Boolean)
      })
    });
  });

  it("should not be able to return the data of a participant that does not exists", async () => {
    const response = await request(server.server).get(
      `/participants/${env.TEST_TRIP_ID}`
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      errors: ["ResourceNotFoundError"],
      message: "Participant not found.",
      statusCode: 404
    });
  });

  it("should not be able to return the data of a participant if participantId is an invalid uuid", async () => {
    const response = await request(server.server).get(
      `/participants/${env.TEST_TRIP_PARTICIPANT_ID}-2`
    );

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Invalid input.",
      statusCode: 400,
      errors: {
        participantId: ["Invalid uuid"]
      }
    });
  });
});
