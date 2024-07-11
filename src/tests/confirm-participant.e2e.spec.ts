import request from "supertest";
import { app } from "../config/app";
import { FastifyInstance } from "fastify";

let server: FastifyInstance;

describe("Confirm Participant On Trip", () => {
  beforeAll(async () => {
    server = app;
    await server.listen({ port: 3335 });
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to create a new trip and return status code of 201", async () => {
    const response = await request(server.server).get(
      "/participants/04dfb121-723e-4300-bf18-48c630736647/confirm"
    );

    expect(response.status).toBe(301);
  });
});
