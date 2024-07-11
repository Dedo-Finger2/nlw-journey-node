import request from "supertest";
import { app } from "../config/app";
import { FastifyInstance } from "fastify";

let server: FastifyInstance;

describe("Get Trip Links Route", () => {
  beforeAll(async () => {
    server = app;
    await server.listen({ port: 3344 });
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to return the trip's data", async () => {
    const response = await request(server.server).get(
      "/trips/7f02cef7-6c2a-4137-bf66-a00fc5e7fda0"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      trip: expect.objectContaining({
        id: expect.any(String),
        destination: expect.any(String),
        starts_at: expect.any(String),
        ends_at: expect.any(String),
        is_confirmed: expect.any(Boolean)
      })
    });
  });
});
