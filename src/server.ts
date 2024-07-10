import { app } from "./config/app";

app.listen({ port: 3333 }).then(() => {
  console.log("Server running...");
});
