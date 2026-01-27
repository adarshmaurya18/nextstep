const RolesInFocus = ({ roles }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h3 className="text-xl font-bold mb-4">
        🔥 Roles in Focus Today
      </h3>

      <div className="space-y-3">
        {roles.map((item) => (
          <div
            key={item.role}
            className="flex justify-between items-center"
          >
            <span className="font-medium">{item.role}</span>
            <span className="text-sm">
              {"🔥".repeat(item.count)}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Based on live GitHub & community activity
      </p>
    </div>
  );
};

export default RolesInFocus;
