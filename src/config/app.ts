import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { createTrip } from "../routes/create-trip.route";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmTrip } from "../routes/confirm-trip.route";
import { confirmParticipantOnTrip } from "../routes/confirm-participant.route";
import { createActivity } from "../routes/create-activity.route";
import { getTripActivities } from "../routes/get-activities.route";
import { createLink } from "../routes/create-links.route";

const app = fastify();

app.register(fastifyCors, {
  origin: "*"
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip);
app.register(confirmTrip);
app.register(confirmParticipantOnTrip);
app.register(createActivity);
app.register(getTripActivities);
app.register(createLink);

export { app };
