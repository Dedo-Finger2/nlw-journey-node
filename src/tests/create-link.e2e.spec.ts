import request from "supertest";
import { app } from "./../config/app";
import { FastifyInstance } from "fastify";
import { env } from "../config/env";

let server: FastifyInstance;

describe("Create Link Route", () => {
  beforeAll(async () => {
    server = app;
    await server.listen({ port: 3337 });
  });

  afterAll(async () => {
    await server.close();
  });

  it("should not be able to create a new link if tripId is an invalid uuid", async () => {
    const response = await request(server.server)
      .post(`/trips/${env.TEST_TRIP_ID}/links`)
      .send({
        title: "Link importante para a viagem",
        url: "https://url-de-teste.com.br"
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      linkId: expect.any(String)
    });
  });

  it("should not be able to create a new link if trip does not exists", async () => {
    const response = await request(server.server)
      .post(`/trips/${env.TEST_TRIP_PARTICIPANT_ID}/links`)
      .send({
        title: "Link importante para a viagem",
        url: "https://url-de-teste.com.br"
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: "ResourceNotFoundError",
      message: "Trip not found.",
      statusCode: 404
    });
  });

  it("should not be able to create a new link if tripId is an invalid uuid", async () => {
    const response = await request(server.server)
      .post(`/trips/${env.TEST_TRIP_ID}-2/links`)
      .send({
        title: "Link importante para a viagem",
        url: "https://url-de-teste.com.br"
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
