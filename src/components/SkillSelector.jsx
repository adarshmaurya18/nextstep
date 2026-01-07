const SkillSelector = ({ skills, selectedSkills, setSelectedSkills }) => {
  const toggleSkill = (skillName) => {
    if (selectedSkills.includes(skillName)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skillName));
    } else {
      setSelectedSkills([...selectedSkills, skillName]);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">
        Select skills you already know
      </h3>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <button
            key={skill.name}
            onClick={() => toggleSkill(skill.name)}
            className={`px-3 py-1 rounded border text-sm ${
              selectedSkills.includes(skill.name)
                ? "bg-indigo-600 text-white"
                : "bg-white"
            }`}
          >
            {skill.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SkillSelector;
