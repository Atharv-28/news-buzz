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
    navigate(`/article/${article.title}`, { state: { article } });
  };

  return (
    <li className="news-item">
      <img
        className="articleImg"
        src={article.urlToImage}
        alt="https://cdn-icons-png.flaticon.com/128/13932/13932148.png"
      />
      <div>
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <button onClick={handleReadMore}>Read More</button>
      </div>
      <button onClick={handleSave}>Save</button>
    </li>
  );
};

export default NewsItem;
