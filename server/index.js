import express from "express";
import cors from "cors";
import NewsAPI from "newsapi"; 
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); 
app.use(express.json()); 

// NewsAPI configuration
const API_KEY = process.env.NEWS_API_KEY;

const newsapi = new NewsAPI(API_KEY);

// Route to fetch news
app.post("/api/news", async (req, res) => {
  const { category = "general", page = 1 } = req.body; 
  try {
    const response = await newsapi.v2.topHeadlines({
        category,
        pageSize: 10, 
        page,
    });    
    console.log(response);
    
    res.status(200).json({
      articles: response.articles,
      totalResults: response.totalResults,
    });
  } catch (error) {
    if (error.response) {
      console.error("Error status:", error.response.status);
      console.error("Error data:", error.response.data);
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      console.error("Error fetching news:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running`);
});
