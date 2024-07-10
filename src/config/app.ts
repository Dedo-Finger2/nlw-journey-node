import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

const app = fastify();

app.register(fastifyCors, {
  origin: "*"
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

import { createTripRoute } from "./../trip/http/routes/create-trip.route";

app.register(createTripRoute);

export { app };
