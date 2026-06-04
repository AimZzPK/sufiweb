export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://naqshbandi-sufi.vercel.app", // jouw Vercel URL
        "X-Title": "Naqshbandi AI"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-70b-instruct", // of elk model op OpenRouter
        messages: req.body.messages,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("OpenRouter error:", data.error);
      return res.status(500).json({ error: data.error });
    }

    res.json(data);

  } catch (err) {
    console.error("Handler error:", err);
    res.status(500).json({ error: "Server error" });
  }
}