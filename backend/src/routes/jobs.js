import jobs from "../data/jobs.json" assert { type: "json" };
import { scoreJob } from "../services/aiMatch.js";
import redis from "../redis.js";

export default async function (app) {
  app.get("/jobs", async () => {
    const resume = await redis.get("resume");

    const scoredJobs = await Promise.all(
      jobs.map(async (job) => {
        if (!resume) return { ...job, score: 0 };

        const score = await scoreJob(resume, job);
        return { ...job, ...score };
      })
    );

    return scoredJobs;
  });
}