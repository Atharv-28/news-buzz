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
      console.log("Loading saved articles");
    } else {
      dispatch(fetchNews({ category: category || defaultCategory, page }));
      console.log(`Fetching news for category: ${category || defaultCategory}, page: ${page}`);
    }
  }, [category, defaultCategory, page, location.pathname, dispatch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNews = (location.pathname === "/saved" ? savedArticles : articles).filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered news:", filteredNews);

  const totalPages = Math.ceil((location.pathname === "/saved" ? filteredNews.length : totalResults) / 10);

  return (
    <div className="fetchPage">
      <div className="fetchContent">
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        {loading && location.pathname !== "/saved" ? (
          <p className="Msg">Loading...</p>
        ) : error && location.pathname !== "/saved" ? (
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
