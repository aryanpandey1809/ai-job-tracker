import redis from "../redis.js";

export default async function (app) {
  app.post("/apply", async (req) => {
    const { jobId, status } = req.body;
    await redis.hset(`applications`, jobId, JSON.stringify({
      status,
      time: Date.now()
    }));
    return { success: true };
  });

  app.get("/applications", async () => {
    return await redis.hgetall("applications");
  });
}