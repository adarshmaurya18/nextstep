import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import RoleCard from "./components/RoleCard";
import Trending from "./pages/Trending";
import Salary from "./pages/Salary";
import Blogs from "./pages/Blogs";
import News from "./pages/News";
import GithubTrends from "./pages/GithubTrends";
import HackerNews from "./pages/HackerNews";
import SkillTest from "./pages/SkillTest";
import PageTransition from "./components/PageTransition";
import HeroSection from "./components/HeroSection";

import { roles } from "./data/roles";
import { recommendRoles } from "./utils/recommendRoles";
import ReadinessChart from "./components/charts/ReadinessChart";
import TrendChart from "./components/charts/TrendChart";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [skillScores, setSkillScores] = useState(() => {
    return JSON.parse(sessionStorage.getItem("skillScores")) || {};
  });

  useEffect(() => {
    if (currentPage === "home") {
      const stored =
        JSON.parse(sessionStorage.getItem("skillScores")) || {};
      setSkillScores(stored);
    }
  }, [currentPage]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setSelectedSkills([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const readiness = selectedRole
    ? Math.round(
        (selectedRole.skills.filter((skill) => {
          if (selectedSkills.includes(skill)) return true;
          if (skillScores[skill] && skillScores[skill] >= 60) return true;
          return false;
        }).length /
          selectedRole.skills.length) *
          100
      )
    : 0;

  const missingSkills = selectedRole
    ? selectedRole.skills.filter((skill) => {
        if (selectedSkills.includes(skill)) return false;
        if (skillScores[skill] && skillScores[skill] >= 60) return false;
        return true;
      })
    : [];

  const recommendations =
    selectedRole && selectedSkills.length > 0
      ? recommendRoles(roles, selectedRole, selectedSkills)
      : [];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold">NextStep 🚀</h1>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-3">
              {[
                ["home", "Home"],
                ["trending", "Trending Jobs"],
                ["news", "News"],
                ["blogs", "Blogs"],
                ["salary", "Salary"],
                ["github", "GitHub"],
                ["hn", "Hacker News"],
                ["test", "Skill Test"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentPage(key);
                    setSelectedRole(null);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm transition ${
                    currentPage === key
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-4 flex flex-col gap-2">
              {[
                ["home", "Home"],
                ["trending", "Trending Jobs"],
                ["news", "News"],
                ["blogs", "Blogs"],
                ["salary", "Salary"],
                ["github", "GitHub"],
                ["hn", "Hacker News"],
                ["test", "Skill Test"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentPage(key);
                    setSelectedRole(null);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className="flex-1">
        {currentPage !== "home" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <PageTransition>
              {currentPage === "trending" && <Trending />}
              {currentPage === "salary" && <Salary />}
              {currentPage === "blogs" && <Blogs />}
              {currentPage === "news" && <News />}
              {currentPage === "github" && <GithubTrends />}
              {currentPage === "hn" && <HackerNews />}
              {currentPage === "test" && <SkillTest />}
            </PageTransition>
          </div>
        )}

        {currentPage === "home" && (
          <>
            <HeroSection
              onExplore={() =>
                window.scrollTo({ top: 700, behavior: "smooth" })
              }
              onTest={() => setCurrentPage("test")}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {!selectedRole && (
                <>
                  <h2 className="text-xl font-semibold mb-6">
                    Select a role to analyze your readiness
                  </h2>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {roles.map((role) => (
                      <RoleCard
                        key={role.id}
                        role={role}
                        onSelect={handleRoleSelect}
                      />
                    ))}
                  </div>
                </>
              )}

              {selectedRole && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto"
                >
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="mb-4 text-sm text-indigo-600 font-semibold hover:underline"
                  >
                    ← Back to roles
                  </button>

                  <h2 className="text-2xl font-bold mb-2">
                    {selectedRole.title}
                  </h2>

                  <p className="text-gray-600 mb-4">
                    Avg Salary: <strong>{selectedRole.avgSalary}</strong>
                  </p>

                  {/* Readiness */}
                  <div className="mb-6">
                    <p className="font-semibold mb-1">
                      Readiness: {readiness}%
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${readiness}%` }}
                        transition={{ duration: 0.6 }}
                        className="bg-indigo-600 h-3 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {selectedRole.skills.map((skill) => (
                      <label
                        key={skill}
                        className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSkills.includes(skill)}
                          onChange={() => toggleSkill(skill)}
                        />
                        <span>{skill}</span>
                        {skillScores[skill] && (
                          <span className="text-xs text-green-600 ml-2">
                            ✓ {skillScores[skill]}%
                          </span>
                        )}
                      </label>
                    ))}
                  </div>

                  {missingSkills.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-red-600 mb-2">
                        Skills to learn next:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {missingSkills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              <ReadinessChart
                selectedRole={selectedRole}
                selectedSkills={selectedSkills}
              />
              <TrendChart roles={roles} />
            </div>
          </>
        )}
      </main>

      <footer className="bg-white py-4 text-center text-sm text-gray-500">
        © 2026 NextStep · Built for career clarity 🇮🇳
      </footer>
    </div>
  );
}

export default App;