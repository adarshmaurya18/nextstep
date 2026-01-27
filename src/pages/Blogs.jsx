import { useState } from "react";
import { blogs } from "../data/blogs";
import BlogCard from "../components/BlogCard";
import BlogDetail from "./BlogDetail";

const Blogs = () => {
  const [activeBlog, setActiveBlog] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");


  if (activeBlog) {
    return (
      <BlogDetail
        blogId={activeBlog}
        onBack={() => setActiveBlog(null)}
      />
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-2">
        📝 Career & Tech Blogs
      </h2>

      <p className="text-gray-600 mb-6">
        Insights on tech trends, careers, and industry changes.
      </p>
        <div className="flex gap-3 mb-6">
           {["All", "Trends", "Careers", "Industry"].map((cat) => (
            <button
               key={cat}
               onClick={() => setSelectedCategory(cat)}
               className={`px-3 py-1 rounded-full text-sm ${
               selectedCategory === cat
                ? "bg-indigo-600 text-white"
                : "bg-gray-100"
                }`}
              >
            {cat}
           </button>
            ))}
        </div>




      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs
         .filter(
         (b) =>
       selectedCategory === "All" ||
      b.category === selectedCategory
     )
        .map((blog) => (
      <BlogCard
      key={blog.id}
      blog={blog}
      onOpen={setActiveBlog}
     />
    ))}

      </div>
    </div>
  );
};

export default Blogs;
