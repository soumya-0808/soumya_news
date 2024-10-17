'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function ArticlePage() {
  const { id } = useParams();  // Get the dynamic `id` from the URL
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Fetch the article from the backend API using the dynamic `id`
        const response = await axios.get(`/api/articles/${id}`);
        setArticle(response.data);  // Set the fetched article data
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    if (id) {
      fetchArticle();  // Only fetch the article if `id` exists
    }
  }, [id]);

  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-600 mb-4">By {article.author}</p>

      {/* Display the image if it's available */}
      {article.imageUrl && (
        <img src={article.imageUrl} alt={article.title} className="mb-4 max-w-full h-auto rounded-lg shadow-md" />
      )}

      {/* Display the published date */}
      <p className="text-sm text-gray-500 mb-4">
        Published on: {new Date(article.publishedAt).toLocaleDateString()}
      </p>

      <p className="text-lg mb-4">{article.content}</p>

      {/* Display tags if they exist */}
      <div className="flex space-x-2">
        {article.tags && article.tags.split(',').map((tag: string, index: number) => (
          <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
