export const recommendRoles = (roles, selectedRole, selectedSkills) => {
  if (!selectedRole) return [];

  return roles
    .map((role) => {
      const matchedSkills = role.skills.filter((skill) =>
        selectedSkills.includes(skill)
      );

      const readiness = Math.round(
        (matchedSkills.length / role.skills.length) * 100
      );

      return {
        ...role,
        readiness,
        matchedSkillsCount: matchedSkills.length,
      };
    })
    .filter((role) => role.readiness >= 40) // minimum threshold
    .sort((a, b) => {
      // priority: readiness + trend + salary proxy
      const scoreA = a.readiness + a.trendScore * 5;
      const scoreB = b.readiness + b.trendScore * 5;
      return scoreB - scoreA;
    })
    .slice(0, 3); // top 3 recommendations
};
