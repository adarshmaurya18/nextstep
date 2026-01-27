const BlogCard = ({ blog, onOpen }) => {
  return (
    <div
      onClick={() => onOpen(blog.id)}
      className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg cursor-pointer transition"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-indigo-600">
          {blog.category}
        </span>
        <span className="text-xs text-gray-500">
          {blog.readTime}
        </span>
      </div>

      <h3 className="text-lg font-bold mb-2">
        {blog.title}
      </h3>

      <p className="text-gray-600 text-sm mb-3">
        {blog.summary}
      </p>

      <div className="flex flex-wrap gap-2 text-xs text-gray-500">
        {blog.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 px-2 py-0.5 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogCard;
