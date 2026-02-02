export function analyzeNewsMock(article) {
  const text = `${article.title} ${article.description || ""}`.toLowerCase();

  const impact = [];
  const roles = [];
  const skills = [];

  if (text.includes("ai") || text.includes("artificial intelligence")) {
    impact.push("Increased focus on AI-driven products");
    roles.push("AI Engineer", "ML Engineer");
    skills.push("Python", "Machine Learning");
  }

  if (text.includes("startup") || text.includes("funding")) {
    impact.push("Startup hiring momentum may increase");
    roles.push("Full Stack Developer", "Backend Developer");
    skills.push("System Design", "JavaScript");
  }

  if (text.includes("layoff")) {
    impact.push("Hiring may slow, skill expectations increase");
  }

  return {
    summary: article.description || "This article discusses recent developments in the tech industry.",
    impact,
    roles,
    skills,
    confidence: "Medium",
  };
}
