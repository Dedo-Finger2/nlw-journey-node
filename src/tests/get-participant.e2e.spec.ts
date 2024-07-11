import request from "supertest";
import { app } from "../config/app";
import { FastifyInstance } from "fastify";

let server: FastifyInstance;

describe("Get Participant Route", () => {
  beforeAll(async () => {
    server = app;
    await server.listen({ port: 3340 });
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to return a participant data", async () => {
    const response = await request(server.server).get(
      "/participants/04dfb121-723e-4300-bf18-48c630736647"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      participant: expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        is_confirmed: expect.any(Boolean)
      })
    });
  });
});
