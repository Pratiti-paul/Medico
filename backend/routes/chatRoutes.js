const express = require("express");

const router = express.Router();

let orchestratorInstance;

async function getOrchestrator() {
  if (!process.env.GROQ_API_KEY) {
    return null;
  }

  if (orchestratorInstance) {
    return orchestratorInstance;
  }

  const { ChatOrchestrator } = await import("@paramkhodiyar/chat-core");
  orchestratorInstance = new ChatOrchestrator({
    llm: {
      provider: "groq",
      apiKey: process.env.GROQ_API_KEY,
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      temperature: Number(process.env.GROQ_TEMPERATURE || 0.4),
      maxTokens: Number(process.env.GROQ_MAX_TOKENS || 700),
    },
    behavior: {
      persona:
        "You are Medico Assistant, a concise and helpful healthcare support bot for appointments, doctors, medicine orders, and profile help.",
      domainScope:
        "Stay focused on Medico platform guidance. Do not provide medical diagnosis. Encourage users to consult licensed doctors for medical advice.",
    },
    rag: {
      enabled: false,
      provider: "memory",
    },
  });

  return orchestratorInstance;
}

router.post("/", async (req, res) => {
  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";

  if (!message) {
    return res.status(400).json({ error: "message is required" });
  }

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  try {
    const orchestrator = await getOrchestrator();

    if (!orchestrator) {
      const fallback =
        "I am online, but the AI provider key is not configured yet. Please set GROQ_API_KEY in backend/.env to enable smart responses.";
      res.write(fallback);
      return res.end();
    }

    for await (const chunk of orchestrator.streamChat(message)) {
      res.write(chunk);
    }

    return res.end();
  } catch (error) {
    console.error("Chat route error:", error.message);

    if (!res.headersSent) {
      return res.status(500).json({ error: "Failed to process chat request" });
    }

    res.write("Sorry, I hit an internal error while generating a response.");
    return res.end();
  }
});

module.exports = router;
