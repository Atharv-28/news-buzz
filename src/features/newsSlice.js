import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { response as mockData } from '../util/fetchData'; // Import the mock data

// Creating Async Thunk to fetch data from the mock file
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate the structure returned by the API
      return { articles: mockData, totalResults: mockData.length };
    } catch (error) {
      return rejectWithValue('Failed to fetch news from mock data');
    }
  }
);

// Creating slice to manage particular states over the whole React app
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
    // Reducers are used to handle save article feature (saving, loading, and deleting)
    saveArticle: (state, action) => {
      const isAlreadySaved = state.savedArticles.some(article => article.title === action.payload.title);
      if (!isAlreadySaved) {
        state.savedArticles.push(action.payload);
        localStorage.setItem('savedArticles', JSON.stringify(state.savedArticles));
      }
    },
    loadSavedArticles: (state) => {
      state.articles = state.savedArticles;
      state.totalResults = state.savedArticles.length;
    },
    deleteSavedArticle: (state, action) => {
      state.savedArticles = state.savedArticles.filter(article => article.title !== action.payload.title);
      localStorage.setItem('savedArticles', JSON.stringify(state.savedArticles));
    }
  },
  // Add cases to handle state of fetching
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
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = `Failed to fetch news: ${action.payload || action.error.message}`;
      });
  },
});

export const { saveArticle, loadSavedArticles, deleteSavedArticle } = newsSlice.actions;
export default newsSlice.reducer;
