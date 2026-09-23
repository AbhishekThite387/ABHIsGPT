import Groq from "groq-sdk";
import "dotenv/config";

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const getGroqAPIResponse = async (message) => {
    try {
        const response = await client.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "user",
                    content: message,
                },
            ],
        });

        return response.choices[0].message.content;
    } catch (err) {
        console.log(err);
    }
};

export default getGroqAPIResponse;