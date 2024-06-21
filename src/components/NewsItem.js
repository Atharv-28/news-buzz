import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveArticle, deleteSavedArticle } from "../features/newsSlice";
import "../styles/newsItem.css";

const NewsItem = ({ article, isSaved }) => {
  //initialte imports 
  const dispatch = useDispatch();
  const navigate = useNavigate();


  //Calling saveArticle() to save respective article, function code in newsSlice.js
  const handleSave = () => {
    dispatch(saveArticle(article));
  };

  //Calling deleteSaveArticle() to delete saved article, function code in newsSlice.js
  const handleDelete = () => {
    dispatch(deleteSavedArticle(article));
  };


  //navigating user to articlePage.js for detailed info view
  const handleReadMore = () => {
    navigate(`/article/${encodeURIComponent(article.title)}`, { state: { article } });
  };

  return (
    <li className="news-item">
      <div className="ImageContainer">
        <img
          className="articleImg"
          src={article.image || 'https://cdn-icons-png.flaticon.com/128/14534/14534501.png'}
          alt="Image Not Found"
        />
      </div>
      <div className="article-text">
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <button className="readBut" onClick={handleReadMore}>Read More 🗞️</button>
      </div>
      {isSaved ? (
        <button className="deleteBut" onClick={handleDelete}>Delete</button>
      ) : (
        <button className="saveBut" onClick={handleSave}>Save</button>
      )}
    </li>
  );
};

export default NewsItem;
