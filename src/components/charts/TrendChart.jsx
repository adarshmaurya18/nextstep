import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TrendChart = ({ roles }) => {
//   const data = roles.map((role) => ({
    // role: role.title,
    // trend: role.trendScore,
//   }));
// 
const data = roles
  .sort((a, b) => b.trendScore - a.trendScore)
  .slice(0, 6)
  .map((role) => ({
    role: role.title,
    trend: role.trendScore,
  }));

  return (
    <div className="bg-white rounded-xl shadow-md p-5 mt-8">
      <h3 className="text-lg font-semibold mb-4">
        📈 Market Trend Comparison
      </h3>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="role" hide />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Bar dataKey="trend" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
