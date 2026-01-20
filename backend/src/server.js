import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";

import jobsRoute from "./routes/jobs.js";
import resumeRoute from "./routes/resume.js";
import applyRoute from "./routes/apply.js";
import chatRoute from "./routes/chat.js";

const app = Fastify();

await app.register(cors);
await app.register(multipart);

app.register(jobsRoute);
app.register(resumeRoute);
app.register(applyRoute);
app.register(chatRoute);

const port = parseInt(process.env.PORT) || 4000;

app.listen({ port }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Backend running on port ${port}`);
});