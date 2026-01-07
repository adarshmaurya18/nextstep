const RoleCard = ({ role, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(role)}
      className="bg-white rounded-xl p-6 shadow hover:shadow-lg hover:-translate-y-0.5 transition cursor-pointer"
    >
      <h2 className="text-xl font-bold">{role.title}</h2>

      <p className="text-sm mt-1">Demand: {role.demand}</p>
      <p className="text-sm">Salary: {role.salary}</p>

      <div className="flex flex-wrap gap-2 mt-3">
        {role.skills.map((skill) => (
          <span
            key={skill.name}
            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RoleCard;
