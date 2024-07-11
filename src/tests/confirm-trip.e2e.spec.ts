import request from "supertest";
import { app } from "./../config/app";
import { FastifyInstance } from "fastify";

let server: FastifyInstance;

describe("Create Trip Route", () => {
  beforeAll(async () => {
    server = app;
    await server.listen({ port: 3334 });
  });

  afterAll(async () => {
    await server.close();
  });

  it.only("should be able to create a new trip and return status code of 201", async () => {
    const response = await request(server.server).get(
      "/trips/7f02cef7-6c2a-4137-bf66-a00fc5e7fda0/confirm"
    );

    expect(response.status).toBe(301);
  });
});
