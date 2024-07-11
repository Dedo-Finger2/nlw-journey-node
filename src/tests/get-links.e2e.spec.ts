import request from "supertest";
import { app } from "../config/app";
import { FastifyInstance } from "fastify";

let server: FastifyInstance;

describe("Get Trip Links Route", () => {
  beforeAll(async () => {
    server = app;
    await server.listen({ port: 3338 });
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to return a list of activities of given trip", async () => {
    const response = await request(server.server).get(
      "/trips/7f02cef7-6c2a-4137-bf66-a00fc5e7fda0/links"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      links: expect.any(Array)
    });
  });
});
