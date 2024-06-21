import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = "077bb8175639502038599c91cb39f3ec"; //Storing Api Key, can be also done by inserting directly in .get() or .fetch()


//creating Async Thunk for error Handling
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ category, page }, { rejectWithValue }) => {
    try {
      const lowerCaseCategory = category.toLowerCase();
      const url = `https://gnews.io/api/v4/top-headlines?category=${lowerCaseCategory}&lang=en&country=in&apikey=${apiKey}&page=${page}&max=10`;
      const response = await axios.get(url);
      return { articles: response.data.articles, totalResults: response.data.totalArticles };
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Network Error');
    }
  }
);


// creating slice to manage perticular states over whole react-app
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
    // reducers are used to handle save article feature (saving,loading and deleting)
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
  // addCases to handle state of fetching 
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
