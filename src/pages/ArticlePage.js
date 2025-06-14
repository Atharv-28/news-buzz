import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/articlePage.css";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

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
        <img
          src={
            article.image ||
            "https://cdn-icons-png.flaticon.com/128/14534/14534501.png"
          }
          className="art-Img"
          alt={article.title}
        />
        <p className="art-Desc">{article.content || article.description}</p>
        <p className="art-info">Publisher : {article.source.name}</p>
        <p className="art-info">Published At: {article.publishedAt}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          <OpenInNewIcon className="open-icon" fontSize="small" />
        </a>
      </div>
    </div>
  );
};

export default ArticlePage;
