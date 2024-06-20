import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveArticle } from "../features/newsSlice";
import "../styles/newsItem.css";

const NewsItem = ({ article }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = () => {
    dispatch(saveArticle(article));
  };

  const handleReadMore = () => {
    navigate(`/article/${encodeURIComponent(article.title)}`, { state: { article } });
  };

  return (
    <li className="news-item">
      <div className="ImageContainer">
        <img
          className="articleImg"
          src={article.urlToImage || 'https://cdn-icons-png.flaticon.com/128/14534/14534501.png'}
          alt="Image Not Found"
        />
      </div>
      <div className="article-text">
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <button className="readBut" onClick={handleReadMore}>Read More 🗞️</button>
      </div>
      <button className="saveBut" onClick={handleSave}>Save</button>
    </li>
  );
};

export default NewsItem;
