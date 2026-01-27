const SkillHeatmap = ({ skills }) => {
  const max = skills[0]?.count || 1;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-10">
      <h2 className="text-2xl font-bold mb-4">
        🔥 Skills in Demand Today
      </h2>

      <div className="space-y-3">
        {skills.map(({ skill, count }) => {
          const width = Math.round((count / max) * 100);

          return (
            <div key={skill}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{skill}</span>
                <span className="text-gray-500">{count}</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Based on live GitHub repository activity
      </p>
    </div>
  );
};

export default SkillHeatmap;
