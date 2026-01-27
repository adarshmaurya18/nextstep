import { useEffect, useState } from "react";
import { fetchHNTrends } from "../services/hnTrends";

const HackerNews = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadHN() {
      try {
        const data = await fetchHNTrends();
        setStories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadHN();
  }, []);

  if (loading) return <p className="p-6">Loading Hacker News…</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">
        🧠 Hacker News – What Developers Discuss
      </h2>

      <p className="text-gray-600 mb-6">
        Real-time discussions from the global tech community.
      </p>

      <ul className="space-y-4">
        {stories.map((story) => (
          <li
            key={story.id}
            className="bg-white rounded-lg shadow p-4"
          >
            <a
              href={story.url}
              target="_blank"
              rel="noreferrer"
              className="text-lg font-semibold text-indigo-600"
            >
              {story.title}
            </a>

            <div className="text-sm text-gray-500 mt-1">
              👍 {story.score} · 💬 {story.descendants || 0} comments
            </div>
          </li>
        ))}
      </ul>

      <p className="text-xs text-gray-400 mt-6">
        Data source: Hacker News (read-only)
      </p>
    </div>
  );
};

export default HackerNews;
