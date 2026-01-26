import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ReadinessChart = ({ selectedRole, selectedSkills }) => {
  if (!selectedRole) return null;

  const data = selectedRole.skills.map((skill) => ({
    skill,
    value: selectedSkills.includes(skill) ? 100 : 30,
  }));

  return (
    <div className="bg-white rounded-xl shadow-md p-5 mt-8">
      <h3 className="text-lg font-semibold mb-1">
        📊 Skill Readiness Breakdown
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        Longer bars = stronger skills · Shorter bars = skills to improve
      </p>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 40 }}
        >
          <XAxis type="number" domain={[0, 100]} />
          <YAxis dataKey="skill" type="category" width={120} />
          <Tooltip />
          <Bar dataKey="value" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReadinessChart;
