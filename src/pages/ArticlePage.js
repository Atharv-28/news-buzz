import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/articlePage.css";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";


const ArticlePage = () => {
  const location = useLocation();
  const { article } = location.state || {};

  //If articles are not fetched
  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <div className="article-page">
      <div className="article-page-content">
        <div className="details-breadcrumb">
          <a href="/">Projects / </a>
          <span>Project Details</span>
        </div>
        <h2 className="art-Title">{article.title}</h2>
        <div className="ImageContainer">
          {article.urlToImage ? (
            <img
              className="art-Img"
              src={article.urlToImage}
              alt="Article"
            />
          ) : (
            <ImageNotSupportedIcon fontSize="large" style={{ color: "#359eff" }} />
          )}
        </div>
        <p className="art-Desc">{article.content || article.description}</p>
        <p className="art-info">
          Publisher : {article.source.name}, Author : {article.author}
        </p>
        <p className="art-info">Published At: {article.publishedAt}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          <OpenInNewIcon className="open-icon" fontSize="small" />
        </a>
      </div>
    </div>
  );
};

export default ArticlePage;
