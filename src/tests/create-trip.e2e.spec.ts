import request from "supertest";
import { app } from "./../config/app";
import { FastifyInstance } from "fastify";

let server: FastifyInstance;

describe("Create Trip Route", () => {
  beforeAll(async () => {
    server = app;
    await server.listen({ port: 3333 });
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to create a new trip and return status code of 201", async () => {
    const response = await request(server.server)
      .post("/trips")
      .send({
        destination: "Lugar de Teste",
        starts_at: "2054-07-12 18:32:00",
        ends_at: "2054-08-10 19:32:00",
        owner_name: "Greg",
        owner_email: "antonioimportant@gmail.com",
        emails_to_invite: ["teste@gmail.com", "teste2@gmail.com", "teste3@gmail.com"]
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      tripId: expect.any(String)
    });
  });

  it("should return status code 400 when passing invalid starts_at", async () => {
    const response = await request(server.server)
      .post("/trips")
      .send({
        destination: "Lugar de Teste",
        starts_at: "1500-07-12 18:32:00",
        ends_at: "2054-08-10 19:32:00",
        owner_name: "Greg",
        owner_email: "antonioimportant@gmail.com",
        emails_to_invite: ["teste@gmail.com", "teste2@gmail.com", "teste3@gmail.com"]
      });

    // TODO: Adapt to 400
    expect(response.status).toBe(500);
  });

  it("should return status code 400 when passing invalid ends_at", async () => {
    const response = await request(server.server)
      .post("/trips")
      .send({
        destination: "Lugar de Teste",
        starts_at: "2054-07-12 18:32:00",
        ends_at: "1500-07-10 19:32:00",
        owner_name: "Greg",
        owner_email: "antonioimportant@gmail.com",
        emails_to_invite: ["teste@gmail.com", "teste2@gmail.com", "teste3@gmail.com"]
      });

    // TODO: Adapt to 400
    expect(response.status).toBe(500);
  });
});
