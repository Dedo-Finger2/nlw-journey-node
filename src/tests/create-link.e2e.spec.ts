import request from "supertest";
import { app } from "./../config/app";
import { FastifyInstance } from "fastify";

let server: FastifyInstance;

describe("Create Link Route", () => {
  beforeAll(async () => {
    server = app;
    await server.listen({ port: 3337 });
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to create a new link and return it's id", async () => {
    const response = await request(server.server)
      .post("/trips/7f02cef7-6c2a-4137-bf66-a00fc5e7fda0/links")
      .send({
        title: "Link importante para a viagem",
        url: "https://url-de-teste.com.br"
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      linkId: expect.any(String)
    });
  });
});
