import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../components/searchBar';
import NewsItem from '../components/NewsItem';
import Pagination from '../components/Pagination';
import { fetchNews } from '../features/newsSlice';
import '../styles/articleFetch.css';

const ArticleFetch = ({ defaultCategory }) => {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { articles, loading, error, totalResults } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews({ category: category || defaultCategory, page }));
  }, [category, defaultCategory, page, dispatch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNews = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(totalResults / 12); 

  return (
    <div className='fetchPage'>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <ul className="news-list">
            {filteredNews.map((article, index) => (
              <NewsItem key={index} article={article} />
            ))}
          </ul>
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default ArticleFetch;
