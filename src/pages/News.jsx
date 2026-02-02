import { useEffect, useState } from "react";
import { fetchTechNews } from "../services/fetchNews";
import { analyzeNewsMock } from "../services/analyzeNewsMock";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadNews() {
      try {
        const articles = await fetchTechNews();
        const enriched = articles.map((article) => ({
          ...article,
          ai: analyzeNewsMock(article),
        }));
        setNews(enriched);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  if (loading) return <p className="p-6">Loading news…</p>;

  if (error) {
    return (
      <div className="p-6 text-red-600">
        Unable to load news right now.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">
        📰 Tech & Career News
      </h2>

      <p className="text-gray-600 mb-6">
        Real tech news with AI-powered career insights.
      </p>

      <div className="space-y-6">
        {news.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-6"
          >
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="text-xl font-semibold text-indigo-600"
            >
              {item.title}
            </a>

            <p className="text-sm text-gray-500 mt-1">
              Source: {item.source.name} ·{" "}
              {new Date(item.publishedAt).toDateString()}
            </p>

            <p className="text-gray-700 mt-3">
              {item.ai.summary}
            </p>

            {/* AI INSIGHTS */}
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">
                🧠 AI Career Insight (Mock)
              </p>

              {item.ai.impact.length > 0 && (
                <ul className="list-disc ml-5 text-sm text-gray-700 mb-2">
                  {item.ai.impact.map((i, iidx) => (
                    <li key={iidx}>{i}</li>
                  ))}
                </ul>
              )}

              {item.ai.roles.length > 0 && (
                <p className="text-sm text-gray-600">
                  <strong>Related roles:</strong>{" "}
                  {item.ai.roles.join(", ")}
                </p>
              )}

              {item.ai.skills.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Suggested skills:</strong>{" "}
                  {item.ai.skills.join(", ")}
                </p>
              )}

              <p className="text-xs text-gray-400 mt-2">
                Confidence: {item.ai.confidence}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;