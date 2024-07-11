import request from "supertest";
import { app } from "./../config/app";
import { FastifyInstance } from "fastify";

let server: FastifyInstance;

describe("Create Activity Route", () => {
  beforeAll(async () => {
    server = app;
    await server.listen({ port: 3336 });
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to create a new activity and return it's id", async () => {
    const response = await request(server.server)
      .post("/trips/7f02cef7-6c2a-4137-bf66-a00fc5e7fda0/activities")
      .send({
        title: "Lugar de Teste",
        occurs_at: "2054-07-15 18:32:00"
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      activityId: expect.any(String)
    });
  });

  it("should return status code 400 when passing occurs_at before trip.starts_at", async () => {
    const response = await request(server.server)
      .post("/trips/7f02cef7-6c2a-4137-bf66-a00fc5e7fda0/activities")
      .send({
        title: "Lugar de Teste",
        occurs_at: "1500-07-23 18:32:00"
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Invalid activity occurs_at",
      statusCode: 400,
      error: "InvalidResourceError"
    });
  });

  it("should return status code 400 when passing occurs_at after trip.ends_at", async () => {
    const response = await request(server.server)
      .post("/trips/7f02cef7-6c2a-4137-bf66-a00fc5e7fda0/activities")
      .send({
        title: "Lugar de Teste",
        occurs_at: "2024-08-23 18:32:00"
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Invalid activity occurs_at",
      statusCode: 400,
      error: "InvalidResourceError"
    });
  });
});
