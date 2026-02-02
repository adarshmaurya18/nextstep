import { useState } from "react";
import SkillTest from "./SkillTest";

const SkillHeatmap = ({ skills }) => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const max = skills[0]?.count || 1;

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-10">
      <h2 className="text-xl font-bold mb-4">
        🔥 Skills in Demand Today
      </h2>

      <div className="space-y-4">
        {skills.map(({ skill, count }) => (
          <div key={skill}>
            <div className="flex justify-between mb-1">
              <button
                onClick={() => setSelectedSkill(skill)}
                className="font-medium text-indigo-600 hover:underline"
              >
                {skill}
              </button>
              <span className="text-sm text-gray-500">
                {count}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{
                  width: `${(count / max) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Skill Test renders ONLY ONCE, BELOW heatmap */}
      {selectedSkill && (
        <div className="mt-8 border-t pt-6">
          <SkillTest
            skill={selectedSkill}
            onClose={() => setSelectedSkill(null)}
          />
        </div>
      )}
    </div>
  );
};

export default SkillHeatmap;
