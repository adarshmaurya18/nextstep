import { roles } from "../data/roles";

const Trending = () => {
  const trendingRoles = [...roles].sort(
    (a, b) => b.trendScore - a.trendScore
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-2">
        🔥 Trending Tech Jobs in India
      </h2>

      <p className="text-gray-600 mb-6">
        Based on current market demand, hiring patterns, and salary growth.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trendingRoles.map((role) => (
          <div
            key={role.id}
            className="bg-white rounded-xl shadow-md p-5 border-l-4 border-indigo-600"
          >
            <h3 className="text-xl font-semibold mb-1">
              {role.title}
            </h3>

            <p className="text-sm text-gray-600">
              Demand: <strong>{role.demand}</strong>
            </p>

            <p className="text-sm text-gray-600">
              Trend: <strong>{role.trend}</strong>
            </p>

            <p className="text-sm text-gray-600">
              Avg Salary: <strong>{role.avgSalary}</strong>
            </p>

            <p className="text-sm text-gray-600 mb-2">
              Hiring Focus: <strong>{role.hiring}</strong>
            </p>

            <p className="text-sm italic text-gray-700">
              “{role.marketNote}”
            </p>

            <span className="text-xs text-indigo-600 font-semibold mt-2 block">
              Trend Score: {role.trendScore}/5
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending ;
