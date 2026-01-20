import OpenAI from "openai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jobsPath = path.join(__dirname, '../data/jobs.json');
const jobs = JSON.parse(fs.readFileSync(jobsPath, 'utf8'));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function (app) {
  app.post("/chat", async (req) => {
    const { message } = req.body;

    const prompt = `
You are a job assistant.
Jobs:
${JSON.stringify(jobs)}

User question:
${message}
`;

    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    return { reply: res.choices[0].message.content };
  });
}