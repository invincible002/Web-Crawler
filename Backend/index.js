import dotenv from "dotenv";
import express from "express";
import { crawlWebsite } from "./src/crawler.js";
import cors from "cors";
import { AIComponent } from "./src/AIComponent.js";
import connectDB from "./src/db/index.js";
import { getUser } from "./src/middleware/user.middleware.js";

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

app.post("/chat", getUser, AIComponent);

app.post("/currentUser", getUser);

app.listen(process.env.PORT || 8000, async () => {
  console.log(`Server running on localhost:${process.env.PORT || 8000}`);
});
