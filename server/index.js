const express = require('express');
const axios = require('axios');
const cors = require('cors');
import dotenv from 'dotenv';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// NewsAPI configuration
const API_KEY = process.env.NEWS_API_KEY; 
const BASE_URL = 'https://newsapi.org/v2';

// Route to fetch news
app.get('/api/news', async (req, res) => {
  const { category = 'general', page = 1 } = req.query; // Get category and page from query params

  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        apiKey: API_KEY,
        category,
        page,
        pageSize: 10, // Number of articles per page
        country: 'us', // You can change this to your preferred country
      },
    });

    // Send the articles and total results back to the client
    res.status(200).json({
      articles: response.data.articles,
      totalResults: response.data.totalResults,
    });
  } catch (error) {
    console.error('Error fetching news from API:', error.message);
    res.status(500).json({ error: 'Failed to fetch news from API' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});