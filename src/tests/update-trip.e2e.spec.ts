import request from "supertest";
import { app } from "../config/app";
import { FastifyInstance } from "fastify";
import { env } from "../config/env";

let server: FastifyInstance;

describe("Update Trip Route", () => {
  beforeAll(async () => {
    server = app;
    await server.listen({ port: 3343 });
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to update trip's data and return it's id", async () => {
    const response = await request(server.server).put(`/trips/${env.TEST_TRIP_ID}`).send({
      destination: "Lugar de Teste",
      starts_at: "2054-07-12 18:32:00",
      ends_at: "2054-08-10 19:32:00"
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      tripId: expect.any(String)
    });
  });

  it("should not be able to update a trip does not exists", async () => {
    const response = await request(server.server).get(
      `/trips/${env.TEST_TRIP_PARTICIPANT_ID}`
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      errors: ["ResourceNotFoundError"],
      message: "Trip not found.",
      statusCode: 404
    });
  });

  it("should not be able to update a trip if tripId is an invalid uuid", async () => {
    const response = await request(server.server).get(`/trips/${env.TEST_TRIP_ID}-2`);

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
