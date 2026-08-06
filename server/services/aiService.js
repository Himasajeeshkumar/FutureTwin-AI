import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

export async function askAI(prompt) {

    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY
    });

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.4
    });

    return completion.choices[0].message.content;
}