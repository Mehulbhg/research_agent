console.log(" THIS IS THE REAL SERVER FILE");
import express from "express";
import cors from "cors";
import axios from "axios";
import { parseStringPromise } from "xml2js";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
  res.send("Backend is working");
});


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("API KEY:", process.env.GEMINI_API_KEY);

app.get("/search", async (req, res) => {
  const topic = req.query.q;

  try {
   
    const response = await axios.get(
      `https://export.arxiv.org/api/query?search_query=all:${topic}&start=0&max_results=3`
    );

    const parsed = await parseStringPromise(response.data);
    const entries = parsed.feed.entry;

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    let results = [];

    for (let paper of entries) {
      const title = paper.title[0];
      const abstract = paper.summary[0];

      const aiResponse = await model.generateContent(
        `Summarize this research paper in 3 simple bullet points:\n${abstract}`
      );

      const summary = aiResponse.response.text();

      results.push({ title, summary });
    }


    res.json(results);

  } catch (err) {
   console.error(" FULL ERROR:", err.response?.data || err.message || err);
    res.status(500).send("Something went wrong");
  }
});

app.listen(5001, () => {
  console.log("AI Server running on port 5001");
});