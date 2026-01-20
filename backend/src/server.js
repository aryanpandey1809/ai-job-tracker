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

app.listen({ port: 4000 }, () => {
  console.log("Backend running on http://localhost:4000");
});