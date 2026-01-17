const RoleCard = ({ role, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(role)}
      className="cursor-pointer bg-white rounded-xl shadow-md p-5 
                 hover:scale-105 hover:shadow-lg transition"
    >
      <h2 className="text-xl font-bold text-gray-800">
        {role.title}
      </h2>

      <p className="text-sm text-gray-600 mt-1">
        Demand: <span className="font-semibold">{role.demand}</span>
      </p>

      <p className="text-sm text-gray-600">
        Trend: <span className="font-semibold">{role.trend}</span>
      </p>

      <p className="text-sm text-gray-600">
        Salary: <span className="font-semibold">{role.avgSalary}</span>
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {role.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RoleCard;

