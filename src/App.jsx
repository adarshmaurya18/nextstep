import { useState } from "react";
import RoleCard from "./components/RoleCard";
import Trending from "./pages/Trending";
import Salary from "./pages/Salary";
import { roles } from "./data/roles";

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
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        {currentPage === "trending" && <Trending />}
        {currentPage === "salary" && <Salary />}

        {currentPage === "home" && (
          <>
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
              </div>
            )}
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