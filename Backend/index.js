import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./src/db/index.js";
import { getUser } from "./src/middleware/user.middleware.js";
import { crawlWebsite } from "./src/controllers/crawler.js";
import { AIComponent } from "./src/controllers/AIComponent.js";
import { getAllUsers } from "./src/controllers/getAllUsers.js";
import { chatHistory } from "./src/controllers/chatHistory.js";
import { userAnalytics } from "./src/controllers/userAnalytics.js";

dotenv.config();
const app = express();

let corsOptions = {
  origin: true, // Only allow request from this origin
};
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.post("/crawl/:website", getUser, crawlWebsite);

app.post("/chat/:website", getUser, AIComponent);

app.post("/currentUser", getUser);

app.get("/get-all-users", getAllUsers);

app.post("/get-user-chat", getUser, chatHistory);

app.get("/user-analytics", userAnalytics); // will also create the UI for this but currently it logs total number of users joined in which month

app.listen(process.env.PORT || 8000, async () => {
  console.log(`Server running on localhost:${process.env.PORT || 8000}`);
});
