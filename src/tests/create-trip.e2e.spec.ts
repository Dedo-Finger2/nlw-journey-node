import request from "supertest";
import { app } from "./../config/app";
import { FastifyInstance } from "fastify";
import { dayjs } from "./../lib/dayjs";

let server: FastifyInstance;

describe("Create Trip Route", () => {
  beforeAll(async () => {
    server = app;
    await server.listen({ port: 3338 });
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to create a new trip and return status code of 201", async () => {
    const response = await request(server.server)
      .post("/trips")
      .send({
        destination: "Lugar de Teste",
        starts_at: dayjs(new Date()).add(1, "days").toDate(),
        ends_at: dayjs(new Date()).add(10, "days").toDate(),
        owner_name: "Greg",
        owner_email: "antonioimportant@gmail.com",
        emails_to_invite: ["teste@gmail.com", "teste2@gmail.com", "teste3@gmail.com"]
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      tripId: expect.any(String)
    });
  });

  it("should not be able to create a new trip when passing invalid starts_at", async () => {
    const response = await request(server.server)
      .post("/trips")
      .send({
        destination: "Lugar de Teste",
        starts_at: dayjs(new Date()).subtract(1, "days").toDate(),
        ends_at: dayjs(new Date()).add(10, "days").toDate(),
        owner_name: "Greg",
        owner_email: "antonioimportant@gmail.com",
        emails_to_invite: ["teste@gmail.com", "teste2@gmail.com", "teste3@gmail.com"]
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Invalid trip starts_at. Cannot be before today's date.",
      statusCode: 400,
      errors: ["InvalidResourceError"]
    });
  });

  it("should not be able to create a new trip when passing invalid ends_at", async () => {
    const response = await request(server.server)
      .post("/trips")
      .send({
        destination: "Lugar de Teste",
        starts_at: dayjs(new Date()).add(1, "days").toDate(),
        ends_at: dayjs(new Date()).subtract(1, "days").toDate(),
        owner_name: "Greg",
        owner_email: "antonioimportant@gmail.com",
        emails_to_invite: ["teste@gmail.com", "teste2@gmail.com", "teste3@gmail.com"]
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Invalid trip ends_at. Cannot be before starts_at date.",
      statusCode: 400,
      errors: ["InvalidResourceError"]
    });
  });
});
