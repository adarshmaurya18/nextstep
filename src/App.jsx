import { useState } from "react";
import RoleCard from "./components/RoleCard";
import Trending from "./pages/Trending";
import Salary from "./pages/Salary";
import { roles } from "./data/roles";
import { recommendRoles } from "./utils/recommendRoles";
import ReadinessChart from "./components/charts/ReadinessChart";
import TrendChart from "./components/charts/TrendChart";
import Blogs from "./pages/Blogs";
import News from "./pages/News";
import GithubTrends from "./pages/GithubTrends";
import HackerNews from "./pages/HackerNews";
import SkillTest from "./pages/SkillTest";



function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setSelectedSkills([]);
  };

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const readiness =
    selectedRole
      ? Math.round(
          (selectedSkills.length / selectedRole.skills.length) * 100
        )
      : 0;

  const missingSkills =
    selectedRole
      ? selectedRole.skills.filter(
          (skill) => !selectedSkills.includes(skill)
        )
      : [];

  const recommendations =
    selectedRole && selectedSkills.length > 0
      ? recommendRoles(roles, selectedRole, selectedSkills)
      : [];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* HEADER + NAV */}
      <header className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold">NextStep 🚀</h1>

          <nav className="flex gap-3">
            <button
              onClick={() => {
                setCurrentPage("home");
                setSelectedRole(null);
              }}
              className={`px-4 py-2 rounded-lg text-sm ${
                currentPage === "home"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => {
                setCurrentPage("trending");
                setSelectedRole(null);
              }}
              className={`px-4 py-2 rounded-lg text-sm ${
                currentPage === "trending"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              Trending Jobs
            </button>

            <button
          onClick={() => setCurrentPage("news")}
           className={`px-4 py-2 rounded-lg text-sm ${
          currentPage === "news"
          ? "bg-indigo-600 text-white"
           : "bg-gray-100"
            }`}
           >
          News
        </button>

            <button
               onClick={() => {
               setCurrentPage("blogs");
               setSelectedRole(null);
               }}
               className={`px-4 py-2 rounded-lg text-sm ${
               currentPage === "blogs"
               ? "bg-indigo-600 text-white"
               : "bg-gray-100"
              }`}
              >
           Blogs
             </button>

            <button
              onClick={() => {
                setCurrentPage("salary");
                setSelectedRole(null);
              }}
              className={`px-4 py-2 rounded-lg text-sm ${
                currentPage === "salary"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              Salary
            </button>
                <button
          onClick={() => setCurrentPage("github")}
          className={`px-4 py-2 rounded-lg text-sm ${
          currentPage === "github"
          ? "bg-indigo-600 text-white"
          : "bg-gray-100"
             }`}
           >
           GitHub Trends
           </button>
                        <button
                 onClick={() => setCurrentPage("hn")}
                 className={`px-4 py-2 rounded-lg text-sm ${
                 currentPage === "hn"
                 ? "bg-indigo-600 text-white"
                 : "bg-gray-100"
                  }`}
                   >
                   Hacker News
                   </button>
                 <button onClick={() => setCurrentPage("test")}
                   className={`px-4 py-2 rounded-lg text-sm ${
                  currentPage === "test"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100"
                  }`}
                  >
                   Skill Test
              </button>

                 

          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        {currentPage === "trending" && <Trending />}
        {currentPage === "salary" && <Salary />}
        {currentPage === "blogs" && <Blogs />}
        {currentPage === "news" && <News />}
        {currentPage === "github" && <GithubTrends />}
        {currentPage === "hn" && <HackerNews />}
        {currentPage === "test" && <SkillTest />}





        {currentPage === "home" && (
          <>
            {/* ROLE LIST */}
            {!selectedRole && (
              <>
                <h2 className="text-xl font-semibold mb-4">
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

            {/* ROLE DETAILS */}
            {selectedRole && (
              <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-1">
                  {selectedRole.title}
                </h2>

                <p className="text-gray-600 mb-4">
                  Avg Salary: <strong>{selectedRole.avgSalary}</strong>
                </p>

                {/* READINESS */}
                <div className="mb-6">
                  <p className="font-semibold mb-1">
                    Readiness: {readiness}%
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-indigo-600 h-3 rounded-full transition-all"
                      style={{ width: `${readiness}%` }}
                    />
                  </div>
                </div>

                {/* SKILLS */}
                <h3 className="font-semibold mb-3">
                  Select the skills you already know:
                </h3>

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
                    </label>
                  ))}
                </div>

                {/* MISSING SKILLS */}
                {missingSkills.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-red-600">
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

                {/* RECOMMENDATIONS */}
                {recommendations.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-3">
                      🎯 Recommended Roles for You
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {recommendations.map((role) => (
                        <div
                          key={role.id}
                          className="bg-green-50 border border-green-200 rounded-lg p-4"
                        >
                          <h4 className="font-bold mb-1">
                            {role.title}
                          </h4>

                          <p className="text-sm">
                            Readiness: <strong>{role.readiness}%</strong>
                          </p>

                          <p className="text-sm">
                            Demand: <strong>{role.demand}</strong>
                          </p>

                          <p className="text-sm">
                            Salary: <strong>{role.avgSalary}</strong>
                          </p>

                          <p className="text-xs text-gray-600 mt-2">
                            Why: Your skills match {role.matchedSkillsCount} key
                            skills and this role has strong market demand.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* CHARTS */}
                <ReadinessChart
                  selectedRole={selectedRole}
                  selectedSkills={selectedSkills}
                />
                <TrendChart roles={roles} />
          </>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-white py-4 text-center text-sm text-gray-500">
        © 2026 NextStep · Built for career clarity 🇮🇳
      </footer>
    </div>
  );
}

export default App;