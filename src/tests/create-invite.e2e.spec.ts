import request from "supertest";
import { app } from "../config/app";
import { FastifyInstance } from "fastify";
import { env } from "../config/env";

let server: FastifyInstance;

describe("Create Invite Route", () => {
  beforeAll(async () => {
    server = app;
    await server.listen({ port: 3336 });
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to create a new invite and return the participant's id", async () => {
    const response = await request(server.server)
      .post(`/trips/${env.TEST_TRIP_ID}/invites`)
      .send({
        email: "teste@gmail.com"
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      participantId: expect.any(String)
    });
  });

  it("should not be able to create a new invite if the trip does not exists", async () => {
    const response = await request(server.server)
      .post(`/trips/${env.TEST_TRIP_PARTICIPANT_ID}/invites`)
      .send({
        email: "teste@gmail.com"
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      errors: ["ResourceNotFoundError"],
      message: "Trip not found.",
      statusCode: 404
    });
  });

  it("should not be able to create a new invite if the tripId is an invalid uuid", async () => {
    const response = await request(server.server)
      .post(`/trips/${env.TEST_TRIP_ID}-2/invites`)
      .send({
        email: "teste@gmail.com"
      });

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
