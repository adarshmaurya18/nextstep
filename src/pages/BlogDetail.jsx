import { blogs } from "../data/blogs";

const BlogDetail = ({ blogId, onBack }) => {
  const blog = blogs.find((b) => b.id === blogId);

  if (!blog) {
    return <p className="p-6">Blog not found.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={onBack}
        className="text-indigo-600 mb-4"
      >
        ← Back to Blogs
      </button>

      <h1 className="text-3xl font-bold mb-2">
        {blog.title}
      </h1>

      <div className="text-sm text-gray-500 mb-4">
        {blog.date} · {blog.readTime}
        <div className="text-xs text-gray-400 mb-4">
          Source: {blog.source} · Updated: {blog.lastUpdated}
        </div>

      </div>

      <div className="prose max-w-none whitespace-pre-line">
        {blog.content}
      </div>
    </div>
  );
};

export default BlogDetail;
