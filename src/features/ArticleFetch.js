import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NewsItem from "../components/NewsItem";
import Pagination from "../components/Pagination";
import { fetchNews, loadSavedArticles } from "./newsSlice";
import "../styles/articleFetch.css";

const ArticleFetch = ({ defaultCategory = "general", searchTerm }) => {
  const { category } = useParams(); // for category of news
  const location = useLocation(); // for page location
  const [page, setPage] = useState(1); // for pagination
  const dispatch = useDispatch(); // redux method to handle states
  const { articles, loading, error, totalResults, savedArticles } = useSelector(
    (state) => state.news
  );

  useEffect(() => {
    if (location.pathname === "/saved") {
      dispatch(loadSavedArticles()); // to load saved articles when on saved page
    } else {
      dispatch(fetchNews({ category: category || defaultCategory, page })); // To load news according to category & page no
    }
  }, [category, defaultCategory, page, location.pathname, dispatch]); // Parameters/props for useEffect

  // Handling results of search
  const filteredNews = (
    location.pathname === "/saved" ? savedArticles : articles
  ).filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // To specify no. of articles in a single page
  const totalPages = Math.ceil(
    (location.pathname === "/saved" ? filteredNews.length : totalResults) / 10
  );

  return (
    <div className="fetchPage">
      <div className="fetchContent">
        {loading && location.pathname !== "/saved" ? (
          <p className="Msg">Loading...</p>
        ) : error && location.pathname !== "/saved" ? (
          <p className="Msg">{error}</p>
        ) : (
          <div className="list-container">
            <ul className="news-list">
              {filteredNews.map((article, index) => (
                <NewsItem
                  key={index}
                  article={article}
                  isSaved={location.pathname === "/saved"}
                />
              ))}
            </ul>
            <div className="pagination-container">
              {location.pathname !== "/saved" && (
                <Pagination
                  page={page}
                  setPage={setPage}
                  totalPages={totalPages}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleFetch;
