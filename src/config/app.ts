import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { createTrip } from "../routes/create-trip.route";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler
} from "fastify-type-provider-zod";
import { confirmTrip } from "../routes/confirm-trip.route";
import { confirmParticipantOnTrip } from "../routes/confirm-participant.route";
import { createActivity } from "../routes/create-activity.route";
import { getTripActivities } from "../routes/get-activities.route";
import { createLink } from "../routes/create-links.route";
import { getLinks } from "../routes/get-links.route";
import { getTripParticipants } from "../routes/get-participants.route";
import { createInvite } from "../routes/create-invite.route";
import { updateTrip } from "../routes/update-trip.route";
import { getTripDetails } from "../routes/get-trip-details.route";
import { getTripParticipant } from "../routes/get-participant.route";
import { errorHandler } from "../lib/error-handler";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const app = fastify();

app.register(fastifyCors, {
  origin: "*"
});

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "Plann.er",
      description:
        "Especificações da API para o back-end da aplicação plann.er feita durante o evento NLW Journey da Rocketseat.",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler);

app.register(createTrip);
app.register(confirmTrip);
app.register(confirmParticipantOnTrip);
app.register(createActivity);
app.register(getTripActivities);
app.register(createLink);
app.register(getLinks);
app.register(getTripParticipants);
app.register(createInvite);
app.register(updateTrip);
app.register(getTripDetails);
app.register(getTripParticipant);

export { app };
