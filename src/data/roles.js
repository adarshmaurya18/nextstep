export const roles = [
  {
    id: "frontend",
    title: "Frontend Developer",
    demand: "High",
    salary: "₹6–15 LPA",
    skills: [
      { name: "HTML", priority: 1, salaryBoost: 0 },
      { name: "CSS", priority: 1, salaryBoost: 0 },
      { name: "JavaScript", priority: 1, salaryBoost: 1 },
      { name: "React", priority: 2, salaryBoost: 2 },
    ],
  },
  {
    id: "backend",
    title: "Backend Developer",
    demand: "High",
    salary: "₹7–18 LPA",
    skills: [
      { name: "Node.js", priority: 1, salaryBoost: 2 },
      { name: "Databases", priority: 1, salaryBoost: 2 },
      { name: "APIs", priority: 2, salaryBoost: 1 },
    ],
  },
  {
    id: "ai",
    title: "AI / ML Engineer",
    demand: "Very High",
    salary: "₹10–30 LPA",
    skills: [
      { name: "Python", priority: 1, salaryBoost: 2 },
      { name: "ML", priority: 2, salaryBoost: 3 },
      { name: "GenAI", priority: 3, salaryBoost: 4 },
    ],
  },
];
