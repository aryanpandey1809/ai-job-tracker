import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function scoreJob(resume, job) {
  const prompt = `
Resume:
${resume}

Job:
${job.description}

Give match score 0-100 and 2 reasons.
Return JSON: { "score": number, "reasons": [] }
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  return JSON.parse(res.choices[0].message.content);
}