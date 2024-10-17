import Link from 'next/link';

export default function ArticleCard({ article }: { article: any }) {
  const tags = article.tags ? article.tags.split(',') : [];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Wrap the image and title with Link to make the entire card clickable */}
      <Link href={`/articles/${article.id}`}>
        {/* Display the image if available */}
        {article.imageUrl && (
          <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover cursor-pointer" />
        )}
      </Link>

      <div className="p-4">
        {/* Wrap the title with Link */}
        <Link href={`/articles/${article.id}`}>
          <h2 className="text-xl font-bold mb-2 hover:text-blue-500 cursor-pointer">{article.title}</h2>
        </Link>

        {/* Short content snippet */}
        <p className="text-gray-600 mb-4">{article.content.substring(0, 100)}...</p>

        {/* Published date */}
        <p className="text-sm text-gray-500 mb-2">
          Published on: {new Date(article.publishedAt).toLocaleDateString()}
        </p>

        {/* Display tags if available */}
        <div className="flex space-x-2 mb-4">
          {tags.map((tag: string, index: number) => (
            <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>

        {/* "Read More" link */}
        <Link href={`/articles/${article.id}`} className="text-blue-500 hover:underline font-semibold">
          Read More
        </Link>
      </div>
    </div>
  );
}
