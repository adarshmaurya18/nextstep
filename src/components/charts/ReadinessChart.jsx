import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
<p className="text-sm text-gray-600 mb-3">
  Taller bars = skills you already have. Shorter bars = skills to improve.
</p>

const ReadinessChart = ({ selectedRole, selectedSkills }) => {
  if (!selectedRole) return null;

  const data = selectedRole.skills.map((skill) => ({
    skill,
    value: selectedSkills.includes(skill) ? 100 : 30,
  }));

  return (
    <div className="bg-white rounded-xl shadow-md p-5 mt-8">
      <h3 className="text-lg font-semibold mb-4">
        📊 Skill Readiness Breakdown
      </h3>

      <div style={{ width: "100%", height: 250 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="skill" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReadinessChart;
