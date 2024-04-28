import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { User } from "./models/user.modal.js";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyBBeQeLGxbzHWp3MAmJD1g5lvTpe2ONtFs");

async function AIComponent(req, res) {
  // For text-only input, use the gemini-pro model
  const user = req.body?.user;
  const newMesgs = req.body?.chat;
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const content = fs.readFileSync("../Backend/text/text-content.txt", "utf8");
  let history = [
    {
      role: "user",
      parts: [{ text: content }],
    },
    {
      role: "model",
      parts: [{ text: "Hello! Nice to meet you" }],
    },
  ];

  newMesgs.forEach((element) => {
    history = [...history, element];
  });

  history = history.filter((curr, index) => index < history.length - 1);

  // console.log(history);
  const chat = model.startChat({
    history,
    // generationConfig: {
    //   maxOutputTokens: 200,
    // },
  });

  const msg = newMesgs[newMesgs.length - 1].parts[0].text;
  try {
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    await User.updateOne(
      {
        email: user.email,
      },
      {
        $inc: { queryCount: 1 },
      }
    );
    return res.status(200).json({ message: text });
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
}

export { AIComponent };
