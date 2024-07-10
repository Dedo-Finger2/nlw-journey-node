import request from "supertest";
import { app } from "../../config/app";
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

  it("should return status code 201 and the trip_id created once creating a new trip", async () => {
    const response = await request(server.server)
      .post("/trips")
      .send({
        destination: "Rio de Janeiro",
        starts_at: "2024-08-08",
        ends_at: "2024-08-10",
        owner_name: "Testing User",
        owner_email: "testinguser@gmail.com",
        emails_to_invite: ["jonhDoe@gmail.com", "janeDoe@gmail.com"]
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      body: expect.objectContaining({
        tripId: expect.any(String)
      }),
      code: 201,
      error: false,
      success: true
    });
  });
});
