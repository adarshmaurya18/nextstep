import { useEffect, useState } from "react";
import { fetchGithubTrends } from "../services/githubTrends";
import SkillHeatmap from "../components/SkillHeatmap";
import { aggregateSkills } from "../utils/aggregateSkills";

const GithubTrends = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTrends() {
      try {
        const data = await fetchGithubTrends();
        setRepos(data);
      } catch (err) {
        setError("Unable to load GitHub trends right now.");
      } finally {
        setLoading(false);
      }
    }

    loadTrends();
  }, []);

  if (loading) {
    return <p className="p-6">Loading GitHub trends…</p>;
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600 font-semibold">
          ⚠️ {error}
        </p>
        <p className="text-gray-500 text-sm mt-1">
          This may be due to GitHub rate limits. Please try again later.
        </p>
      </div>
    );
  }

  // 🔥 Aggregate skills from repos
  const skillStats = aggregateSkills(repos);

  return (
    <div className="p-6">
      {/* 🔥 Skills in Demand */}
      <SkillHeatmap skills={skillStats.slice(0, 6)} />

      {/* 🔥 Live GitHub Trends */}
      <h2 className="text-3xl font-bold mb-2">
        🔥 Live GitHub Trends
      </h2>

      <p className="text-gray-600 mb-6">
        Popular repositories developers are starring right now.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="bg-white rounded-xl shadow-md p-5"
          >
            <h3 className="text-lg font-semibold mb-1">
              {repo.full_name}
            </h3>

            <p className="text-sm text-gray-600 mb-3">
              {repo.description || "No description available."}
            </p>

            <div className="flex justify-between text-sm text-gray-500 mb-3">
              <span>⭐ {repo.stargazers_count}</span>
              <span>{repo.language || "Unknown"}</span>
            </div>

            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 text-sm font-semibold"
            >
              View on GitHub →
            </a>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-6">
        Data source: GitHub public repositories · Read-only
      </p>
    </div>
  );
};

export default GithubTrends;
