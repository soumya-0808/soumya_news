'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    fetchArticle();
  }, [id]);

  if (!article) {
    return <p>Loading...</p>;
  }

  const tags = article.tags ? article.tags.split(',') : [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-600 mb-4">By {article.author}</p>
      <p className="text-lg mb-4">{article.content}</p>
      <div className="flex space-x-2">
        {tags.map((tag: string, index: number) => (
          <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
