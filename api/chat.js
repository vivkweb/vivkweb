// api/chat.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // تأكد انك ضايف المفتاح في Vercel
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // تقدر تغيرها لـ gpt-4 اذا متاح لك
        messages: [
          { role: "system", content: "انت مساعد ذكي اسمه Vivk." },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    return res.status(200).json({
      reply: data.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
