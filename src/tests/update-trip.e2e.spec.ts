import request from "supertest";
import { app } from "../config/app";
import { FastifyInstance } from "fastify";

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
    const response = await request(server.server)
      .put("/trips/7f02cef7-6c2a-4137-bf66-a00fc5e7fda0")
      .send({
        destination: "Lugar de Teste",
        starts_at: "2054-07-12 18:32:00",
        ends_at: "2054-08-10 19:32:00"
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      tripId: expect.any(String)
    });
  });
});
