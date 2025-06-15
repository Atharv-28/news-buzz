import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveArticle, deleteSavedArticle } from "../features/newsSlice";
import "../styles/newsItem.css";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

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
    navigate(`/article/${encodeURIComponent(article.title)}`, {
      state: { article },
    });
  };

  return (
    <li className="news-item">
      <div className="article-text">
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <div className="article-buttons">
          <button className="readBut" onClick={handleReadMore}>
            <OpenInNewIcon fontSize="small" className="open-icon" />
          </button>
          {isSaved ? (
            <button className="deleteBut" onClick={handleDelete}>
              <DeleteIcon fontSize="small" className="delete-icon" />
            </button>
          ) : (
            <button className="saveBut" onClick={handleSave}>
              <BookmarkIcon fontSize="small" className="bookmark-icon" />
            </button>
          )}
        </div>
      </div>
      <div className="ImageContainer">
        {article.urlToImage ? (
          <img className="articleImg" src={article.urlToImage} alt="Article" />
        ) : (
          <ImageNotSupportedIcon fontSize="large" style={{ color: "#359eff" }} />
        )}
      </div>
    </li>
  );
};

export default NewsItem;
