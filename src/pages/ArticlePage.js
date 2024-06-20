// Separate Article Page after clicking on read more.
import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/articlePage.css";

const ArticlePage = () => {
  const location = useLocation();
  const { article } = location.state || {};

  if (!article) {
    return <p>Article not found</p>;
  }
  

  return (
    <div className="article-page">
      <div className="article-page-content">
        <h2 className="art-Title">{article.title}</h2>
        <img
          src={
            article.urlToImage ||
            "https://cdn-icons-png.flaticon.com/128/14534/14534501.png"
          } 
          className="art-Img"
          alt={article.title}
        />
        <p className="art-Desc">{article.content || article.description}</p>
        <p>Publisher : {article.source.name}</p>
        <p>Published At: {article.publishedAt}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          Read Full Article
        </a>
      </div>
    </div>
  );
};

export default ArticlePage;
