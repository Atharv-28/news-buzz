import React from 'react';
import ArticleFetch from '../features/ArticleFetch';

const HomePage = ({searchTerm}) => {
  return (
    <div>
      <ArticleFetch defaultCategory="general" searchTerm={searchTerm} />
    </div>
  );
};

export default HomePage;
