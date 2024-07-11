import request from "supertest";
import { app } from "./../config/app";
import { FastifyInstance } from "fastify";
import { env } from "../config/env";

let server: FastifyInstance;

describe("Create Activity Route", () => {
  beforeAll(async () => {
    server = app;
    await server.listen({ port: 3335 });
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to create a new activity and return it's id", async () => {
    const response = await request(server.server)
      .post(`/trips/${env.TEST_TRIP_ID}/activities`)
      .send({
        title: "Lugar de Teste",
        occurs_at: "5024-01-11 18:32:00"
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      activityId: expect.any(String)
    });
  });

  it("should not be able to create a new activity when passing occurs_at before trip.starts_at", async () => {
    const response = await request(server.server)
      .post(`/trips/${env.TEST_TRIP_ID}/activities`)
      .send({
        title: "Lugar de Teste",
        occurs_at: "1500-07-23 18:32:00"
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Invalid activity occurs_at",
      statusCode: 400,
      errors: ["InvalidResourceError"]
    });
  });

  it("should not be able to create a new activity when passing occurs_at after trip.ends_at", async () => {
    const response = await request(server.server)
      .post(`/trips/${env.TEST_TRIP_ID}/activities`)
      .send({
        title: "Lugar de Teste",
        occurs_at: "5024-01-30 18:32:00"
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Invalid activity occurs_at",
      statusCode: 400,
      errors: ["InvalidResourceError"]
    });
  });
});
