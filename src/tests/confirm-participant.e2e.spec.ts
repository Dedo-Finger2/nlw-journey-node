import request from "supertest";
import { app } from "../config/app";
import { FastifyInstance } from "fastify";
import { env } from "../config/env";

let server: FastifyInstance;

describe("Confirm Participant On a Trip", () => {
  beforeAll(async () => {
    server = app;
    await server.listen({ port: 3332 });
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to update participant's is_confirmed property in the trip and redirect the user", async () => {
    const response = await request(server.server).get(
      `/participants/${env.TEST_TRIP_PARTICIPANT_ID}/confirm`
    );

    expect(response.status).toBe(301);
    expect(response.body).toEqual({});
  });

  it.only("should not be able to confirm a participant that does not exists", async () => {
    const response = await request(server.server).get(
      "/participants/80f580b6-297a-4279-90c3-528a87a80dce/confirm"
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Participant not found.",
      errors: ["ResourceNotFoundError"],
      statusCode: 404
    });
  });

  it("should not be able to confirm a participant with invalid uuid", async () => {
    const response = await request(server.server).get(
      "/participants/80f580b6-297a279-90c3-528a87a80dce/confirm"
    );

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Invalid input.",
      errors: { participantId: ["Invalid uuid"] },
      statusCode: 400
    });
  });
});
