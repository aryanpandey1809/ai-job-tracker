import OpenAI from "openai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jobsPath = path.join(__dirname, '../data/jobs.json');
const jobs = JSON.parse(fs.readFileSync(jobsPath, 'utf8'));

export default async function (app) {
  app.post("/chat", async (req) => {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      return { reply: "AI service not configured. Please set OPENAI_API_KEY environment variable." };
    }
    
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
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