import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyBBeQeLGxbzHWp3MAmJD1g5lvTpe2ONtFs");

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const content = fs.readFileSync("../text/text-content.txt", "utf8");
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: content }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    // generationConfig: {
    //   maxOutputTokens: 200,
    // },
  });

  const msg = "Does zethic provides ios development?";

  try {
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  } catch (error) {
    console.log(error);
  }
}

run();
