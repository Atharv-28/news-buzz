import React from 'react';
import ArticleFetch from '../features/ArtcileFetch';

const HomePage = () => {
  return (
    <div>
      <ArticleFetch defaultCategory="general" />
    </div>
  );
};

export default HomePage;
