import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jobsPath = path.join(__dirname, '../data/jobs.json');
const jobs = JSON.parse(fs.readFileSync(jobsPath, 'utf8'));
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