import { SKILL_KEYWORDS } from "../data/skillKeywords";

export function aggregateSkills(repos) {
  const skillCount = {};

  repos.forEach((repo) => {
    const text = `
      ${repo.name || ""}
      ${repo.description || ""}
      ${repo.language || ""}
    `.toLowerCase();

    Object.entries(SKILL_KEYWORDS).forEach(([skill, keywords]) => {
      if (keywords.some((kw) => text.includes(kw))) {
        skillCount[skill] = (skillCount[skill] || 0) + 1;
      }
    });
  });

  return Object.entries(skillCount)
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count);
}
