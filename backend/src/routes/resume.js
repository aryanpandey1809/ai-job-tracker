import { parseResume } from "../services/resumeParser.js";
import redis from "../redis.js";

export default async function (app) {
  app.post("/resume", async (req) => {
    const file = await req.file();
    const text = await parseResume(file);
    await redis.set("resume", text);
    return { success: true };
  });
}