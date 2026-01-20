import OpenAI from "openai";

export async function scoreJob(resume, job) {
  // Check if API key is available
  if (!process.env.OPENAI_API_KEY) {
    console.warn('OpenAI API key not found, returning default score');
    return { score: 0, reasons: ['API key not configured'] };
  }
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  
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