import { useState, useEffect } from "react";
import { roles } from "./data/roles";
import RoleCard from "./components/RoleCard";
import SkillSelector from "./components/SkillSelector";
import { calculateReadiness } from "./utils/calculateReadiness";

function App() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);

  // ✅ LOAD saved data (runs once)
  useEffect(() => {
    const savedRole = localStorage.getItem("selectedRole");
    const savedSkills = localStorage.getItem("selectedSkills");

    if (savedRole) {
      setSelectedRole(JSON.parse(savedRole));
    }
    if (savedSkills) {
      setSelectedSkills(JSON.parse(savedSkills));
    }
  }, []);

  // ✅ SAVE data when state changes
  useEffect(() => {
    if (selectedRole) {
      localStorage.setItem("selectedRole", JSON.stringify(selectedRole));
      localStorage.setItem(
        "selectedSkills",
        JSON.stringify(selectedSkills)
      );
    }
  }, [selectedRole, selectedSkills]);

  const readiness =
    selectedRole &&
    calculateReadiness(selectedRole.skills, selectedSkills);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-8">
      <header className="text-center mb-8">
           <h1 className="text-3xl sm:text-4xl font-bold">
               NextStep 🚀
           </h1>

           <p className="mt-2 text-gray-600 max-w-xl mx-auto">
             See how close you are to a job, what to learn next,
              and how it impacts salary.
          </p>
      </header>

      {!selectedRole && (
  <>
    <p className="text-center text-gray-600 mb-6 max-w-xl mx-auto">
      Pick a role to get a personalized readiness score and a step-by-step learning plan.
    </p>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {roles.map((role) => (
        <RoleCard
          key={role.id}
          role={role}
          onSelect={setSelectedRole}
        />
      ))}
    </div>
  </>
)}


      {selectedRole && (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold">
            {selectedRole.title}
          </h2>

          <p className="text-sm text-gray-600 mb-4">
            Salary: {selectedRole.salary} · Demand:{" "}
            {selectedRole.demand}
          </p>

          <SkillSelector
            skills={selectedRole.skills}
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
          />

          {readiness && (
            <div className="mt-6 space-y-3">
              <p className="text-lg font-semibold">
                Readiness: {readiness.percentage}%
                <div className="w-full bg-gray-200 rounded-full h-3">
                 <div
                className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                 style={{ width: `${readiness.percentage}%` }}
                  />
                 </div>

              </p>

              <p className="text-sm text-gray-600">
                Estimated time to job:{" "}
                <span className="font-medium">
                  {readiness.monthsToJob} month(s)
                </span>
              </p>

              {readiness.missingSkills.length > 0 ? (
                <div>
                  <p className="font-medium mb-1">
                    Learn these next:
                  </p>
                  <ul className="list-decimal list-inside text-sm">
                    {readiness.missingSkills.map((skill) => (
                      <li key={skill.name}>
                        {skill.name}
                        {skill.salaryBoost > 0 && (
                          <span className="text-green-600">
                            {" "}
                            (+salary impact)
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-green-600 font-medium">
                  🎉 You are job-ready!
                </p>
              )}
            </div>
          )}

          <button
            onClick={() => {
              setSelectedRole(null);
              setSelectedSkills([]);
              localStorage.clear();
            }}
            className="mt-6 text-sm text-indigo-600 underline"
          >
            ← Change role
          </button>
        </div>
      )}
      <footer className="mt-12 text-center text-xs text-gray-500">
       Built with ❤️ for career clarity · NextStep v1
      </footer>

    </div>
    
  );
}

export default App;
