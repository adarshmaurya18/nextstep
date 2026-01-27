import { trendRoleMap } from "../data/trendRoleMap";

export function mapTrendToRoles(text = "") {
  const matchedRoles = new Set();

  trendRoleMap.forEach((item) => {
    if (text.toLowerCase().includes(item.keyword.toLowerCase())) {
      item.roles.forEach((role) => matchedRoles.add(role));
    }
  });

  return Array.from(matchedRoles);
}
