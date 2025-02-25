// src/NewsPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/news'); // CoinGecko news API endpoint
      const data = await response.json();
      setNews(data);
    };

    fetchNews();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="bg-green-600 p-4 text-white text-center text-2xl font-bold">
        CoinGecko Crypto News
      </div>
      <div className="max-w-2xl mx-auto p-4">
        {news.map((article, index) => (
          <Link 
            to={{ pathname: `/news/${index}`, state: { article } }} 
            key={index} 
            className="block bg-gray-800 rounded-lg p-4 mb-4 hover:bg-gray-700 transition"
          >
            <h2 className="text-lg font-semibold text-white">{article.title}</h2>
            <p className="text-gray-400">{article.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;