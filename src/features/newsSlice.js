import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = "6240a1cac580df9f7b8e90a3df52dcb9";

// Define the fetchNews async thunk
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ category, page }, { rejectWithValue }) => {
    try {
      const lowerCaseCategory = category.toLowerCase();
      const url = `https://gnews.io/api/v4/top-headlines?category=${lowerCaseCategory}&lang=en&country=in&apikey=&page=${page}&max=10`;
      console.log("API URL:", url);

      const response = await axios.get(url);
      return { articles: response.data.articles, totalResults: response.data.totalArticles };
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Network Error');
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    loading: false,
    error: null,
    totalResults: 0,
    savedArticles: JSON.parse(localStorage.getItem('savedArticles')) || [],
  },
  reducers: {
    saveArticle: (state, action) => {
      const isAlreadySaved = state.savedArticles.some(article => article.title === action.payload.title);
      if (!isAlreadySaved) {
        state.savedArticles.push(action.payload);
        localStorage.setItem('savedArticles', JSON.stringify(state.savedArticles));
        console.log("Article saved:", action.payload);
      }
    },
    loadSavedArticles: (state) => {
      state.articles = state.savedArticles;
      state.totalResults = state.savedArticles.length;
      console.log("Loaded saved articles:", state.savedArticles);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.totalResults = action.payload.totalResults;
        console.log("Fetched articles:", action.payload.articles);
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = `Failed to fetch news: ${action.payload || action.error.message}`;
        console.error("Fetch news error:", state.error);
      });
  },
});

// Export the actions and reducer
export const { saveArticle, loadSavedArticles } = newsSlice.actions;
export default newsSlice.reducer;
