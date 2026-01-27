export function aggregateRoles(trendItems = []) {
  const roleCount = {};

  trendItems.forEach((item) => {
    if (!item.roles) return;

    item.roles.forEach((role) => {
      roleCount[role] = (roleCount[role] || 0) + 1;
    });
  });

  return Object.entries(roleCount)
    .map(([role, count]) => ({ role, count }))
    .sort((a, b) => b.count - a.count);
}
