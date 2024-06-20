import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const MyapiKey = "cbccc7c17dcb4be9b57e6a4976ea8259";

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ category, page }) => {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${page}&apiKey=${MyapiKey}`
    );
    return { articles: response.data.articles, totalResults: response.data.totalResults };
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
      state.savedArticles.push(action.payload);
      localStorage.setItem('savedArticles', JSON.stringify(state.savedArticles));
    },
    loadSavedArticles: (state) => {
      state.articles = state.savedArticles;
      state.totalResults = state.savedArticles.length;
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
      })
      .addCase(fetchNews.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch news';
      });
  },
});

export const { saveArticle, loadSavedArticles } = newsSlice.actions;
export default newsSlice.reducer;
