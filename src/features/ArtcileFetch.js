import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SearchBar from '../components/searchBar';
import axios from 'axios';
import '../styles/articleFetch.css';

const ArticleFetch = () => {
  const { category } = useParams();
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const MyapiKey = "feb043f853ee48c383b367265745bca8";

  useEffect(() => {
    fetchNews();
  }, [category, page]);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${page}&apiKey=${MyapiKey}`
      );
      setNews(response.data.articles);
    } catch (error) {
      setError('Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNews = news.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const saveArticle = (article) => {
    const savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];
    localStorage.setItem('savedArticles', JSON.stringify([...savedArticles, article]));
  };

  const goToArticle = (article) => {
    navigate(`/article/${article.title}`, { state: { article } });
  };

  console.log("data received");
  return (
    <div>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <ul className="news-list">
            {filteredNews.map((article, index) => (
              <li key={index} className="news-item">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <button onClick={() => saveArticle(article)}>Save</button>
                <button onClick={() => goToArticle(article)}>Read More</button>
              </li>
            ))}
          </ul>
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleFetch;
