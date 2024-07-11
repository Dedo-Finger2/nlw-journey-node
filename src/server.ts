import { env } from "./config/env";
import { app } from "./config/app";

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log("Server running...");
});
