import OpenAI from "openai";
import jobs from "../data/jobs.json" assert { type: "json" };

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