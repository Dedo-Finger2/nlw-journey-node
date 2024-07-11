import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { createTrip } from "../routes/create-trip.route";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmTrip } from "../routes/confirm-trip.route";

const app = fastify();

app.register(fastifyCors, {
  origin: "*"
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip);
app.register(confirmTrip);

export { app };
