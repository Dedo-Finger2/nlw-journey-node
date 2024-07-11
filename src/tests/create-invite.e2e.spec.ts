import request from "supertest";
import { app } from "../config/app";
import { FastifyInstance } from "fastify";

let server: FastifyInstance;

describe("Create Invite Route", () => {
  beforeAll(async () => {
    server = app;
    await server.listen({ port: 3338 });
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to create a new invite and return the participant's id", async () => {
    const response = await request(server.server)
      .post("/trips/7f02cef7-6c2a-4137-bf66-a00fc5e7fda0/invites")
      .send({
        email: "teste@gmail.com"
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      participantId: expect.any(String)
    });
  });
});
