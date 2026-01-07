export const calculateReadiness = (skills, selectedSkills) => {
  const requiredSkillNames = skills.map((s) => s.name);

  const matched = requiredSkillNames.filter((skill) =>
    selectedSkills.includes(skill)
  );

  const percentage = Math.round(
    (matched.length / requiredSkillNames.length) * 100
  );

  const missingSkills = skills
    .filter((skill) => !selectedSkills.includes(skill.name))
    .sort((a, b) => a.priority - b.priority);

  const salaryBoost = missingSkills.reduce(
    (sum, skill) => sum + skill.salaryBoost,
    0
  );

  const monthsToJob = Math.max(1, missingSkills.length * 1);

  return { percentage, missingSkills, salaryBoost, monthsToJob };
};
