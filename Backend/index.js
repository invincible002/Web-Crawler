import express from "express";
import { crawlWebsite } from "./src/crawler.js";
import cors from "cors";
const app = express();

let corsOptions = {
  origin: true, // Only allow request from this origin
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get("/crawl/:website", crawlWebsite);

app.listen(process.env.PORT || 8000, async () => {
  console.log(`Server running on localhost:${process.env.PORT || 8000}`);
});
