import { useState } from "react";
import { roles } from "../data/roles";

const Salary = () => {
  const [selectedRoles, setSelectedRoles] = useState([]);

  const toggleRole = (role) => {
    setSelectedRoles((prev) =>
      prev.find((r) => r.id === role.id)
        ? prev.filter((r) => r.id !== role.id)
        : [...prev, role]
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-2">
        💰 Salary Insights (India)
      </h2>

      <p className="text-gray-600 mb-6">
        Select roles to compare salary ranges and demand.
      </p>

      {/* ROLE SELECTION */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {roles.map((role) => (
          <label
            key={role.id}
            className={`p-4 border rounded-lg cursor-pointer bg-white ${
              selectedRoles.find((r) => r.id === role.id)
                ? "border-indigo-600"
                : ""
            }`}
          >
            <input
              type="checkbox"
              className="mr-2"
              checked={!!selectedRoles.find((r) => r.id === role.id)}
              onChange={() => toggleRole(role)}
            />
            <span className="font-semibold">{role.title}</span>
          </label>
        ))}
      </div>

      {/* COMPARISON TABLE */}
      {selectedRoles.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">
            📊 Salary Comparison
          </h3>

          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Role</th>
                <th className="text-left p-2">Avg Salary</th>
                <th className="text-left p-2">Demand</th>
                <th className="text-left p-2">Trend</th>
                <th className="text-left p-2">Hiring</th>
              </tr>
            </thead>

            <tbody>
              {selectedRoles.map((role) => (
                <tr key={role.id} className="border-b">
                  <td className="p-2 font-medium">
                    {role.title}
                  </td>
                  <td className="p-2">
                    {role.avgSalary}
                  </td>
                  <td className="p-2">
                    {role.demand}
                  </td>
                  <td className="p-2">
                    {role.trend}
                  </td>
                  <td className="p-2">
                    {role.hiring}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedRoles.length === 0 && (
        <p className="text-gray-500 italic">
          Select at least one role to compare.
        </p>
      )}
    </div>
  );
};

export default Salary;