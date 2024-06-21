import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/searchBar";
import NewsItem from "../components/NewsItem";
import Pagination from "../components/Pagination";
import { fetchNews, loadSavedArticles } from "./newsSlice";
import "../styles/articleFetch.css";

const ArticleFetch = ({ defaultCategory }) => {
  //Initiating States
  const { category } = useParams();  //for category of news
  const location = useLocation();  // for page location
  const [searchTerm, setSearchTerm] = useState(""); // for search mechanism
  const [page, setPage] = useState(1); // for pagination
  const dispatch = useDispatch();  // redux method to handle states
  const { articles, loading, error, totalResults, savedArticles } = useSelector(
    (state) => state.news
  );

  useEffect(() => {
    if (location.pathname === "/saved") {
      dispatch(loadSavedArticles());  // to load saved articles when on saved page
    } else {
      dispatch(fetchNews({ category: category || defaultCategory, page }));  // To load news according to category & page no {Note: Because of Gnews, we will only get 10 articles that's why we will have 1 page of news & pagination is useless}
    }
  }, [category, defaultCategory, page, location.pathname, dispatch]); // Parameters/props for useEffect

  // Handling search typing event
  const handleSearch = (event) => {
    setSearchTerm(event.target.value); 
  };

  // Handling results of above search event
  const filteredNews = (location.pathname === "/saved" ? savedArticles : articles).filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // To specify no. of articles in a single page. {Read Note on line no. 25}
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
                <NewsItem key={index} article={article} isSaved={location.pathname === "/saved"} />
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
