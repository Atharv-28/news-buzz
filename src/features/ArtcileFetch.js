import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/searchBar";
import NewsItem from "../components/NewsItem";
import Pagination from "../components/Pagination";
import { fetchNews, loadSavedArticles } from "./newsSlice";
import "../styles/articleFetch.css";

const ArticleFetch = ({ defaultCategory }) => {
  const { category } = useParams();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { articles, loading, error, totalResults, savedArticles } = useSelector(
    (state) => state.news
  );

  useEffect(() => {
    if (location.pathname === "/saved") {
      dispatch(loadSavedArticles());
    } else {
      dispatch(fetchNews({ category: category || defaultCategory, page }));
    }
  }, [category, defaultCategory, page, location.pathname, dispatch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNews = (category === "saved" ? savedArticles : articles).filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil((category === "saved" ? filteredNews.length : totalResults) / 10);

  return (
    <div className="fetchPage">
      <div className="fetchContent">
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        {loading && category !== "saved" ? (
          <p className="Msg">Loading...</p>
        ) : error && category !== "saved" ? (
          <p className="Msg">{error}</p>
        ) : (
          <div className="list-container">
            <ul className="news-list">
              {filteredNews.map((article, index) => (
                <NewsItem key={index} article={article} />
              ))}
            </ul>
            {location.pathname !== "/saved" && (
              <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleFetch;
